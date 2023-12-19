const findStars = (dataArr) => {
    const starsIndexes = []
    dataArr.forEach((line, lineIndex) => {
        line.forEach((char, charIndex) => {
            if (/\*/.test(char)) {
                starsIndexes.push([lineIndex, charIndex])
            }
        })
    })
    return starsIndexes
}
const collectNumsAdjacent = (starsIndexes, dataArr) => {
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
        const topRowTwo = (topLeftCorner + top + topRightCorner)
        if (/[0-9]{2,}/.test(topRowTwo)) {
            console.log("there are two in top row");
        }
        if (/[0-9]/.test(topLeftCorner)) {
            let number = []
            for (let index = 0; index < 3; index++) {
                number.splice(0,0,dataArr[lineIndex - 1][charIndex - 1 - index])
            }
            numsStar.push(+number.join(""))
        }
        const bottomRowTwo = (bottomLeftCorner + bottom + bottomRightCorner)
        if (/[0-9]{2,}/.test(bottomRowTwo)) {
            console.log("there are two in bottom row");
            if (/[0-9]/.test(bottomLeftCorner)) {

            }
            if (/[0-9]/.test(bottomRightCorner)) {
                
            }
        }
        if (/\d/.test(right)) {
            console.log("there is one on the right");
            let number = []
            for (let index = 0; index < 3; index++) {
                number.splice(0,0,dataArr[lineIndex][charIndex + 1 + index])
            }
            numsStar.push(+number.join(""))
        }
        if (/\d/.test(left)) {
            console.log("there is one on the left");
            let number = []
            for (let index = 0; index < 3; index++) {
                number.splice(0,0,dataArr[lineIndex][charIndex - 1 - index])
            }
            numsStar.push(+number.join(""))
        }
        numsAdjacentToStars.push(numsStar)
    })
    console.log(numsAdjacentToStars);
    return numsAdjacentToStars
}
module.exports = { findStars, collectNumsAdjacent }
