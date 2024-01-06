const fs = require("fs")
const findBiggestNumber = (dataInput) => {
    const biggestNumber = JSON.stringify(dataInput)
        .match(/(?<=n)(\d+\s*)+/g)
        .map((set) => set.split(" ").map(number => +number))
        .map(([a, b, c]) => a + c > b + c ? a + c : b + c)
        .sort((a,b) => b-a)
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
        .sort(([a, b, c], [d, e, f]) => b - e)
    console.log("matched seeds to soil");
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
        console.log("matched soil to fertilizer");
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
        console.log("matched fertilizer to water");
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
        console.log("matched water to light");
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
        console.log("matched light to temperature");
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
    console.log("matched temperature to humidity");
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
    console.log("matched humidity to location");
    return humToLoc
}
const createSeeds = (seedToSoil) => {
    const seeds = {};
    seedToSoil.forEach(([soil, seed, range]) => {
       let soilcount = soil
        for (let index = seed; index < seed + range ; index++) {
            seeds[index] = soilcount
            soilcount++
        }
    });
    console.log("created data for seeds");
    return seeds
}
const createSoil = (soilToFertilizer) => {
    let soil = {};
    soilToFertilizer.forEach(([fertNumber, soilNumber, range]) => {
        let fertCount = fertNumber
        for (let index = soilNumber; index < soilNumber + range; index++) {
            soil[index] = fertCount
            fertCount++
        }
    })
    console.log("created data for soil");
    return soil
}
const createFert = (fertilizerToWater) => {
    let fert = {};
    fertilizerToWater.forEach(([waterNumber, fertNumber, range]) => {
        let waterCount = waterNumber
        for (let index = fertNumber; index < fertNumber + range; index++) {
            fert[index] = waterCount
            waterCount++
        }
    })
    console.log("created data for fertilizer");
    return fert
}
const createWater = (waterToLight) => {
    let water = {};
    waterToLight.forEach(([lightNumber, waterNumber, range]) => {
        let lightCount = lightNumber
        for (let index = waterNumber; index < waterNumber + range; index++) {
            water[index] = lightCount
            lightCount++
        }
    })
    console.log("created data for water");
    return water
}
const createLight = (lightToTemp) => { 
    let light = {};
    lightToTemp.forEach(([tempNumber, lightNumber, range]) => {
        let tempCount = tempNumber
        for (let index = lightNumber; index < lightNumber + range; index++) {
            light[index] = tempCount
            tempCount++
        }
    })
    console.log("created data for light");
    return light 
}
const createTemp = (tempToHum) => {
    let temp = {};
    tempToHum.forEach(([humNumber, tempNumber, range]) => {
        let humCount = humNumber
        for (let index = tempNumber; index < tempNumber + range; index++) {
            temp[index] = humCount
            humCount++
        }
    })
    console.log("created data for temperature");
    return temp
}
const createHum = (humToLoc) => {
    let hum = {};
    humToLoc.forEach(([locNumber, humNumber, range]) => {
        let locCount = locNumber
        for (let index = humNumber; index < humNumber + range; index++) {
            hum[index] = locCount
            locCount++
        }
    })
    console.log("created data for humidity and location");
    return hum
}
const findSeedsNumbers = (dataInput) => {
    const seedsNumbers = JSON.stringify(dataInput)
        .match(/(?<=seeds: ).*(?=\\n\\nseed)/)[0]
        .split(" ")
        .map(number => +number)
    console.log("obtained seeds of interest...");
    return seedsNumbers
}
const findlowestLocation = (seedsNumbers, data) => {
    let numbers = seedsNumbers
    let seedsLocation = []
    for (let index = 0; index < data.length; index++) {
        numbers = numbers.map((number, seedIndex) => {
            seedsLocation[seedIndex] = data[index][number] ? [seedsNumbers[seedIndex], data[index][number]] : [seedsNumbers[seedIndex], number]
            return data[index][number] ? data[index][number] : number
        })
        let progress = (((index+1)/data.length)*100).toFixed(0)
        console.log(`looking for location progress: ${progress}%`);
    }
    return seedsLocation.sort(([a,b],[c,d]) => b-d)[0][1]
}

const dataInput = fs.readFileSync("./5-fertiliser/dataInput.txt", "utf8")

const seedToSoil = findSeedToSoil(dataInput)
const soilToFertilizer= findSoilToFertilizer(dataInput)
const fertilizerToWater = findFertilizerToWater(dataInput)
const waterToLight = findWaterToLight(dataInput)
const lightToTemp = findLightToTemp(dataInput)
const tempToHum = findTempToHum(dataInput)
const humToLoc = findHumToLoc(dataInput)

const seeds = createSeeds(seedToSoil)
const soil = createSoil(soilToFertilizer)
const fert = createFert(fertilizerToWater)
const water = createWater(waterToLight)
const light = createLight(lightToTemp)
const temp = createTemp(tempToHum)
const hum = createHum(humToLoc)

const seedsNumbers = findSeedsNumbers(dataInput)
const data = [ seeds, soil, fert, water, light, temp, hum ]
const lowestLocation = findlowestLocation(seedsNumbers, data)
console.log(seeds);
console.log(lowestLocation);
module.exports = { findBiggestNumber, findSeedToSoil, findSoilToFertilizer, findFertilizerToWater, findWaterToLight, findLightToTemp,  findTempToHum, findHumToLoc, createSeeds, createSoil, createFert, createWater, createLight, createTemp, createHum, findSeedsNumbers, findlowestLocation }