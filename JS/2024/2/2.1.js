const checkLevels = (levels) => {
    let status = "safe";
    const identifiedTrend = levels[0] < levels[1] ? "increasing" : (
        levels[0] > levels[1] ? "decreasing" : "unsafe");
    if (identifiedTrend === "increasing") {
        for (let i = 0; i < levels.length - 1; i++) {
            const increment = levels[i] - levels[i + 1];
            if (increment <= -1 && increment >= -3) {
                continue;
            } else {
                status = "unsafe";
                break;
            }
        }
    } else if (identifiedTrend === "decreasing") {
        for (let i = 0; i < levels.length - 1; i++) {
            const increment = levels[i] - levels[i + 1];
            if (increment <= 3 && increment >= 1) {
                continue;
            } else {
                status = "unsafe";
                break;
            }
        }
    } else {
        status = identifiedTrend;
    }
    return status;
}

const countSafeReports = (data) => {
    let count = 0;
    data.forEach(levels => {
        const safetyStatus = checkLevels(levels);
        if (safetyStatus === "safe") {
            count++;
        }
    });
    return count;
}

module.exports = {countSafeReports}