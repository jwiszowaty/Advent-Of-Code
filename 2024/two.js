const findTrend = (levels, reports=[]) => {
    levels.forEach((report, index) => {
        if (report[0] < report[1]) {
            reports.push({ trend: "increase", status:"safe"});
        };
        if (report[0] > report[1]) {
            reports.push({ trend: "decrease", status: "safe"})
        }
    })
    return reports;
}

const checkSafety = (levels) => {
    let reports = findTrend(levels)
    levels.forEach((report, index) => {
        if (report[0] < report[1]) {
            for (let index2 = 0; index2 < report.length - 1; index2++) {
                const difference = report[index2] - report[index2 + 1];
                if (difference <= -1 && difference >= -4) {
                    continue;
                } else {
                    reports[index].status = "unsafe";
                    break;
                }
            };
        };
        if (report[0] > report[1]) {
            for (let index2 = 0; index2 < report.length - 1; index2++) {
                const difference = report[index2] - report[index2 + 1]
                if (difference >= 1 && difference <= 4) {
                    continue;
                } else {
                    reports[index].status = "unsafe";
                    break;
                }
            }
        }
    });
    return reports;
}

const countSafeReports = (levels) => {
    let reports = checkSafety(levels)
    let countSafe = 0;
    let countUnsafe = 0;
    reports.forEach(({ status: value, trend: value2 }, index) => {
        if (value == "safe") {
            countSafe++
        } else if (value == "unsafe") {
            countUnsafe++
        } else {
            console.log(reports[index]);
        }
    })
    return [countSafe, countUnsafe];
}

module.exports = {findTrend, checkSafety, countSafeReports}