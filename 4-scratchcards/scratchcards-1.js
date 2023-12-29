const fs = require("fs")
//create two array for winning numbers and random numbers
const extractWinNums = (dataInput) => {
    const extractedLinesOfWinNums = dataInput.match(/(?<=:[ ]+)\d.+(?=[ ]+\|)/g)
    const listOfWinNums = extractedLinesOfWinNums.map((nums) => {
        const splitnums = nums.split(" ")
        return splitnums.map(num => +num)
    })
    return listOfWinNums
} 
const extractRanNums = (dataInput) => {
    const extractedLinesOfRanNums = dataInput.match(/(?<=\|[ ]+)\d.+/g)
    const listOfRanNums = extractedLinesOfRanNums.map((nums) => {
        const splitnums = nums.split(/[ ]+/)
        return splitnums.map(num => +num)
    })
    return listOfRanNums
} 
//calculate how many matches for each card
const countMatched = (randomNums, winningNums) => {
    const numberOfMatchedNums = randomNums.map((card, index) => {
        let number = 0;
        card.forEach((num) => {
            if (winningNums[index].includes(num)) {
                number++
            }
        })
        return number
    })
    return numberOfMatchedNums
}
//calculate how many points for each card
const calculatePoints = (numberOfMatchedNums) => {
    return numberOfMatchedNums.map((num) => Number.isInteger(Math.pow(2, num-1)) ? Math.pow(2, num-1) : 0)
}
//sum of points from cards
const sumPoints = (pointsForEachCard) => {
    return pointsForEachCard.reduce((acc, curr) => acc + curr)
}
//Input data
    const testInput = fs.readFileSync("4-scratchcards/data.txt","utf8")
    const winningNums = extractWinNums(testInput)
    const randomNums = extractRanNums(testInput)
    const numberOfMatchedNums = countMatched(randomNums, winningNums)
    const pointsForEachCard = calculatePoints(numberOfMatchedNums)
    const sum = sumPoints(pointsForEachCard)
    // console.log(sum);
module.exports = { extractWinNums, extractRanNums, countMatched, calculatePoints, sumPoints }