const fs = require("fs/promises")
describe("1: Historian Hysteria", () => {
    const { sortNumbers, findDistance, sumDistances, calculateTotalDistance} = require("../2024/1.js")
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
describe("2 Part 1: Red-Nosed Reports", () => {
    const { checkSafety, countSafeReports} = require("../2024/2.1.js")
    
    for (let i = 0; i < 3; i++) {
        it(`should return 1 for a set of 5 levels incremented by ${i + 1}.`, () => {
            const levels = [[1, 2 + i, 3 + (2 * i), 4 + (3 * i), 5 + (4 * i)]];
            const expectedSafeReports = 1;
    
            const safeReports = countSafeReports(levels)
    
            expect(safeReports).toEqual(expectedSafeReports);
        })
    }
    for (let i = 0; i > -3; i--) {
        it(`should return 1 for a set of 5 levels decremented by ${i - 1}.`, () => {
            const levels = [[20, 19 + i, 18 + (2 * i), 17 + (3 * i), 16 + (4 * i)]];
            const expectedSafeReports = 1;
    
            const safeReports = countSafeReports(levels)
    
            expect(safeReports).toEqual(expectedSafeReports);
        })
    }
    for (let i = 0; i < 3; i++) {
        it(`should return 0 for a set of 5 levels neither incremented nor decremented.`, () => {
            const levels = [[1 + i, 1 + i, 1 + i, 1 + i, 1 + i]];
            const expectedSafeReports = 0;
    
            const safeReports = countSafeReports(levels)
    
            expect(safeReports).toEqual(expectedSafeReports);
        })
    }
    for (let i = 0; i < 3; i++) {
        it(`should return 0 for a set of 5 levels when one level is not incremented.`, () => {
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
describe("2 Part 2: Red-Nosed Reports", () => {
    const {countSafeReports} = require("../2024/2.2.js")
    it(`should return 1 for a set of 5 levels incremented by 1 with ou level decreasing.`, () => {
        const levels = [[1, 2, 1, 4, 5]];
        const expectedSafeReports = 1;

        const safeReports = countSafeReports(levels)

        expect(safeReports).toEqual(expectedSafeReports);
    })
    it(`should return 1 for a set of 5 levels decremented by 1 with ou level increasing.`, () => {
        const levels = [[7, 8, 5, 4, 3]];
        const expectedSafeReports = 1;

        const safeReports = countSafeReports(levels)

        expect(safeReports).toEqual(expectedSafeReports);
    })
    it(`should return 0 for a set of 5 levels decremented by 1 with one level increasing and repaired level has too big difference.`, () => {
        const levels = [[9, 8, 9, 4, 3]];
        const expectedSafeReports = 0;

        const safeReports = countSafeReports(levels)

        expect(safeReports).toEqual(expectedSafeReports);
    })
    it(`should return 0 for a set of 5 levels decremented by 1 with 2 levels not following trend.`, () => {
        const levels = [[9, 8, 10, 9, 7]];
        const expectedSafeReports = 0;

        const safeReports = countSafeReports(levels)

        expect(safeReports).toEqual(expectedSafeReports);
    })
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
describe("3.1: Mull It Over", () => {
    const {sumMul} = require("../2024/3.1.js")
    it("should return the result of a single instruction", () => {
        const instruction = "mul(2,3)";
        const expected = 6;
        const actual = sumMul(instruction)
        expect(actual).toEqual(expected)
    })
    it("should return the result of a single instruction being surrounded by extra characters", () => {
        const instruction = "xmul(2,3)44";
        const expected = 6;
        const actual = sumMul(instruction)
        expect(actual).toEqual(expected)
    })
    it("should return the result of a multiple instructions in a row", () => {
        const instruction = "mul(2,3)mul(2,3)mul(2,3)";
        const expected = 18;
        const actual = sumMul(instruction)
        expect(actual).toEqual(expected)
    })
    it("should return the result of a multiple instructions which are separated by other characters", () => {
        const instruction = "mul(2,3)fffffmul(2,3)vcvc5s7hddmul(2,3)dhdhd7333%%%";
        const expected = 18;
        const actual = sumMul(instruction)
        expect(actual).toEqual(expected)
    })
    it("should only read correctly formatted instructions", () => {
        const instruction = "mul(2!,3)fffffmful(2,3)vcvc5s7hddmul(2,3)dhdhd7333%%%";
        const expected = 6;
        const actual = sumMul(instruction)
        expect(actual).toEqual(expected)
    })
    it("should not read instructions with numbers larger than 3 digits", () => {
        const instruction = "mul(2116,3)fffffmul(2,3444)vcvc5s7hddmul(2,3)dhdhd7333%%%";
        const expected = 6;
        const actual = sumMul(instruction)
        expect(actual).toEqual(expected)
    })
    it("should provide answer", () => {
        fs.readFile("/Users/jakubwiszowaty/personal-projects/Advent Of Code/2024/3.txt", "utf-8")
            .then(data => {
                console.log(sumMul(data));
            })
    })
})
describe("3.2: Mull It Over Part 2", () => {
    const {evaluateInstructions} = require("../2024/3.2.js")
    it("should return the result of a single instruction", () => {
        const instruction = "ggggggggmul(2,3)don't()mul(2,3)ffffdo()mul(2,3)don't()mul(2,3)mul(2,3)do()mul(2,3)don't()do()mul(2,3)";
        const expected = 24;
        const actual = evaluateInstructions(instruction)
        expect(actual).toEqual(expected)
    })
    it("should provide answer", () => {
        fs.readFile("/Users/jakubwiszowaty/personal-projects/Advent Of Code/2024/3.txt", "utf-8")
            .then(data => {
                console.log(evaluateInstructions(data));
            })
    })
})
describe("4.1: Ceres Search", () => {
    const {findRowLength, checkAllPossibilities, countWords, findWords} = require("../2024/4.1.js")
    it("should find length of a single row", () => {
        const data = "MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX";
        const expected = 11;
        const actual = findRowLength(data)
        expect(actual).toEqual(expected)
    })
    it("should analyse the possible occurences of XMAS", () => {
        const data = [['S','M','M','S','S','S','S','A','M','X'],['A','S','A','M','S','M','S','M','M','M'],['M','M','S','S','S','M','A','A','M','A'],['X','M','A','S','A','S','S','S','M','S']];
        const expected = ["X", "X", "XMAS", "XMAS", "XMAS", "X", "X", "X" ]
        const actual = checkAllPossibilities(data, 9)
        expect(actual).toEqual(expected)
    })
    it("should count XMAS's", () => {
        const data = "SMMSSSSAMX\nASAMSMSMMM\nMMSSSMAAMA\nXMASASSSMS";
        const expected = 6;
        const actual = findWords(data)
        expect(actual).toEqual(expected)
    })
    it("should provide answer", () => {
        fs.readFile("/Users/jakubwiszowaty/personal-projects/Advent Of Code/2024/4.txt", "utf-8")
            .then(data => {
                console.log(findWords(data));
            })
    })
})
describe.only("4.2: Ceres Search", () => {
    const {parseGrid, findA, findDiagonalWords, countMASCross, searchXMAS} = require("../2024/4.2.js")
    it("should return data as an array of arrays of characters", () => {
        const data = "MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX";
        const expected = [['M','M','M','S','X','X','M','A','S','M'],['M','S','A','M','X','M','S','M','S','A'],['A','M','X','S','X','M','A','A','M','M'],['M','S','A','M','A','S','M','S','M','X']];
        const actual = parseGrid(data)
        expect(actual).toEqual(expected)
    })
    it("should return coordination list of A's in the grid", () => {
        const grid = [['M', 'M', 'M', 'S', 'X', 'X', 'M', 'A', 'S', 'M'], ['M', 'S', 'A', 'M', 'X', 'M', 'S', 'M', 'S', 'A'], ['A', 'M', 'X', 'S', 'X', 'M', 'A', 'A', 'M', 'M'], ['M', 'S', 'A', 'M', 'A', 'S', 'M', 'S', 'M', 'X']];
        const expected = [[0, 7], [1, 2], [1, 9], [2, 0], [2, 6], [2, 7], [3, 2], [3, 4]]
        const actual = findA(grid)
        expect(actual).toEqual(expected)
    })
    it("should return three letter words with coordination of 'A' in the middle", () => {
        const grid = [['M', 'M', 'M', 'S', 'X', 'X', 'M', 'A', 'S', 'M'], ['M', 'S', 'A', 'M', 'X', 'M', 'S', 'M', 'S', 'A'], ['A', 'M', 'X', 'S', 'X', 'M', 'A', 'A', 'M', 'M'], ['M', 'S', 'A', 'M', 'A', 'S', 'M', 'S', 'M', 'X']];
        const coordinates = [[0, 7], [1, 2], [1, 9], [2, 0], [2, 6], [2, 7], [3, 2], [3, 4]];
        const actual = findDiagonalWords(grid, coordinates)
        const expected = [["SA", "AS"], ["MAS", "MAS"], ["MA", "SA"], ["AS", "AS"], ["SAM", "MAS"], ["MAS", "SAM"], ["AS", "MA"], ["AM", "SA"]]
        expect(actual).toEqual(expected)
    })
    it("should return number of 'MAS' crosses", () => {
        const diagonalWords = [["SA", "AS"], ["MAS", "MAS"], ["MA", "SA"], ["AS", "AS"], ["SAM", "MAS"], ["MAS", "SAM"], ["AS", "MA"], ["AM", "SA"]];
        const expected = 3;
        const actual = countMASCross(diagonalWords)
        expect(actual).toEqual(expected)
    })
    it("should provide answer", () => {
        fs.readFile("/Users/jakubwiszowaty/personal-projects/Advent Of Code/2024/4.txt", "utf-8")
            .then(data => {
                console.log(searchXMAS(data));
            })
    })
})