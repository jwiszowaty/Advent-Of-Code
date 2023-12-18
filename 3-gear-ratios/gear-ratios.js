const fs = require('fs')
const { toArray } = require("../2-cube-conundrum/part-1/cube-conundrum-2-1.js")
const findNums = (dataArr) => {
    const nums = dataArr.map((line) => {
        const foundNumsStr = line.match(/\d+/g)
        if (foundNumsStr !== null) {
            return foundNumsStr.map((str) => +str)
        }
    })
    return nums.map((set) => set === undefined ? [] : set)
}
const collectInfo = (nums, dataArr) => {
    const numsInfoObj = {}
    nums.map((line, index) => {
        const lineIndex = index
        if (line.length > 0) {
            line.forEach((num) => {
                const index = dataArr[lineIndex].indexOf(num.toString())
                numsInfoObj[lineIndex+"."+index] = {
                    num: num,
                    length: num.toString().length,
                    line: lineIndex,
                    index: index
                }
            })
        }
    })
    return numsInfoObj
}
const findAdjacent = (numsInfo, dataArr) => {
    for (const key in numsInfo) {
        const { line, index, length } = numsInfo[key]
        if (line === 0) {
            if (index === 0) numsInfo[key].adjacent = (dataArr[line].slice(index,index+length+1)+dataArr[line+1].slice(index,index+length+1))
            if (index === dataArr[line].length - length+1) numsInfo[key].adjacent = (dataArr[line].slice(index - 1, index + length) + dataArr[line + 1].slice(index - 1, index + length))
            if (index > 0 && index < dataArr[line].length - length+1) numsInfo[key].adjacent = (dataArr[line].slice(index - 1, index + length + 1) + dataArr[line + 1].slice(index - 1, index + length + 1))
        }
        if (line < dataArr.length - 1 && line > 0) {
            if (index === 0) numsInfo[key].adjacent = (dataArr[line-1].slice(index,index+length+1)+dataArr[line].slice(index,index+length+1)+dataArr[line+1].slice(index,index+length+1))
            if (index === dataArr[line].length - length+1) numsInfo[key].adjacent = (dataArr[line-1].slice(index-1,index+length)+dataArr[line].slice(index-1,index+length)+dataArr[line+1].slice(index-1,index+length))
            if (index > 0 && index < dataArr[line].length - length+1) numsInfo[key].adjacent = (dataArr[line-1].slice(index-1,index+length+1)+dataArr[line].slice(index-1,index+length+1)+dataArr[line+1].slice(index-1,index+length+1))
        }
        if (line === dataArr.length - 1) {
            if (index === 0) numsInfo[key].adjacent = (dataArr[line-1].slice(index,index+length+1)+dataArr[line].slice(index,index+length+1))
            if (index === dataArr[line].length - length+1) numsInfo[key].adjacent = (dataArr[line-1].slice(index-1,index+length)+dataArr[line].slice(index-1,index+length))
            if (index > 0 && index < dataArr[line].length - length+1) numsInfo[key].adjacent = (dataArr[line-1].slice(index-1,index+length+1)+dataArr[line].slice(index-1,index+length+1))
        }
    }
    return numsInfo
}
const sumEngineParts = (adjacentChars) => {
    let sumAll = 0
    let sumYes = 0
    let sumNo = 0
    for (const key in adjacentChars) {
        sumAll+=adjacentChars[key].num
        if (/[^0-9|.]/.test(adjacentChars[key].adjacent)) {
            sumYes+=adjacentChars[key].num  
        } else if (!/[^0-9|.]/.test(adjacentChars[key].adjacent)) {
            sumNo+=adjacentChars[key].num  
            console.log(adjacentChars[key]); 
        }

    }
    return sumYes
}

const dataInput = fs.readFileSync('./3-gear-ratios/gear-ratios.txt', 'utf8')
const dataArr = toArray(dataInput)
const nums = findNums(dataArr)
const numsInfo = collectInfo(nums, dataArr)
const adjacentChars = findAdjacent(numsInfo, dataArr)
const engineParts = sumEngineParts(adjacentChars)
console.log(engineParts);
module.exports = {
    findNums, collectInfo, findAdjacent, sumEngineParts
}