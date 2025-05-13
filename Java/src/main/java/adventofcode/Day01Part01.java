package adventofcode;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Day01Part01 {
    public static void main(String[] args) {
        System.out.println(findAnswer(args[0]));
    }
    public static int findAnswer(String fileName) {
        String rawData = accessDataFromFile(fileName);
        Integer[][] grid = textToGrid(rawData);
        Integer[][] sortedNumbersGrid = sortIntegers(grid);
        List<Integer> absoluteDifferences = subtractIntegers(sortedNumbersGrid);
        return sumAllAbsoluteDifferences(absoluteDifferences);
    }
    public static Integer[][] textToGrid(String textInput) {

        String[] rows = textInput.split("\n");
        List<List<Integer>> rowsSplit = Arrays.stream(rows)
                .map(row -> Arrays.stream(row.split(" +"))
                        .map(Integer::parseInt)
                        .toList()
                )
                .toList();
        int numberOfRows = rowsSplit.size();
        Integer[][] gridColumns = new Integer[2][numberOfRows];
        for (int i = 0; i < rowsSplit.size(); i++) {
                gridColumns[0][i] = rowsSplit.get(i).get(0);
                gridColumns[1][i] = rowsSplit.get(i).get(1);
        }
        return gridColumns;
    }

    public static Integer[][] sortIntegers(Integer[][] unsortedIntegers) {
        for (Integer[] unsortedInteger : unsortedIntegers) {
            Arrays.sort(unsortedInteger);
        }
        return unsortedIntegers;
    }

    public static List<Integer> subtractIntegers(Integer[][] sortedIntegers) {
        List<Integer> absoluteDifferences = new ArrayList<>(sortedIntegers[0].length);
        for (int i = 0; i < sortedIntegers[0].length; i++) {
            int numberInColumnOne = sortedIntegers[0][i];
            int correspondingNumberInColumnTwo = sortedIntegers[1][i];
            int subtractionResult = Math.subtractExact(numberInColumnOne,correspondingNumberInColumnTwo);
            absoluteDifferences.add(Math.abs(subtractionResult));
        }
        return absoluteDifferences;
    }

    public static int sumAllAbsoluteDifferences(List<Integer> absoluteDiffs) {
        return  absoluteDiffs.stream().reduce(0, Integer::sum);
    }

    public static String accessDataFromFile(String fileName) {
        try {
            Path filePath = Path.of("/Users/jakubwiszowaty/personal-projects/Advent Of Code/Java/src/main/resources",fileName);
            return Files.readString(filePath);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}