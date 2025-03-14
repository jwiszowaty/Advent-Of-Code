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
    const { checkSafety, countSafeReports} = require("../2024/two.js")
    
    for (let i = 0; i < 3; i++) {
        it(`should return 1 for one set of 5 levels incremented by ${i + 1}.`, () => {
            const levels = [[1, 2 + i, 3 + (2 * i), 4 + (3 * i), 5 + (4 * i)]];
            const expectedSafeReports = 1;
    
            const safeReports = countSafeReports(levels)
    
            expect(safeReports).toEqual(expectedSafeReports);
        })
    }
    for (let i = 0; i > -3; i--) {
        it(`should return 1 for one set of 5 levels decremented by ${i - 1}.`, () => {
            const levels = [[20, 19 + i, 18 + (2 * i), 17 + (3 * i), 16 + (4 * i)]];
            const expectedSafeReports = 1;
    
            const safeReports = countSafeReports(levels)
    
            expect(safeReports).toEqual(expectedSafeReports);
        })
    }
    for (let i = 0; i < 3; i++) {
        it(`should return 0 for one set of 5 levels neither incremented nor decremented.`, () => {
            const levels = [[1 + i, 1 + i, 1 + i, 1 + i, 1 + i]];
            const expectedSafeReports = 0;
    
            const safeReports = countSafeReports(levels)
    
            expect(safeReports).toEqual(expectedSafeReports);
        })
    }
    for (let i = 0; i < 3; i++) {
        it(`should return 0 for one set of 5 levels when one level is not incremented.`, () => {
            const levels = [[1, 2 + i, 2 + i, 4 + (3 * i), 5 + (4 * i)]];
            const expectedSafeReports = 0;
    
            const safeReports = countSafeReports(levels)
    
            expect(safeReports).toEqual(expectedSafeReports);
        })
    }
    it("should provide answer", () => {
        fs.readFile("/Users/jakubwiszowaty/personal-projects/Advent Of Code/2024/two.txt", "utf-8")
            .then(data => {
                return data.split("\n").map((numbersString) => numbersString.split(" ").map((number) => +number));
            })
            .then(data => {
                console.log(countSafeReports(data));
                
            })
    })
})