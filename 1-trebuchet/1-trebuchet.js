const fs = require('fs/promises')

const matchNums = (data) => {
    const rows = data.split("\n")
    const multiDigitStrings = rows.map((row) => {
        const matchNumbersRegex = /[0-9]/g
        const match = row.match(matchNumbersRegex).join("")
        return match
    })
    return multiDigitStrings
}
const makeTwoDigitStrings = (multiDigitStrings) => {
    const twoDigitStrings = multiDigitStrings.map((string) => {
        if (string.length < 2) {
            return string + string
        } else if (string.length > 2) {
            return string[0] + string[string.length - 1]
        } else {
            return string
        }
    })
    return twoDigitStrings
}
const makeTwoDigitNums = (multiDigitNums) => {
    const twoDigitNums = multiDigitNums.map((string) => +string)
    return twoDigitNums
}
const add = (twoDigitNums) => {
    return twoDigitNums.reduce((acc, curr) => acc + curr)
}

fs.readFile('./1-trebuchet/1-trebuchet.txt', 'utf-8')
    .then((result) => {
        const result1 = matchNums(result)
        const result2 = makeTwoDigitStrings(result1)
        const result3 = makeTwoDigitNums(result2)
        const result4 = add(result3)
        console.log(result4)
    })
    .catch((error) => console.log(error))


module.exports = { matchNums, makeTwoDigitStrings, makeTwoDigitNums, add }