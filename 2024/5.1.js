//Identify the correct updates
//// extract data
const extract = (data) => {
    const [rulesText, updatesText] = data.split(/\n\n/)
    const rules = rulesText
        .split(/\n/)
        .map(ruleText => ruleText.split("|").map(Number))
    const updates = updatesText
        .split(/\n/)
        .map(updateText => updateText.split(",").map(Number))
    return {rules, updates};
}
//// check run rules against the update array using finding index of the numbers with rules array.indexOf(x)<array.indexOf(y)
const filterUpdates = ({ rules, updates }) => {
    
    const numbersWithRules = new Set(rules.map(([x, y]) => x))
    const isCorrect = (update) => {
        //if the number in the array has lower index then the one related to the rule
        for (let pageIndex = 0; pageIndex < update.length; pageIndex++) {
            let page = update[pageIndex]
            if (numbersWithRules.has(page)) {
                const relevantRules = rules.filter(([x, y]) => x === page && update.includes(y))
                for (const [x, y] of relevantRules) {
                    if (pageIndex > update.indexOf(y)) {
                        return false;
                    };
                }
            };
        }
        return true;
    }
    const correctUpdates = updates.filter(update => isCorrect(update) === true)
    return {correctUpdates};
}
const sumMiddlePages = (data) => {
    let sum = 0;
    for (const update of data.correctUpdates) {
        //assumed all updates have an odd number of pages
        const middlePage = Math.floor((update.length - 1) / 2)
        sum+=update[middlePage]
    }
    return sum;
}
const findSumForUpdates = (data) => {
    const refinedData = extract(data);
    const correctUpdates = filterUpdates(refinedData);
    const sum = sumMiddlePages(correctUpdates)
    return sum;
}
module.exports = {extract, filterUpdates, sumMiddlePages, findSumForUpdates}