const fs = require("fs")
const findSeedToSoil = (dataInput) => {
    const seedToSoil = JSON.stringify(dataInput)
        .match(/(?<=\\nseed\D*\\n).*(?=\\n\\nsoil)/)[0]
        .split(/\\n/)
        .map(set => {
            return set.match(/\d{1,}/g)
                .map(number => +number)
        })
        .sort(([a, b, c], [d, e, f]) => b - e)
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

const matchSoil = (number, seedToSoil) => {
    const soil = [];
    seedToSoil.forEach(([destination, source, range]) => {
        if (number >= source && number < source + range) {
            const change = destination - source
            replacement = number + change
        }
    })
    soil.push(replacement)
    console.log("matched soil for seeds", soil);
    return soil
}
const matchFert = (soil, soilToFertilizer) => {
    const fert = []
    soil.forEach((number) => {
        let replacement = number;
        soilToFertilizer.forEach(([destination, source, range]) => {
            if (number >= source && number < source + range) {
                const change = destination - source
                replacement = number + change
            }
        })
        fert.push(replacement)
    })
    console.log("matched fertilizer to soil", fert);
    return fert
}
const matchWater = (fertilizer, fertilizerToWater) => {
    const water = []
    fertilizer.forEach((number) => {
        let replacement = number;
        fertilizerToWater.forEach(([destination, source, range]) => {
            if (number >= source && number < source + range) {
                const change = destination - source
                replacement = number + change
            }
        })
        water.push(replacement)
    })
    console.log("matched water to fertilizer", water);
    return water
}
const matchLight = (water, waterToLight) => { 
    const light = []
    water.forEach((number) => {
        let replacement = number;
        waterToLight.forEach(([destination, source, range]) => {
            if (number >= source && number < source + range) {
                const change = destination - source
                replacement = number + change
            }
        })
        light.push(replacement)
    })
    console.log("matched light to water", light);
    return light 
}
const matchTemp = (light, lightToTemp) => {
    const temp = []
    light.forEach((number) => {
        let replacement = number;
        lightToTemp.forEach(([destination, source, range]) => {
            if (number >= source && number < source + range) {
                const change = destination - source
                replacement = number + change
            }
        })
        temp.push(replacement)
    })
    console.log("matched temperature to light", temp);
    return temp
}
const matchHum = (temp, tempToHum) => {
    const hum = []
    temp.forEach((number) => {
        let replacement = number;
        tempToHum.forEach(([destination, source, range]) => {
            if (number >= source && number < source + range) {
                const change = destination - source
                replacement = number + change
            }
        })
        hum.push(replacement)
    })
    console.log("matched humidity to temperature", hum);
    return hum
}
const showClosestLoc = (hum, humToLoc) => {
    const loc = []
    hum.forEach((number) => {
        let replacement = number;
        humToLoc.forEach(([destination, source, range]) => {
            if (number >= source && number < source + range) {
                const change = destination - source
                replacement = number + change
            }
        })
        loc.push(replacement)
    })
    console.log("matched location to humidity", loc);
    return loc.sort((a,b)=>a-b)[0]
}
const extractNumbersFromRange = (dataInput) => {
    let seedsNumbers = 0
    JSON.stringify(dataInput)
    .match(/(?<=seeds: ).*(?=\\n\\nseed)/)[0]
    .split(/(?<=\d+ \d+) (?=\d+ \d+)/g)
    .forEach(set => {
        const splitSet = set.split(" ").map(canBeNum => +canBeNum)
        let count = splitSet[0]
        for (let index = splitSet[0]; index < splitSet[0] + splitSet[1]; index++) {
            const seedToSoil = findSeedToSoil(dataInput)
            const soil = matchSoil(count, seedToSoil)

            const soilToFertilizer= findSoilToFertilizer(dataInput)
            const fert = matchFert(soil, soilToFertilizer)

            const fertilizerToWater = findFertilizerToWater(dataInput)
            const water = matchWater(fert, fertilizerToWater)

            const waterToLight = findWaterToLight(dataInput)
            const light = matchLight(water, waterToLight)

            const lightToTemp = findLightToTemp(dataInput)
            const temp = matchTemp(light, lightToTemp)

            const tempToHum = findTempToHum(dataInput)
            const hum = matchHum(temp, tempToHum)

            const humToLoc = findHumToLoc(dataInput)
            const closestLocation = showClosestLoc(hum, humToLoc)
            if (seedsNumbers === 0 || seedsNumbers > closestLocation) seedsNumbers = closestLocation
            count++
        }
        seedsNumbers
    })
    console.log("obtained seeds of interest...");
    return seedsNumbers
}

const dataInput = fs.readFileSync("./5-fertiliser/dataInput.txt", "utf8")

const seedsNumbers = extractNumbersFromRange(dataInput)

console.log(seedsNumbers);
module.exports = { extractNumbersFromRange }