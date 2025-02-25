const { sortNumbers, findDistance, sumDistances, calculateTotalDistance} = require("../2024/one.js")
const fs = require("fs/promises")
describe("1: Historian Hysteria", () => {
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