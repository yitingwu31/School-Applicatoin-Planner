export const setCalendarTime = ( datestring ) => {
    const date = datestring.split('-')
    const d = new Date();
    d.setFullYear(date[0]);
    d.setMonth(date[1] - 1);
    d.setDate(date[2]);
    d.setHours(date[3]);
    d.setMinutes(date[4]);
    return d;
};

export const convertTimeString = ({ year, month, date, hour, minute }) => {
    const yyyy = toString(year);
    const mm = month < 10 ? `0${toString(month)}` : toString(month);
    const dd = date < 10 ? `0${toString(date)}` : toString(date);
    const hh = hour < 10 ? `0${toString(hour)}` : toString(hour);
    const min = minute < 10 ? `0${toString(minute)}` : toString(minute);
    
    return `${yyyy}-${mm}-${dd}-${hh}-${min}`;
};

export const compareTime = (a, b) => {
    const date1 = a.split('-');
    const date2 = b.split('-');
    if (
        (date1[0] > date2[0]) ||
        (date1[0] === date2[0] && date1[1] > date2[1]) ||
        (date1[0] === date2[0] && date1[1] === date2[1] && date1[2] > date2[2])
    ) {
        return 1;
    }
    return -1;
};