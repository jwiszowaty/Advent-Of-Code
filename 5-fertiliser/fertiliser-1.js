const findBiggestSeedNumber = (dataInput) => {
    const seedsStr = dataInput
        .match(/(?<=seeds: ).*/)[0]
        .split(" ")
        .sort((a, b) => b - a)
        .map((str) => +str)
    return seedsStr[0]
}
const findSeedToSoil = (dataInput) => {
    const seedToSoil = JSON.stringify(dataInput)
        .match(/(?<=seed-to-soil map:\\n).*(?=\\n\\nsoil-to-fertilizer map:)/)[0]
        .split(/\\n/)
        .map(set => {
            return set.match(/\d{1,}/g)
                .map(number => +number)
        })
    console.log(seedToSoil);
    return seedToSoil
}

module.exports = { findBiggestSeedNumber, findSeedToSoil }