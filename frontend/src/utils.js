import moment from 'moment'
export const setCalendarTime = ( datestring ) => {
    const date = datestring.split('-')
    const d = new Date();
    d.setFullYear(date[0]);
    d.setMonth(date[1] - 1);
    d.setDate(date[2]);
    d.setHours(12);
    d.setMinutes(0);
    return d;
};

export const convertTimeString = ({ year, month, date, hour=12, minute=0 }) => {
    const yyyy = toString(year);
    const mm = month < 10 ? `0${toString(month)}` : toString(month);
    const dd = date < 10 ? `0${toString(date)}` : toString(date);
    const hh = hour < 10 ? `0${toString(hour)}` : toString(hour);
    const min = minute < 10 ? `0${toString(minute)}` : toString(minute);
    
    return `${yyyy}-${mm}-${dd}-${hh}-${min}`;
}

export const Time2String =(date)=>{
    return moment(date).format("YYYY-MM-DD")
};

export const compareTime = (a, b) => {
    const c1 = a.completed;
    const c2 = b.completed;
    const date1 = a.deadline.split('-');
    const date2 = b.deadline.split('-');
    if (c1 === true && c2 === false) return 1;
    if (c1 === false && c2 === true) return -1;
    if (
        (date1[0] > date2[0]) ||
        (date1[0] === date2[0] && date1[1] > date2[1]) ||
        (date1[0] === date2[0] && date1[1] === date2[1] && date1[2] > date2[2])
    ) {
        return 1;   // later
    }
    return -1;  // sooner
};


export const dateDisplay = (datestring) => {
    const date = datestring.split('-');
    return `${date[0]}/${date[1]}/${date[2]}`
}


export const missingDisplay = (longstring) => {
    if (longstring === "Program Research") return "Program Search"
    if (longstring === "Application Form") return "App";
    if (longstring === "SOP(Statement of Purpose)") return "SOP";
    if (longstring === "PS(Personal Statement)") return "PS";
    if (longstring === "CV/Resume") return "CV";
    else return longstring;
}