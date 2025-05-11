package adventofcode;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class Day01Part01Test {
    @Test
    public void testSortFlatArrayIntegers() {
        Integer[] unsortedIntegers = {4,2,3,1,0};
        Integer[] expectedSorted = {0, 1, 2, 3, 4};

        Integer[] actualSorted = Day01Part01.sortIntegers(unsortedIntegers);

        assertArrayEquals(expectedSorted, actualSorted);
    }

    @Test
    public void testSortNestedArrayIntegers() {
        Integer[][] unsortedIntegers = {{4, 2, 3, 1, 0}, {9, 7, 8, 6, 5}};
        Integer[][] expectedSorted = {{0, 1, 2, 3, 4}, {5, 6, 7, 8, 9}};

        Integer[][] actualSorted = Day01Part01.sortIntegers(unsortedIntegers);

        assertArrayEquals(expectedSorted, actualSorted);
    }

    @Test
    public void testFindAbsoluteDifferencesForIntegersInEachRow() {
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
