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