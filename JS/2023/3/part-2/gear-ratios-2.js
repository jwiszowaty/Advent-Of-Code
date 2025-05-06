const fs = require('fs')
const toArray3 = (data) => {
    const lines = data.split(/\n/g)
    const chars = lines.map(lines => {
        return lines.split("")
    })
    return chars
}
const findStarsGears = (dataArr) => {
    const starsIndexes = []
    dataArr.forEach((line, lineIndex) => {
        line.forEach((char, charIndex) => {
            if (/\*/.test(char)) {
                const topLeftCorner = dataArr[lineIndex - 1][charIndex - 1] ? dataArr[lineIndex - 1][charIndex - 1] : "."
                const top = dataArr[lineIndex - 1][charIndex] ? dataArr[lineIndex - 1][charIndex] : "."
                const topRightCorner = dataArr[lineIndex - 1][charIndex + 1] ? dataArr[lineIndex - 1][charIndex + 1] : "."
                const right = dataArr[lineIndex][charIndex + 1] ? dataArr[lineIndex][charIndex + 1] : "."
                const bottomRightCorner = dataArr[lineIndex + 1][charIndex + 1] ? dataArr[lineIndex + 1][charIndex + 1] : "."
                const bottom = dataArr[lineIndex + 1][charIndex] ? dataArr[lineIndex + 1][charIndex] : "."
                const bottomLeftCorner = dataArr[lineIndex + 1][charIndex - 1] ? dataArr[lineIndex + 1][charIndex - 1] : "."
                const left = dataArr[lineIndex][charIndex - 1] ? dataArr[lineIndex][charIndex - 1] : "."

                const aroundChars = topLeftCorner + top + topRightCorner + "." + right + "." + bottomLeftCorner + bottom + bottomRightCorner + "." + left
                const filterStars = aroundChars.match(/\d+/g).length
                if (filterStars === 2) {
                    starsIndexes.push([lineIndex, charIndex])
                }
            }
        })
    })
    return starsIndexes
}
const findTheNumbersAdjacentToStarsGears = (starsIndexes, dataArr) => {
    const numsAdjacentToStars = []
    starsIndexes.forEach((star) => {
        const numsStar = []
        const lineIndex = star[0]
        const charIndex = star[1]
        const topLeftCorner = dataArr[lineIndex - 1][charIndex - 1] ? dataArr[lineIndex - 1][charIndex - 1] : "A"
        const top = dataArr[lineIndex - 1][charIndex] ? dataArr[lineIndex - 1][charIndex] : "A"
        const topRightCorner = dataArr[lineIndex - 1][charIndex + 1] ? dataArr[lineIndex - 1][charIndex + 1] : "A"
        const right = dataArr[lineIndex][charIndex + 1] ? dataArr[lineIndex][charIndex + 1] : "A"
        const bottomRightCorner = dataArr[lineIndex + 1][charIndex + 1] ? dataArr[lineIndex + 1][charIndex + 1] : "A"
        const bottom = dataArr[lineIndex + 1][charIndex] ? dataArr[lineIndex + 1][charIndex] : "A"
        const bottomLeftCorner = dataArr[lineIndex + 1][charIndex - 1] ? dataArr[lineIndex + 1][charIndex - 1] : "A"
        const left = dataArr[lineIndex][charIndex - 1] ? dataArr[lineIndex][charIndex - 1] : "A"
        const topRow = (topLeftCorner + top + topRightCorner)
        const bottomRow = (bottomLeftCorner + bottom + bottomRightCorner)
        //Instance of two digits appearing in the row ABOVE the start, for example [digit][digit][non-digit], [non-digit][digit][digit] or [digit][non-digit][digit]
        if (/[0-9]{2}/.test(topRow) || /[0-9]{1}.[0-9]{1}/.test(topRow)) {
            if (/\d[^\d]\d/.test(topRow)) {
                let number = []
                for (let index = 0; index < 3; index++) {
                    let nextChar = dataArr[lineIndex - 1][charIndex - 1 - index]
                    number.splice(0, 0, /\d/.test(nextChar) ? nextChar : '')
                }
                const filteredNum = number.join("").match(/[0-9]{2,3}/)
                numsStar.push(+filteredNum)
                let number1 = []
                for (let index = 0; index < 3; index++) {
                    let nextChar = dataArr[lineIndex - 1][charIndex + 1 + index]
                    number1.push(/\d/.test(nextChar) ? nextChar : '')
                }
                const filteredNum1 = number1.join("").match(/[0-9]{2,3}/)
                numsStar.push(+filteredNum1)
            } else {
                let number = dataArr[lineIndex - 1].slice(charIndex - 2, charIndex + 3).join("")
                const filteredNum = number.match(/[0-9]{2,3}/)
                numsStar.push(+filteredNum[0])
            }
            
        }
        //Instance of two digits appearing in the row BELOW the start, for example [digit][digit][non-digit], [non-digit][digit][digit] or [digit][non-digit][digit]
        if (/[0-9]{2}/.test(bottomRow)  || /[0-9]{1}.[0-9]{1}/.test(bottomRow)) {
            if (/\d[^\d]\d/.test(bottomRow)) {
                let number = []
                for (let index = 0; index < 3; index++) {
                    let nextChar = dataArr[lineIndex + 1][charIndex - 1 - index]
                    number.splice(0, 0, /\d/.test(nextChar) ? nextChar : '')
                }
                const filteredNum = number.join("").match(/[0-9]{2,3}/)
                numsStar.push(+filteredNum)
                let number1 = []
                for (let index = 0; index < 3; index++) {
                    let nextChar = dataArr[lineIndex + 1][charIndex + 1 + index]
                    number1.push(/\d/.test(nextChar) ? nextChar : '')
                }
                const filteredNum1 = number1.join("").match(/[0-9]{2,3}/)
                numsStar.push(+filteredNum1)
            } else {
                let number = dataArr[lineIndex + 1].slice(charIndex - 2, charIndex + 3).join("")
                const filteredNum = number.match(/[0-9]{2,3}/)
                numsStar.push(+filteredNum[0])
            }
        }
        //Instance of one digit appearing in the row ABOVE the start, for example [non-digit][non-digit][digit], [digit][non-digit][non-digit] or [non-digit][digit][non-digit]
        if (/[^\d]{2}\d/.test(topRow) || /\d[^\d]{2}/.test(topRow) || /[^\d]\d[^\d]/.test(topRow)) {
            if (/[^\d]\d[^\d]/.test(topRow)) {
                numsStar.push(+top)
            }
            if (/[0-9]/.test(topLeftCorner)) {
                let number = []
                for (let index = 0; index < 3; index++) {
                    let nextChar = dataArr[lineIndex - 1][charIndex - 1 - index]
                    number.splice(0,0,/\d/.test(nextChar) ? nextChar : '')
                }
                numsStar.push(+number.join(""))
            }
            if (/[0-9]/.test(topRightCorner)) {
                let number = []
                for (let index = 0; index < 3; index++) {
                    let nextChar = dataArr[lineIndex - 1][charIndex + 1 + index]
                    number.push(/\d/.test(nextChar) ? nextChar : '')
                }
                numsStar.push(+number.join(""))
            }
        }
         //Instance of one digit appearing in the row BELOW the start, for example [non-digit][non-digit][digit], [digit][non-digit][non-digit] or [non-digit][digit][non-digit]
        if (/[^\d]{2}\d/.test(bottomRow) || /\d[^\d]{2}/.test(bottomRow)) {
            if (/\d[^\d]{2}/.test(bottomRow)) {
                let number = []
                for (let index = 0; index < 3; index++) {
                    let nextChar = dataArr[lineIndex + 1][charIndex - 1 - index]
                    number.splice(0,0, /\d/.test(nextChar) ? nextChar : '')
                }
                numsStar.push(+number.join(""))
            }
            if (/[^\d]{2}\d/.test(bottomRow)) {
                let number = []
                for (let index = 0; index < 3; index++) {
                    let nextChar = dataArr[lineIndex + 1][charIndex + 1 + index]
                    number.push(/\d/.test(nextChar) ? nextChar : '')
                }
                numsStar.push(+number.join(""))
            }
        }
        //Instance of a digit appearing to the RIGHT of the star
        if (/\d/.test(right)) {
            let number = []
            for (let index = 0; index < 3; index++) {
                let nextChar = dataArr[lineIndex][charIndex + 1 + index]
                number.push(/\d/.test(nextChar) ? nextChar : '')
            }
            numsStar.push(+number.join(""))
        }
        //Instance of a digit appearing to the LEFT of the star
        if (/\d/.test(left)) {
            let number = []
            for (let index = 0; index < 3; index++) {
                let nextChar = dataArr[lineIndex][charIndex - 1 - index]
                number.splice(0,0,/\d/.test(nextChar) ? nextChar : '')
            }
            numsStar.push(+number.join(""))
        }
        numsAdjacentToStars.push(numsStar)
    })
    return numsAdjacentToStars
}
const sumParts = (gearParts) => {
    const mapGear = gearParts.map(([a, b]) => {
        return a*b
    })
    const reduceGear = mapGear.reduce((acc, curr) => acc + curr)
    return reduceGear
}

const dataInput = fs.readFileSync('./3-gear-ratios/gear-ratios.txt', 'utf8')
const dataArr = toArray3(dataInput)
const starsIndexes = findStarsGears(dataArr)
const numsAdjacentToStars = findTheNumbersAdjacentToStarsGears(starsIndexes, dataArr)
const sum = sumParts(numsAdjacentToStars)
// console.log("sum",sum);
module.exports = {
    findStarsGears, findTheNumbersAdjacentToStarsGears, sumParts}
