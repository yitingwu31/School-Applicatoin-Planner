export const makeSchoolKey = (user, school) => {
    return `${user}-${school}`;
}

export const makeCheckpointKey = (owner, school, task) => {
    return `${owner}-${school}-${task}`;
}

export const checkDeadline = (year, month, deadline) => {
    let deaddate = deadline.split('-');
    return parseInt(deaddate[0]) == year && parseInt(deaddate[1]) == month;
}

// for week: dates is an array of string
export const checkDeadlineWeek = (dates, deadline) => {
    const deaddate = deadline.split('-');
    for (let i = 0; i < dates.length; i++) {
        const date = dates[i].split('-');
        if (parseInt(date[0]) == parseInt(deaddate[0]) && parseInt(date[1]) == parseInt(deaddate[1]) && parseInt(date[2]) == parseInt(deaddate[2])) {
            return true;
        }
    }
    return false;
}

export const missingDisplay = (longstring) => {
    if (longstring === "Program Research") return "Program Search"
    if (longstring === "Application Form") return "App";
    if (longstring === "SOP(Statement of Purpose)") return "SOP";
    if (longstring === "PS(Personal Statement)") return "PS";
    if (longstring === "CV/Resume") return "CV";
    else return longstring;
}