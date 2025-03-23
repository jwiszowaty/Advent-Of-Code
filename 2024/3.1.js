const mul = (x, y) => {
    return x * y;
}
const extractInstructions = (unfilteredInstructions) => {
    return [...unfilteredInstructions.matchAll(/mul\(\d{1,3}\,\d{1,3}\)/g)]
}
const sumMul = (unfilteredInstructions) => {
    const instructions = extractInstructions(unfilteredInstructions)
    const multiplicationResults = instructions.map(instruction => eval(instruction[0]))
    const sumOfMul = multiplicationResults.reduce((acc, curr) => acc + curr);
    return sumOfMul;
}
module.exports = {sumMul}