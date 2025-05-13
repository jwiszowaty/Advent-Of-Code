package adventofcode;

import org.junit.jupiter.api.Test;

import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class Day01Part01Test {
    @Test
    public void testAccessDataFromFile() {
        String fileName = "Day01Part01Test.txt";

        String expectedData = "4    9\n2    7\n3    8\n1    6\n0    5";
        String actualData = Day01Part01.accessDataFromFile(fileName);

        assertEquals(expectedData,actualData);
    }
    @Test
    public void testTextToGrid() {
        String textInput ="4    9\n2    7\n3    8\n1    6\n0    5";

        Integer[][] expectedGrid = {{4, 2, 3, 1, 0}, {9, 7, 8, 6, 5}};
        Integer[][] actualGrid = Day01Part01.textToGrid(textInput);

        assertArrayEquals(expectedGrid, actualGrid);
    }
    @Test
    public void testSortIntegers() {
        Integer[][] unsortedIntegers = {{4, 2, 3, 1, 0}, {9, 7, 8, 6, 5}};

        Integer[][] expectedSorted = {{0, 1, 2, 3, 4}, {5, 6, 7, 8, 9}};
        Integer[][] actualSorted = Day01Part01.sortIntegers(unsortedIntegers);

        assertArrayEquals(expectedSorted, actualSorted);
    }

    @Test
    public void testFindAbsoluteDifferencesBetweenIntegersInEachRow() {
        Integer[][] sortedIntegers = {{0, 1, 2, 3, 4}, {5, 6, 7, 8, 9}};

        List<Integer> expectedAbsoluteDiffs = new ArrayList<>();
            expectedAbsoluteDiffs.add(5);
            expectedAbsoluteDiffs.add(5);
            expectedAbsoluteDiffs.add(5);
            expectedAbsoluteDiffs.add(5);
            expectedAbsoluteDiffs.add(5);
        List<Integer> actualAbsoluteDiffs = Day01Part01.subtractIntegers(sortedIntegers);

        assertEquals(expectedAbsoluteDiffs, actualAbsoluteDiffs);
    }
    @Test
    public void testSumAllAbsoluteDifferences() {
        List<Integer> absoluteDiffs = new ArrayList<>();
        absoluteDiffs.add(5);
        absoluteDiffs.add(5);
        absoluteDiffs.add(5);
        absoluteDiffs.add(5);
        absoluteDiffs.add(5);
        int expectedSumOfAbsoluteDiffs = 25;
        int actualSumOfAbsoluteDiffs = Day01Part01.sumAllAbsoluteDifferences(absoluteDiffs);

        assertEquals(expectedSumOfAbsoluteDiffs, actualSumOfAbsoluteDiffs);
    }
}
