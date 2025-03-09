const checkSafety = (data) => {
    const reports = []
    for (let index = 0; index < data.length; index++) {
        let status = "safe";
        let levels = data[index]
        
        let trend = levels[0] < levels[1] ? "increasing" : "decreasing"
        for (let index2 = 0; index2 < levels.length - 1; index2++) {
            const difference = levels[index2] - levels[index2 + 1];
            const followsTrend = trend === "increasing" ? (difference <= -1 && difference >= -3) : (difference >= 1 && difference <= 3);
            if (!followsTrend) {
                console.log(levels);
                
                status = "unsafe";
                break;
            }
        };

        // if (levels[0] < levels[1]) {
        //     for (let index2 = 0; index2 < levels.length - 1; index2++) {
        //         const difference = levels[index2] - levels[index2 + 1];
        //         const followsTrend = difference <= -1 || difference >= -3;
        //         if (!followsTrend) {
        //             status = "unsafe";
        //             break;
        //         }
        //     };
        // } else if (levels[0] > levels[1]) {
        //     for (let index2 = 0; index2 < levels.length - 1; index2++) {
        //         const difference = levels[index2] - levels[index2 + 1]
        //         if (difference < 1 || difference > 3) {
        //             status = "unsafe"
        //             break;
        //         }
        //     };
        // } else {
        //     status = "unsafe"
        // }
        reports.push(status)
    };
    return reports;
}

const countSafeReports = (data) => {
    const reports = checkSafety(data)
    let countSafe = reports.filter(report => report == "safe").length;

    return countSafe;
}

module.exports = {checkSafety, countSafeReports}