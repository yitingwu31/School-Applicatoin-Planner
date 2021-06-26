export const setTime = ({ year, month, date, hour, minute }) => {
    const d = new Date();
    d.setFullYear(year);
    d.setMonth(month - 1);
    d.setDate(date);
    d.setHours(hour);
    d.setMinutes(minute);
    return d;
}