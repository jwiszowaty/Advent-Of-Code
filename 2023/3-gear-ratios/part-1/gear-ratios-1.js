const fs = require('fs')
const toArray3 = (data) => {
    const lines = data.split(/\n/g)
    const chars = lines.map(lines => {
        return lines.split("")
    })
    return chars
}
const findEngineParts = (dataArr) => {
    const specialChars = ['-', '+', '*', '&', '/', '@', '%', '=', '$', '#']
    const partsNums = []
    dataArr.forEach((line, lineIndex) => {
        let build = ""
        line.forEach((char, charIndex) => {
            if (/\d/.test(char)) {
                build += char
                const nextChar = dataArr[lineIndex][charIndex + 1] === undefined ? "." : dataArr[lineIndex][charIndex + 1]
                if (!/\d/.test(nextChar)) {

                    let charBefore = dataArr[lineIndex][charIndex - build.length] === undefined ? "A" : dataArr[lineIndex][charIndex - build.length]
                    let charAfter = dataArr[lineIndex][charIndex + 1] === undefined ? "A" : dataArr[lineIndex][charIndex + 1]
                    if (specialChars.includes(charBefore) || specialChars.includes(charAfter)) {
                        partsNums.push(+build)
                        build = ""
                        return;
                    } else if (dataArr[lineIndex - 1] !== undefined && dataArr[lineIndex + 1] !== undefined) {
                        let charDAboveL = dataArr[lineIndex - 1][charIndex - build.length - 1] === undefined ? "A" : dataArr[lineIndex - 1][charIndex - build.length]
                        let charDAboveR = dataArr[lineIndex - 1][charIndex + 1] === undefined ? "A" : dataArr[lineIndex - 1][charIndex + 1]
                        let charDBelowL = dataArr[lineIndex + 1][charIndex - build.length - 1] === undefined ? "A" : dataArr[lineIndex + 1][charIndex - build.length]
                        let charDBelowR = dataArr[lineIndex + 1][charIndex + 1] === undefined ? "A" : dataArr[lineIndex + 1][charIndex + 1]
                        const charsAbove = dataArr[lineIndex - 1].slice(charIndex - build.length + 1, charIndex + 1).join("")
                        const charsBelow = dataArr[lineIndex + 1].slice(charIndex - build.length + 1, charIndex + 1).join("")
                        const charsAround = (charDAboveL + charDAboveR + charDBelowL + charDBelowR + charsAbove + charsBelow)
                        const charsAroundArr = charsAround.split("")
                        const findParts = charsAroundArr.some(char => specialChars.includes(char))
                        if (findParts) {
                            partsNums.push(+build)
                            build = ""
                            return;
                        }
                    } else if (dataArr[lineIndex - 1] === undefined && dataArr[lineIndex + 1] !== undefined) {
                        let charDBelowL = dataArr[lineIndex + 1][charIndex - build.length - 1] === undefined ? "A" : dataArr[lineIndex + 1][charIndex - build.length]
                        let charDBelowR = dataArr[lineIndex + 1][charIndex + 1] === undefined ? "A" : dataArr[lineIndex + 1][charIndex + 1]
                        const charsBelow = dataArr[lineIndex + 1].slice(charIndex - build.length + 1, charIndex + 1).join("")
                        const charsAround = charDBelowL + charDBelowR + charsBelow
                        const charsAroundArr = charsAround.split("")
                        const findParts = charsAroundArr.some(char => specialChars.includes(char))
                        if (findParts) {
                            partsNums.push(+build)
                            build = ""
                            return;
                        }
                    } else if (dataArr[lineIndex - 1] !== undefined && dataArr[lineIndex + 1] === undefined) { 
                        let charDAboveL = dataArr[lineIndex - 1][charIndex - build.length - 1] === undefined ? "A" : dataArr[lineIndex - 1][charIndex - build.length]
                        let charDAboveR = dataArr[lineIndex - 1][charIndex + 1] === undefined ? "A" : dataArr[lineIndex - 1][charIndex + 1]
                        const charsAbove = dataArr[lineIndex - 1].slice(charIndex - build.length + 1, charIndex + 1).join("")
                        const charsAround = charDAboveL + charDAboveR + charsAbove
                        const charsAroundArr = charsAround.split("")
                        const findParts = charsAroundArr.some(char => specialChars.includes(char))
                        if (findParts) {
                            partsNums.push(+build)
                            build = ""
                            return;
                        }
                    }
                } 
            } else {
                build = ""
            }
        })
    })
    return partsNums
}
const sumEngineParts = (partsNums) => {
    return partsNums.reduce((acc, curr) => acc + curr)
}
const dataInput = fs.readFileSync('./3-gear-ratios/gear-ratios.txt', 'utf8')
const dataArr = toArray3(dataInput)
const partsNums = findEngineParts(dataArr)
const sum = sumEngineParts(partsNums)
// console.log(sum);
module.exports = { toArray3, findEngineParts, sumEngineParts }