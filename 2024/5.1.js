//Identify the correct updates
//// extract data
const extract = (data) => {
    const arrayText = data.split(/\n\n/)
    const rulesText = arrayText[0]
    const rulesArrayOfText = rulesText.split(/\n/)
    const rulesArrayOfArrays = rulesArrayOfText.map(ruleText => ruleText.split("|").map(numberText => Number(numberText)))
    const updatesText = arrayText[1]
    const updatesArrayOfText = updatesText.split(/\n/)
    const updatesArrayOfArrays = updatesArrayOfText.map(updateText => updateText.split(",").map(numberText => Number(numberText)))
    return [rulesArrayOfArrays, updatesArrayOfArrays];
}
//// create an array for rules
//// make each update an array
//// check run rules against the update array using finding index of the numbers with rules array.indexOf(x)<array.indexOf(y)
//// if a number doesn't appear in the update return true
//// update is correctly ordered if all tests return true
//// get its middle page number
//Sum middle pages from correct updates
module.exports = {extract}