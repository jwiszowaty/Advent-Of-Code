const filterRelevant = (mixedInstructions) => {
    console.log(mixedInstructions.split(/don't\(\).*?do\(\)/gm));
    
    return (mixedInstructions.split(/don't\(\).*?do\(\)/g)).join("")
}

module.exports = {filterRelevant}