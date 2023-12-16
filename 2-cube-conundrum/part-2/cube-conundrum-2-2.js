const fs = require('fs')
const { toArray } = require("../part-1/cube-conundrum-2-1.js")
const organiseResults = (gameResults) => {
    const resultsSummaries = gameResults
        .map((game) => {
            const redCubes = game.match(/\d+(?= red)/g).map((str) => +str)
            const greenCubes = game.match(/\d+(?= green)/g).map((str) => +str)
            const blueCubes = game.match(/\d+(?= blue)/g).map((str) => +str)
            return [redCubes, greenCubes, blueCubes]
        })
    return resultsSummaries
}

const orderResults = (resultsSummaries) => {
    const orderedSummaries = resultsSummaries.map((game) => {
        const orderedGame = game.map((cubes) => {
            return cubes.sort((a, b) => b - a)
        })
        return orderedGame
    })
    return orderedSummaries
}

const reduceResults = (orderedSummaries) => { 
    const reducedSummaries = orderedSummaries.map((game) => {
        const reducedGame = game.map((cubes) => {
            return cubes[0]
        })
        return reducedGame
    })
    return reducedSummaries
}

const multiplyResults = (reducedSummaries) => {
    const multipliedSummaries = reducedSummaries.map(([a, b, c]) => {
        return a * b * c
    })
    return multipliedSummaries
}

const addResults = (multipliedSummaries) => {
    const addedSummaries = multipliedSummaries.reduce((acc, curr) => acc + curr)
    return addedSummaries
}

const input = fs.readFileSync('./2-cube-conundrum/2-cube-conundrum.txt', 'utf8')
const gamesResults = toArray(input)
const resultsSummaries = organiseResults(gamesResults)
const orderedSummaries = orderResults(resultsSummaries)
const reducedSummaries = reduceResults(orderedSummaries)
const multipliedSummaries = multiplyResults(reducedSummaries)
const addedSummaries = addResults(multipliedSummaries)
console.log(addedSummaries);
module.exports = { organiseResults, orderResults, reduceResults, multiplyResults, addResults }