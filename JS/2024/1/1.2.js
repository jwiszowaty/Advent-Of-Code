const parseTable = (data) => {
    const rows = data.split("\n");
    const parseRow = rows.map(row => row.split(/\s+/).map(number => +number));
    const columns = [[], []]
    parseRow.forEach(([x, y]) => {
        columns[0].push(x)
        columns[1].push(y)
    });
    return columns;
}
const filterUnique = (array) => {
    const newSet = new Set(array)
    return newSet;
}
const createOccurenceReport = (data, numbers) => {
    const occurenceReport = {}
    for (let i = 0; i < data.length; i++) {
        if (numbers.has(data[i])) {
            Object.keys(occurenceReport).includes(String(data[i])) ? occurenceReport[data[i]]++ : occurenceReport[data[i]] = 1;
        }
    }
    return occurenceReport;
}
const calculateSimilarityScore = (data, report) => {
    let sum = 0;
    data.forEach(number => {
        if (Object.keys(report).includes(String(number))) sum += number * report[number];
    })
    return sum;
}
const findSimilarityScore = (data) => {
    const tableGrid = parseTable(data);
    const uniqueNumbers = filterUnique(tableGrid[0]);
    const occurenceReport = createOccurenceReport(tableGrid[1], uniqueNumbers);
    const similarityScore = calculateSimilarityScore(tableGrid[0], occurenceReport)
    return similarityScore;
}
module.exports = { parseTable, filterUnique, createOccurenceReport, calculateSimilarityScore, findSimilarityScore}