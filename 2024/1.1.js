const sortNumbers = (numbers) => {
    if (Array.isArray(numbers[0])) {
        const numbersCopy = [...numbers]
        for (let i = 0; i < numbers.length; i++) {
            numbersCopy[i] = numbersCopy[i].sort((a, b) => a - b)
        }
        return numbersCopy
    } else {
        return numbers.sort((a, b) => a - b)
    }
}
const findDistance = (numbers) => {
    const distances = []
    for (let i = 0; i < numbers[0].length; i++) {
        const difference = Math.abs(numbers[0][i] - numbers[1][i])
        distances.push(difference)
    }
    return distances;
}
const sumDistances = (numbers) => numbers.reduce((acc, curr) => acc + curr)

const calculateTotalDistance = (numbers) => {
    const sortedNumbers = sortNumbers(numbers)
    const distances = findDistance(sortedNumbers)
    const totalDistance = sumDistances(distances)
    
    return totalDistance
}
module.exports = {sortNumbers, findDistance, sumDistances, calculateTotalDistance} 