package adventofcode;

import java.sql.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Day01Part01 {
    public static void main(String[] args) {

    }

    public static Integer[] sortIntegers(Integer[] unsortedIntegers) {
        Arrays.sort(unsortedIntegers);
        return unsortedIntegers;
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
}