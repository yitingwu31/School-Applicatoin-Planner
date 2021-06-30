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