export const makeSchoolKey = (user, school) => {
    return `${user}-${school}`;
}

export const makeCheckpointKey = (owner, school, task) => {
    return `${owner}-${school}-${task}`;
}

export const checkDeadline = (year, month, deadline) => {
    let date = deadline.split('-');
    return date[0] == year && date[1] == month;
}

export const missingDisplay = (longstring) => {
    if (longstring === "Program Research") return "Program Search"
    if (longstring === "Application Form") return "App";
    if (longstring === "SOP(Statement of Purpose)") return "SOP";
    if (longstring === "PS(Personal Statement)") return "PS";
    if (longstring === "CV/Resume") return "CV";
    else return longstring;
}