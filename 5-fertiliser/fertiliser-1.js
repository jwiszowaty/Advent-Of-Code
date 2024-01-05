const findBiggestNumber = (dataInput) => {
    const biggestNumber = JSON.stringify(dataInput)
        .match(/(?<=n)(\d+\s*)+/g)
        .map((set) => set.split(" ").map(number => +number))
        .map(([a, b, c]) => a + c > b + c ? a + c : b + c)
        .sort((a,b) => b-a)
    console.log(biggestNumber);
    return biggestNumber[0]+1
}

const findSeedToSoil = (dataInput) => {
    const seedToSoil = JSON.stringify(dataInput)
        .match(/(?<=\\nseed\D*\\n).*(?=\\n\\nsoil)/)[0]
        .split(/\\n/)
        .map(set => {
            return set.match(/\d{1,}/g)
                .map(number => +number)
        })
        .sort(([a, b, c],[d, e, f]) => b - e)
    return seedToSoil
}
const findSoilToFertilizer = (dataInput) => {
    const soilToFertilizer = JSON.stringify(dataInput)
        .match(/(?<=\\nsoil\D*\\n).*(?=\\n\\nfertilizer)/)[0]
        .split(/\\n/)
        .map(set => {
            return set.match(/\d{1,}/g)
                .map(number => +number)
        })
        .sort(([a, b, c],[d, e, f]) => b - e)
    return soilToFertilizer
}
const findFertilizerToWater = (dataInput) => {
    const fertilizerToWater = JSON.stringify(dataInput)
        .match(/(?<=\\nfertilizer\D*\\n).*(?=\\n\\nwater)/)[0]
        .split(/\\n/)
        .map(set => {
            return set.match(/\d{1,}/g)
                .map(number => +number)
        })
        .sort(([a, b, c],[d, e, f]) => b - e)
    return fertilizerToWater
}
const findWaterToLight = (dataInput) => {
    const waterToLight = JSON.stringify(dataInput)
        .match(/(?<=\\nwater\D*\\n).*(?=\\n\\nlight)/)[0]
        .split(/\\n/)
        .map(set => {
            return set.match(/\d{1,}/g)
                .map(number => +number)
        })
        .sort(([a, b, c],[d, e, f]) => b - e)
    return waterToLight
}
const findLightToTemp = (dataInput) => {
    const lightToTemp = JSON.stringify(dataInput)
        .match(/(?<=\\nlight\D*\\n).*(?=\\n\\ntemperature)/)[0]
        .split(/\\n/)
        .map(set => {
            return set.match(/\d{1,}/g)
                .map(number => +number)
        })
        .sort(([a, b, c],[d, e, f]) => b - e)
    return lightToTemp
}
const findTempToHum = (dataInput) => {
    const tempToHum = JSON.stringify(dataInput)
    .match(/(?<=\\ntemperature\D*\\n).*(?=\\n\\nhumidity)/)[0]
    .split(/\\n/)
    .map(set => {
        return set.match(/\d{1,}/g)
            .map(number => +number)
    })
    .sort(([a, b, c],[d, e, f]) => b - e)
    return tempToHum
}
const findHumToLoc = (dataInput) => {
    const humToLoc = JSON.stringify(dataInput)
        .match(/(?<=\\nhumidity\D*\\n).*/)[0]
    .split(/\\n/)
    .map(set => {
        return set.match(/\d{1,}/g)
            .map(number => +number)
    })
    .sort(([a, b, c],[d, e, f]) => b - e)
    return humToLoc
}
const createSeeds = (biggestNumber, seedToSoil) => {
    const seeds = {};
    for (let index = 0; index <= biggestNumber; index++) {
        seeds[index] = index
    }
    seedToSoil.forEach(([soil, seed, range]) => {
       let soilcount = soil
        for (let index = seed; index < seed + range ; index++) {
            seeds[index] = soilcount
            soilcount++
       }
    });
    return seeds
}
const createSoil = (seeds, soilToFertilizer) => {
    const soilValues = Object.values(seeds).sort((a,b) => a-b)
    let soil = {};
    for (let index = 0; index <= soilValues[soilValues.length-1]; index++) {
        soil[index] = index
    }
    soilToFertilizer.forEach(([fertNumber, soilNumber, range]) => {
        let fertCount = fertNumber
        for (let index = soilNumber; index < soilNumber + range; index++) {
            soil[index] = fertCount
            fertCount++
        }
    })
    return soil
}
module.exports = { findBiggestNumber, findSeedToSoil, createSeeds, findSoilToFertilizer, createSoil, findFertilizerToWater, findWaterToLight, findLightToTemp,  findTempToHum, findHumToLoc }