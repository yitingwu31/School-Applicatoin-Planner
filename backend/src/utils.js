export const convertTimeString = ({ year, month, date, hour, minute }) => {
    const yyyy = toString(year);
    const mm = month < 10 ? `0${toString(month)}` : toString(month);
    const dd = date < 10 ? `0${toString(date)}` : toString(date);
    const hh = hour < 10 ? `0${toString(hour)}` : toString(hour);
    const min = minute < 10 ? `0${toString(minute)}` : toString(minute);
    
    return `${yyyy}-${mm}-${dd}-${hh}-${min}`;
}

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

export const setCalendarTime = ( datestring ) => {
    const date = datestring.split('-')
    const d = new Date();
    d.setFullYear(date[0]);
    d.setMonth(date[1] - 1);
    d.setDate(date[2]);
    d.setHours(date[3]);
    d.setMinutes(date[4]);
    return d;
}