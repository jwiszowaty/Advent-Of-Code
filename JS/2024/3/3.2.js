const mul = (x, y) => {
    return x * y;
}
const extractAllInstructions = (unfilteredInstructions) => {
    return [...unfilteredInstructions.matchAll(/mul\(\d{1,3}\,\d{1,3}\)|don\'t\(\)|do\(\)/g)]
}
const evaluateInstructions = (unfilteredInstructions) => {
    let shouldEvaluate = true;
    const filteredInstructions = [];

    const instructions = extractAllInstructions(unfilteredInstructions).map(array => array[0])
    instructions.forEach(func => {
        if (shouldEvaluate && /mul\(\d{1,3}\,\d{1,3}\)/.test(func)) {
            filteredInstructions.push(func);
        } else if (func === "don\'t()") {
            shouldEvaluate = false;
        } else if (func === "do()") {
            shouldEvaluate = true;
        } else if (!shouldEvaluate) {
            //do nothing
        } else {
            throw `error: ${func}`
        }
    })
    
    const multiplicationResults = filteredInstructions.map(instruction => eval(instruction))
    const sumOfMul = multiplicationResults.reduce((acc, curr) => acc + curr);
    return sumOfMul;
}
module.exports = {extractAllInstructions, evaluateInstructions}