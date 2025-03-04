const checkSafety = (data) => {
    const reports = []
    for (let index = 0; index < data.length; index++) {
        let status = "safe";
        let levels = data[index]
        if (levels[0] < levels[1]) {
            for (let index2 = 0; index2 < levels.length - 1; index2++) {
                const difference = levels[index2] - levels[index2 + 1];
                if (difference > -1 || difference < -3) {
                    status = "unsafe"
                    break;
                }
            };
        } else if (levels[0] > levels[1]) {
            for (let index2 = 0; index2 < levels.length - 1; index2++) {
                const difference = levels[index2] - levels[index2 + 1]
                if (difference < 1 || difference > 3) {
                    status = "unsafe"
                    break;
                }
            };
        } else {
            status = "unsafe"
        }
        reports.push(status)
    };
    console.log(reports.length);
    return reports;
}

const countSafeReports = (data) => {
    const dataLength = data.length;
    const reports = checkSafety(data)
    let countSafe = reports.filter(report => report == "safe").length;
    let countUnsafe = reports.filter(report => report == "safe").length;
    console.log(dataLength-countUnsafe);

    return countSafe;
}

module.exports = {checkSafety, countSafeReports}