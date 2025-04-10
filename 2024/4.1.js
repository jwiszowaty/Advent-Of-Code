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
    
const checkAllPossibilities = (data, Xposition, listOfPossibilities = []) => {
    const column = Xposition%(data[0].length+1)
    const row = Math.floor(Xposition / (data[0].length+1))
    
    const directions = ["right", "diag-135", "down", "diag-225", "left", "diag-315", "up", "diag-45"]

    directions.forEach(direction => listOfPossibilities.push(returnWord(data, row, column, direction)))
    
    return listOfPossibilities;
}
const countWords = (data, Xposition) => {
    const listOfPossibilities = checkAllPossibilities(data, Xposition);
    
    let count = 0;
    const filteredList = listOfPossibilities.filter((word) => word === "XMAS")
    count = count + filteredList.length
    
    return count;
}
const findWords = (data, count = 0) => {
    const dataArray = data.split("\n").map(row => row.split(""))
    const Xposition = data.indexOf("X")
    
    if (Xposition === -1) {
        return count;
    }

    const numberOfXMAS = countWords(dataArray, Xposition)
    count = count + numberOfXMAS
    

    return findWords(data.replace("X","."), count);
}
module.exports = {findRowLength, checkAllPossibilities, countWords, findWords}