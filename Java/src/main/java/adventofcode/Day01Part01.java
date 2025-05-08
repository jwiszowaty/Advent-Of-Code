package adventofcode;

import java.sql.Array;
import java.util.ArrayList;
import java.util.Arrays;

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


}