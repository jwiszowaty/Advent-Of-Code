const fs = require("fs")
const { matchNums, makeTwoDigitStrings, makeTwoDigitNums, add } = require("./1-trebuchet/1-trebuchet.js");
const { toArray, removeImpossibleResults, addIndexes } = require("./2-cube-conundrum/part-1/cube-conundrum-2-1.js")
const { organiseResults, orderResults, reduceResults, multiplyResults, addResults } = require("./2-cube-conundrum/part-2/cube-conundrum-2-2.js")
const { toArray3, findEngineParts, sumEngineParts } = require("./3-gear-ratios/part-1/gear-ratios-1.js")
const { findStarsGears, findTheNumbersAdjacentToStarsGears, sumParts } = require("./3-gear-ratios/part-2/gear-ratios-2.js")
const { extractWinNums, extractRanNums, countMatched, calculatePoints, sumPoints } = require("./4-scratchcards/scratchcards-1.js")
const { countMatchedPartTwo, addCards, countCards } = require("./4-scratchcards/scratchcards-2.js")
const { findSeedToSoil, findSoilToFertilizer, findFertilizerToWater, findWaterToLight, matchSoil, findLightToTemp, findTempToHum, findHumToLoc, matchFert, matchWater, matchLight, matchTemp, matchHum, showClosestLoc, findSeedsNumbers } = require("./5-fertiliser/fertiliser-1.js")
const { extractNumbersFromRange } = require("./5-fertiliser/fertiliser-2.js")
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
describe("2-Cube Conundrum Part 2", () => {
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
describe("3-Gear Ratios Part 1", () => {
    const dataInput = fs.readFileSync("./3-gear-ratios/test.txt", "utf8")
    test("input data to array", () => {
        const dataArr = toArray3(dataInput)
        expect(dataArr).toEqual([["4","6","7",".",".","1","1","4",".",".",],[".",".",".","*",".",".",".",".",".",".",],[".",".","3","5",".",".","6","3","3",".",],[".",".",".",".",".",".","#",".",".",".",],["6","1","7","*",".",".",".",".",".",".",],[".",".",".",".",".","+",".","5","8",".",],[".",".","5","9","2",".",".",".",".",".",],[".",".",".",".",".",".","7","5","5",".",],[".",".",".","$",".","*",".",".",".",".",],[".","6","6","4",".","5","9","8",".",".",]])
    })
    test("extract parts' numbers", () => {
        const dataArr = toArray3(dataInput)
        const partsNums = findEngineParts(dataArr)
        expect(partsNums).toEqual([467, 35, 633, 617, 592, 755, 664, 598])
    })
    test("sum only numbers with adjacent symbols", () => {
        const dataArr = toArray3(dataInput)
        const partsNums = findEngineParts(dataArr)
        const sum = sumEngineParts(partsNums)
        expect(sum).toBe(4361)
    })
})
describe("3-Gear Ratios Part 2", () => {
    const dataInput = fs.readFileSync("./3-gear-ratios/test.txt", "utf8")
    test("find where the stars gears are located in the input data", () => {
        const dataArr = toArray3(dataInput)
        const starsLocation = findStarsGears(dataArr)
        expect(starsLocation).toEqual([[1,3], [8,5]])
    })
    test("collect numbers adjacent to the stars gears", () => {
        const dataArr = toArray3(dataInput)
        const starsIndexes = findStarsGears(dataArr)
        const numsAdjacentToStars = findTheNumbersAdjacentToStarsGears(starsIndexes,dataArr)
        expect(numsAdjacentToStars).toEqual([[35, 467], [598, 755]])
    })
    test("add up the multiplied pairs", () => {
        const dataArr = toArray3(dataInput)
        const starsIndexes = findStarsGears(dataArr)
        const numsAdjacentToStars = findTheNumbersAdjacentToStarsGears(starsIndexes, dataArr)
        const sum = sumParts(numsAdjacentToStars)
        expect(sum).toBe(467835)
    })
})
describe("4-Scratchcards Part 1", () => {
    const testInput = fs.readFileSync("./4-scratchcards/test.txt", "utf8")
    test("create two array for winning numbers and random numbers", () => {
        const winningNums = extractWinNums(testInput)
        const randomNums = extractRanNums(testInput)
        expect(winningNums).toEqual([[41, 48, 83, 86, 17],[13, 32, 20, 16, 61],[1, 21, 53, 59, 44],[41, 92, 73, 84, 69],[87, 83, 26, 28, 32],[31, 18, 13, 56, 72]])
        expect(randomNums).toEqual([[83, 86, 6, 31, 17, 9, 48, 53], [61, 30, 68, 82, 17, 32, 24, 19], [69, 82, 63, 72, 16, 21, 14, 1], [59, 84, 76, 51, 58, 5, 54, 83], [88, 30, 70, 12, 93, 22, 82, 36], [74, 77, 10, 23, 35, 67, 36, 11]])
    })
    test("count how many random numbers match with winning numbers", () => {
        const winningNums = extractWinNums(testInput)
        const randomNums = extractRanNums(testInput)
        const numberOfMatchedNums = countMatched(randomNums, winningNums)
        expect(numberOfMatchedNums).toEqual([4, 2, 2, 1, 0, 0])
    })
    test("calculate how many points for each card", () => {
        const winningNums = extractWinNums(testInput)
        const randomNums = extractRanNums(testInput)
        const numberOfMatchedNums = countMatched(randomNums, winningNums)
        const pointsForEachCard = calculatePoints(numberOfMatchedNums)
        expect(pointsForEachCard).toEqual([8, 2, 2, 1, 0, 0])
    })
    test("sum of points from cards", () => {
        const winningNums = extractWinNums(testInput)
        const randomNums = extractRanNums(testInput)
        const numberOfMatchedNums = countMatched(randomNums, winningNums)
        const pointsForEachCard = calculatePoints(numberOfMatchedNums)
        const sum = sumPoints(pointsForEachCard)
        expect(sum).toBe(13)
    })
})
describe("4-Scratchcards Part 2", () => {
    const testInput = fs.readFileSync("./4-scratchcards/test.txt", "utf8")
    test("create two array for winning numbers and random numbers", () => {
        const winningNums = extractWinNums(testInput)
        const randomNums = extractRanNums(testInput)
        expect(winningNums).toEqual([[41, 48, 83, 86, 17],[13, 32, 20, 16, 61],[1, 21, 53, 59, 44],[41, 92, 73, 84, 69],[87, 83, 26, 28, 32],[31, 18, 13, 56, 72]])
        expect(randomNums).toEqual([[83, 86, 6, 31, 17, 9, 48, 53], [61, 30, 68, 82, 17, 32, 24, 19], [69, 82, 63, 72, 16, 21, 14, 1], [59, 84, 76, 51, 58, 5, 54, 83], [88, 30, 70, 12, 93, 22, 82, 36], [74, 77, 10, 23, 35, 67, 36, 11]])
    })
    test("count how many random numbers match with winning numbers", () => {
        const winningNums = extractWinNums(testInput)
        const randomNums = extractRanNums(testInput)
        const numberOfMatchedNums = countMatchedPartTwo(randomNums, winningNums)
        expect(numberOfMatchedNums).toEqual([[4], [2], [2], [1], [0], [0]])
    })
    test("add cards according to the number of matched numbers on each card", () => {
        const winningNums = extractWinNums(testInput)
        const randomNums = extractRanNums(testInput)
        const numberOfMatchedNums = countMatchedPartTwo(randomNums, winningNums)
        const addedCards = addCards(numberOfMatchedNums)
        expect(addedCards).toEqual([[4], [2,2], [2,2,2,2], [1,1,1,1,1,1,1,1], [0,0,0,0,0,0,0,0,0,0,0,0,0,0], [0]])
    })
    test("count the cards", () => {
        const winningNums = extractWinNums(testInput)
        const randomNums = extractRanNums(testInput)
        const numberOfMatchedNums = countMatchedPartTwo(randomNums, winningNums)
        const addedCards = addCards(numberOfMatchedNums)
        const sum = countCards(addedCards)
        expect(sum).toBe(30)
    })
})
describe.only("5-Seed Fertiliser Part 1", () => {
    const dataInput = fs.readFileSync("./5-fertiliser/test.txt", "utf8")
    test("extract information each line as a separate element of the array, ordered in ascending order based on the seed number", () => {
        const seedToSoil = findSeedToSoil(dataInput)
        expect(seedToSoil).toEqual([[52, 50, 48], [50, 98, 2]])

        const soilToFertilizer= findSoilToFertilizer(dataInput)
        expect(soilToFertilizer).toEqual([[39, 0, 15], [0, 15, 37], [37, 52, 2]])

        const fertilizerToWater= findFertilizerToWater(dataInput)
        expect(fertilizerToWater).toEqual([[42, 0, 7], [57, 7, 4], [0, 11, 42], [49, 53, 8]])

        const waterToLight = findWaterToLight(dataInput)
        expect(waterToLight).toEqual([[88, 18, 7], [18, 25, 70]])

        const lightToTemp = findLightToTemp(dataInput)
        expect(lightToTemp).toEqual([[81, 45, 19], [68, 64, 13], [45, 77, 23]])

        const tempToHum = findTempToHum(dataInput)
        expect(tempToHum).toEqual([[1, 0, 69], [0, 69, 1]])

        const humToLoc = findHumToLoc(dataInput)
        expect(humToLoc).toEqual([[60, 56, 37], [56, 93, 4]])
    })
    test("create objects which will hold information extracted from the data input", () => {
        const seedsNumbers = findSeedsNumbers(dataInput)
        expect(seedsNumbers).toEqual([79, 14, 55, 13])

        const seedToSoil = findSeedToSoil(dataInput)
        const soil = matchSoil(seedsNumbers, seedToSoil)
        expect(soil).toEqual([81, 14, 57, 13])

        const soilToFertilizer= findSoilToFertilizer(dataInput)
        const fert = matchFert(soil, soilToFertilizer)
        expect(fert).toEqual([81, 53, 57, 52])

        const fertilizerToWater = findFertilizerToWater(dataInput)
        const water = matchWater(fert, fertilizerToWater)
        expect(water).toEqual([81, 49, 53, 41])

        const waterToLight = findWaterToLight(dataInput)
        const light = matchLight(water, waterToLight)
        expect(light).toEqual([74, 42, 46, 34])
        
        const lightToTemp = findLightToTemp(dataInput)
        const temp = matchTemp(light, lightToTemp)
        expect(temp).toEqual([78, 42, 82, 34])

        const tempToHum = findTempToHum(dataInput)
        const hum = matchHum(temp, tempToHum)
        expect(hum).toEqual([78, 43, 82, 35])

        const humToLoc = findHumToLoc(dataInput)
        const closestLocation = showClosestLoc(hum, humToLoc)
        expect(closestLocation).toBe(35)
    })
})
describe.only("5-Seed Fertiliser Part 2", () => {
    const dataInput = fs.readFileSync("./5-fertiliser/test.txt", "utf8")
    test("create objects which will hold information extracted from the data input", () => {
        const seedsNumbers = extractNumbersFromRange(dataInput)
        expect(seedsNumbers).toBe(46)
        
        // const seedToSoil = findSeedToSoil(dataInput)
        // const soil = matchSoil(seedsNumbers, seedToSoil)
        // const soilToFertilizer= findSoilToFertilizer(dataInput)
        // const fert = matchFert(soil, soilToFertilizer)
        // const fertilizerToWater = findFertilizerToWater(dataInput)
        // const water = matchWater(fert, fertilizerToWater)
        // const waterToLight = findWaterToLight(dataInput)
        // const light = matchLight(water, waterToLight)
        // const lightToTemp = findLightToTemp(dataInput)
        // const temp = matchTemp(light, lightToTemp)
        // const tempToHum = findTempToHum(dataInput)
        // const hum = matchHum(temp, tempToHum)
        // const humToLoc = findHumToLoc(dataInput)
        // const closestLocation = showClosestLoc(hum, humToLoc)
        // expect(closestLocation).toBe(46)
    })
})