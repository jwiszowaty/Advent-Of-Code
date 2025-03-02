const fs = require("fs/promises")
describe("1: Historian Hysteria", () => {
    const { sortNumbers, findDistance, sumDistances, calculateTotalDistance} = require("../2024/one.js")
    it("should sort numbers low to high", () => {
        const unsortedNumbers = [4, 2, 3, 1, 0]
        const sortedNumbers = [0, 1, 2, 3, 4]
        const result = sortNumbers(unsortedNumbers)
        expect(result).toEqual(sortedNumbers)
    })
    it("should sort numbers low to high for first nested array then the next", () => {
        const unsortedNumbers = [[4, 2, 3, 1, 0],[9, 7, 8, 6, 5]]
        const sortedNumbers = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]]
        const result = sortNumbers(unsortedNumbers)
        expect(result).toEqual(sortedNumbers)
    })
    it("should return a new array with differences between correlated numbers", () => {
        const unsortedNumbers = [[4, 2, 3, 1, 0],[9, 7, 8, 6, 5]]
        const expected = [5,5,5,5,5]
        const result = findDistance(sortNumbers(unsortedNumbers))
        expect(result).toEqual(expected)
    })
    it("should return a sum of the distances", () => {
        const unsortedNumbers = [[4, 2, 3, 1, 0],[9, 7, 8, 6, 5]]
        const expected = 25
        const result = calculateTotalDistance(unsortedNumbers)
        expect(result).toEqual(expected)
    })
    it("finds the solution to the first task.", () => {
        fs.readFile("/Users/jakubwiszowaty/personal-projects/Advent Of Code/2024/one.txt","utf-8")
            .then((data) => {
                const columns = [[],[]]
                const numbersPairs = data.split('\n').map((numbers) => numbers.split('   '))
                numbersPairs.forEach(([column1, column2]) => {
                    columns[0].push(column1)
                    columns[1].push(column2)
                })
                return columns
            })
            .then((numbers) => {
                console.log(calculateTotalDistance(numbers));
            })
    })
})
describe.only("2: Red-Nosed Reports", () => {
    const {findTrend, checkSafety, countSafeReports} = require("../2024/two.js")
    it("should assign whether levels increase or decrease.", () => {
        const levels = [[1, 2, 3, 4, 5]];
        const levels2 = [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1]];
        const expectedTrends = ["increase"];
        const expectedTrends2 = ["increase", "decrease"];

        const trends = findTrend(levels).map(({ status: value, trend: value2 }) => value2)
        const trends2 = findTrend(levels2).map(({ status: value, trend: value2 }) => value2)
        
        expect(trends).toEqual(expectedTrends);
        expect(trends2).toEqual(expectedTrends2);
    })
    it("should return the correct safety status of each report.", () => {
        const levels = [[1, 2, 3, 4, 5]];
        const levels2 = [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1]];
        const levels3 = [[1, 2, 9, 10, 11], [11, 10, 9, 2, 1]];
        const expectedSafety = ["safe"];
        const expectedSafety2 = ["safe", "safe"];
        const expectedSafety3 = ["unsafe", "unsafe"]

        const safety = checkSafety(levels).map(({ status: value, trend: value2 }) => value)
        const safety2 = checkSafety(levels2).map(({ status: value, trend: value2 }) => value)
        const safety3 = checkSafety(levels3).map(({ status: value, trend: value2 }) => value)

        expect(safety).toEqual(expectedSafety);
        expect(safety2).toEqual(expectedSafety2);
        expect(safety3).toEqual(expectedSafety3)
    })
    it("should return the correct number for safe reports.", () => {
        const levels = [[1, 2, 3, 4, 5]];
        const levels2 = [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1]];
        const levels3 = [[1, 2, 9, 10, 11], [11, 10, 9, 2, 1]];

        expect(countSafeReports(levels)[0]).toEqual(1);
        expect(countSafeReports(levels2)[0]).toEqual(2);
        expect(countSafeReports(levels3)[0]).toEqual(0);
    })
    it("should provide answer", () => {
        fs.readFile("/Users/jakubwiszowaty/personal-projects/Advent Of Code/2024/two.txt", "utf-8")
            .then(data => {
                return data.split("\n").map((numbersString) => numbersString.split(" ").map((number) => +number));
            })
            .then(levels => {
                console.log(countSafeReports(levels));
                
            })
    })
})