const { matchNums, makeTwoDigitStrings, makeTwoDigitNums, add } = require("./1-trebuchet/1-trebuchet.js");

describe("1-trebuchet", () => {
    test("the data is an array of rows", () => {
        const data = "1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet"
        const result = matchNums(data)
        expect(typeof result).toBe("object")
    });
    test("the function returns an array with strings of matched numbers 0-9 from each row of the data", () => {
        const data = "1abc"
        const result = matchNums(data)
        expect(result).toEqual(["1"])

        const data2 = "1abc\npqr3stu8vwx"
        const result2 = matchNums(data2)
        expect(result2).toEqual(["1", "38"])
        
        const data3 = "1abc\npqr3stu8vwx\na1b2c3d4e5f"
        const result3 = matchNums(data3)
        expect(result3).toEqual(["1", "38", "12345"])
    });
    test("the function returns an array with strings of two-digit numbers which correspond with indexes to the parent array. First and last digit from each string or doubled digit if one character string", async () => {
        const data = "1abc"
        const multiDigitStrings = matchNums(data)
        const twoDigitStrings = makeTwoDigitStrings(multiDigitStrings)
        expect(twoDigitStrings).toEqual(["11"])

        const data2 = "1abc\npqr3stu8vwx"
        const multiDigitStrings2 = matchNums(data2)
        const twoDigitStrings2 = makeTwoDigitStrings(multiDigitStrings2)
        expect(twoDigitStrings2).toEqual(["11", "38"])
        
        const data3 = "1abc\npqr3stu8vwx\na1b2c3d4e5f"
        const multiDigitStrings3 = matchNums(data3)
        const twoDigitStrings3 = makeTwoDigitStrings(multiDigitStrings3)
        expect(twoDigitStrings3).toEqual(["11", "38", "15"])
    });
    test("the function returns an array with two-digit numbers which correspond with indexes to the parent array.",() => {
        const data = "1abc"
        const multiDigitStrings = matchNums(data)
        const twoDigitStrings = makeTwoDigitStrings(multiDigitStrings)
        const twoDigitNums = makeTwoDigitNums(twoDigitStrings)
        expect(twoDigitNums).toEqual([11])

        const data2 = "1abc\npqr3stu8vwx"
        const multiDigitStrings2 = matchNums(data2)
        const twoDigitStrings2 = makeTwoDigitStrings(multiDigitStrings2)
        const twoDigitNums2 = makeTwoDigitNums(twoDigitStrings2)
        expect(twoDigitNums2).toEqual([11, 38])
        
        const data3 = "1abc\npqr3stu8vwx\na1b2c3d4e5f"
        const multiDigitStrings3 = matchNums(data3)
        const twoDigitStrings3 = makeTwoDigitStrings(multiDigitStrings3)
        const twoDigitNums3 = makeTwoDigitNums(twoDigitStrings3)
        expect(twoDigitNums3).toEqual([11, 38, 15])
    });
    test("the function returns a sum of numbers in an array",() => {
        const data = "1abc"
        const multiDigitStrings = matchNums(data)
        const twoDigitStrings = makeTwoDigitStrings(multiDigitStrings)
        const twoDigitNums = makeTwoDigitNums(twoDigitStrings)
        const sum = add(twoDigitNums)
        expect(sum).toEqual(11)

        const data2 = "1abc\npqr3stu8vwx"
        const multiDigitStrings2 = matchNums(data2)
        const twoDigitStrings2 = makeTwoDigitStrings(multiDigitStrings2)
        const twoDigitNums2 = makeTwoDigitNums(twoDigitStrings2)
        const sum2 = add(twoDigitNums2)
        expect(sum2).toEqual(49)
        
        const data3 = "1abc\npqr3stu8vwx\na1b2c3d4e5f"
        const multiDigitStrings3 = matchNums(data3)
        const twoDigitStrings3 = makeTwoDigitStrings(multiDigitStrings3)
        const twoDigitNums3 = makeTwoDigitNums(twoDigitStrings3)
        const sum3 = add(twoDigitNums3)
        expect(sum3).toEqual(64)

        const data4 = "1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet"
        const multiDigitStrings4 = matchNums(data4)
        const twoDigitStrings4 = makeTwoDigitStrings(multiDigitStrings4)
        const twoDigitNums4 = makeTwoDigitNums(twoDigitStrings4)
        const sum4 = add(twoDigitNums4)
        expect(sum4).toEqual(142)
    });
});