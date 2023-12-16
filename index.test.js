const { matchNums, makeTwoDigitStrings, makeTwoDigitNums, add } = require("./1-trebuchet/1-trebuchet.js");
const { toArray, removeImpossibleResults, addIndexes } = require("./2-cube-conundrum/part-1/cube-conundrum-2-1.js")
const { organiseResults, orderResults, reduceResults, multiplyResults, addResults } = require("./2-cube-conundrum/part-2/cube-conundrum-2-2.js")
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
describe("2-Cube Conundrum Part 1", () => {
    const testInput = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
    test("the input data is formatted to an array of games", () => {
        const gamesResults = toArray(testInput)
        console.log(gamesResults);
        expect(gamesResults).toHaveLength(5)
        expect(typeof gamesResults).toBe("object")
    })
    test("no string can include >12 red or >13 green or >14 blue", () => {
        const gamesResults = toArray(testInput)
        const possibleGamesIndexes = removeImpossibleResults(gamesResults)
        expect(possibleGamesIndexes).toEqual([1, 2, 0, 0, 5])
    })
    test("the sum of indexes of possible games is correctly calculated", () => {
        const gamesResults = toArray(testInput)
        const possibleGamesIndexes = removeImpossibleResults(gamesResults)
        const indexesSum = addIndexes(possibleGamesIndexes)
        expect(indexesSum).toEqual(8)
    })
})
describe.only("2-Cube Conundrum Part 2", () => {
    const testInput = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
    test("organise the games' results by colours and number of cubes", () => {
        const gamesResults = toArray(testInput)
        const resultsSummaries = organiseResults(gamesResults)
        expect(resultsSummaries).toEqual([[[4, 1], [2, 2], [3, 6]], [[1], [2, 3, 1], [1, 4, 1]], [[20, 4, 1], [8, 13, 5], [6, 5]], [[3, 6, 14], [1, 3, 3], [6, 15]], [[6, 1], [3, 2], [1, 2]]])
    })
    test("colour sets from each game are sorted in descending order", () => {
        const gamesResults = toArray(testInput)
        const resultsSummaries = organiseResults(gamesResults)
        const orderedSummaries = orderResults(resultsSummaries)
        expect(orderedSummaries).toEqual([[[4, 1], [2, 2], [6, 3]], [[1], [3, 2, 1], [4, 1, 1]], [[20, 4, 1], [13, 8, 5], [6, 5]], [[14, 6, 3], [3, 3, 1], [15, 6]], [[6, 1], [3, 2], [2, 1]]])
    })
    test("only highest number is taken for each colour in each game", () => {
        const gamesResults = toArray(testInput)
        const resultsSummaries = organiseResults(gamesResults)
        const orderedSummaries = orderResults(resultsSummaries)
        const reducedSummaries = reduceResults(orderedSummaries)
        expect(reducedSummaries).toEqual([[4, 2, 6], [1, 3, 4], [20, 13, 6], [14, 3, 15], [6, 3, 2]])
    })
    test("multiply the obtained numbers for each game", () => {
        const gamesResults = toArray(testInput)
        const resultsSummaries = organiseResults(gamesResults)
        const orderedSummaries = orderResults(resultsSummaries)
        const reducedSummaries = reduceResults(orderedSummaries)
        const multipliedSummaries = multiplyResults(reducedSummaries)
        expect(multipliedSummaries).toEqual([48, 12, 1560, 630, 36])
    })
    test("add the array of numbers obtained", () => {
        const gamesResults = toArray(testInput)
        const resultsSummaries = organiseResults(gamesResults)
        const orderedSummaries = orderResults(resultsSummaries)
        const reducedSummaries = reduceResults(orderedSummaries)
        const multipliedSummaries = multiplyResults(reducedSummaries)
        const addedSummaries = addResults(multipliedSummaries)
        expect(addedSummaries).toBe(2286)
    })
})