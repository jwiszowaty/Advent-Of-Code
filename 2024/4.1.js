const findRowLength = (data) => {
    return data.indexOf("\n")+1;
}

const returnWord = (data, row, column, direction) => {
    const rowLength = data[0].length
    let word = "X"
    const positions = {
        "right": [[row, column+1],[row, column+2],[row, column+3]],
        "diag-135": [[row+1, column+1],[row+2, column+2],[row+3, column+3]],
        "down": [[row+1, column],[row+2, column],[row+3, column]],
        "diag-225": [[row+1, column-1],[row+2, column-2],[row+3, column-3]],
        "left": [[row, column-1],[row, column-2],[row, column-3]],
        "diag-315": [[row-1, column-1],[row-2, column-2],[row-3, column-3]],
        "up": [[row-1, column],[row-2, column],[row-3, column]],
        "diag-45": [[row-1, column+1],[row-2, column+2],[row-3, column+3]]
    }
    for (let index = 0; index < 3; index++) {
        const currentRow = positions[direction][index][0];
        const currentColumn = positions[direction][index][1]
        if (currentRow >= 0 && currentRow < data.length && currentColumn >= 0 && currentColumn < rowLength) {
            const nextLetter = data[currentRow][currentColumn]
            word = word + nextLetter;
        } else {
            break;
        }
    }
    return word;
}
    
const checkAllPossibilities = (data, listOfPossibilities = {}) => {
    const dataSplit = data.split("\n").map(row => row.split(""))
    const Xposition = data.indexOf("X")
    const column = Xposition%11
    const row = Math.floor(Xposition/11)
    
    const directions = ["right", "diag-135", "down", "diag-225", "left", "diag-315", "up", "diag-45"]
    if (Xposition === -1) {
        return listOfPossibilities;
    }

    listOfPossibilities[Xposition] = directions.map(direction => returnWord(dataSplit, row, column, direction))
    
    return checkAllPossibilities(data.replace("X", "."), listOfPossibilities)
}
const countWords = (listOfPossibilities) => {
    let count = 0;
    for (const key in listOfPossibilities) {
        const filteredList = listOfPossibilities[key].filter((word) => word === "XMAS")
        count = count + filteredList.length
    }
    return count;
}
const findWords = (data) => {
    return countWords(checkAllPossibilities(data))
}
module.exports = {findRowLength, checkAllPossibilities, countWords, findWords}