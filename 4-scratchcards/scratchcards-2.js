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
const countMatchedPartTwo = (randomNums, winningNums) => {
    const numberOfMatchedNums = randomNums.map((card, index) => {
        let number = 0;
        card.forEach((num) => {
            if (winningNums[index].includes(num)) {
                number++
            }
        })
        return [number]
    })
    return numberOfMatchedNums
}
//Add cards accordingly to the number of matched numbers
const addCards = (numberOfMatchedNums) => {
    numberOfMatchedNums.forEach((card, index) => {
        for (let i = 0; i < card.length; i++) {
            for (let j = 0; j < card[0]; j++) {
                numberOfMatchedNums[index + 1 + j].push(numberOfMatchedNums[index + 1 + j][0])
            }
        }
    })
    return numberOfMatchedNums
}
const countCards = (addedCards) => {
    let sum = 0;
    addedCards.forEach((cards) => sum += cards.length)
    return sum
}
const testInput = fs.readFileSync("4-scratchcards/data.txt","utf8")
const winningNums = extractWinNums(testInput)
const randomNums = extractRanNums(testInput)
const numberOfMatchedNums = countMatchedPartTwo(randomNums, winningNums)
const addedCards = addCards(numberOfMatchedNums)
const sum = countCards(addedCards)
console.log(sum);
module.exports = { extractWinNums, extractRanNums, countMatchedPartTwo, addCards, countCards }