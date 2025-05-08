package adventofcode;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;

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
    public void testSubtractIntegersInRow() {
        Integer[][] sortedIntegers = {{0, 1, 2, 3, 4}, {5, 6, 7, 8, 9}};
        ArrayList<Integer> expectedSubtractResult = new ArrayList<Integer>();
        expectedSubtractResult.add(5);
        expectedSubtractResult.add(5);
        expectedSubtractResult.add(5);
        expectedSubtractResult.add(5);
        expectedSubtractResult.add(5);

        ArrayList<Integer> actualSubtractResult = Day01Part01.subtractIntegers(sortedIntegers);

        assertArrayEquals(expectedSubtractResult, actualSubtractResult);
    }
}
