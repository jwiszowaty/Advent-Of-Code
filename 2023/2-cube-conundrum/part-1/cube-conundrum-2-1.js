const fs = require('fs')
const toArray = (data) => {
    const gamesResults = data.split(/\n/g)
    return gamesResults
}
const removeImpossibleResults = (gamesResults) => {
    const regex = /(?!(?:[0-9]|10|11|12) red)\d+ red|(?!(?:[0-9]|10|11|12|13) green)\d+ green|(?!(?:[0-9]|10|11|12|13|14) blue)\d+ blue/
    const possibleGamesIndexes = gamesResults.map((game, index) => game.match(regex) ? 0 : index + 1)
    return possibleGamesIndexes
}
const addIndexes = (possibleGamesIndexes) => {
    const indexesSum = possibleGamesIndexes.reduce((acc, curr) => acc + curr, 0)
    return indexesSum
}
const input = fs.readFileSync('./2-cube-conundrum/2-cube-conundrum.txt', 'utf8')
const gamesResultsProd = toArray(input)
const possibleGamesIndexesProd = removeImpossibleResults(gamesResultsProd)
const indexesSumProd = addIndexes(possibleGamesIndexesProd)

module.exports = { toArray, removeImpossibleResults, addIndexes }