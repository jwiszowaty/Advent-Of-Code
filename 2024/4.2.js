const parseGrid = (data) => {
    const parsedColumns = data.split("\n");
    const grid = parsedColumns.map(column => column.split(""))
    return grid;
} 
const findA = (grid) => {
    const coordinates = []
    grid.forEach((row, x) => {
        row.forEach((column, y) => {
            if (column === "A") coordinates.push([x, y])
        })
    });
    return coordinates;
}
const findDiagonalWords = (grid, coordinates) => {
    const diagonalWords = []
    coordinates.forEach(([x, y]) => {
        const charCenter = grid[x][y];
        const charTopLeft = (x - 1 >= 0 && y - 1 >= 0) ? grid[x - 1][y - 1] : "";
        const charBottomRight = (x + 1 < grid.length && y + 1 < grid[0].length) ? grid[x + 1][y + 1] : "";;
        const charBottomLeft = (x + 1 < grid.length && y - 1 >= 0) ? grid[x + 1][y - 1] : "";; 
        const charTopRight = (x - 1 >= 0 && y + 1 < grid[0].length) ? grid[x - 1][y + 1] : "";;
        const word1 = charBottomLeft + charCenter + charTopRight
        const word2 = charTopLeft + charCenter + charBottomRight
        diagonalWords.push([word1,word2])
    })
    return diagonalWords;
}
const countMASCross = (diagonalWords) => {
    const filteredWords = diagonalWords.filter(([word1, word2]) => (word1 === "SAM" || word1 === "MAS") && (word2 === "SAM" || word2 === "MAS"))
    const MASCrosses = filteredWords.length
    return MASCrosses;
}
const searchXMAS = (data) => {
    const grid = parseGrid(data);
    const coordinates = findA(grid);
    const diagonalWords = findDiagonalWords(grid, coordinates);
    const MASCrosses = countMASCross(diagonalWords);
    return MASCrosses;
}
module.exports = {parseGrid, findA, findDiagonalWords, countMASCross, searchXMAS}