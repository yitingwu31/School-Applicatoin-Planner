import { startOfMonth, getMonth, getYear } from 'date-fns';
import { useEffect, useState } from 'react';
import {
  MonthlyCalendar,
  MonthlyNav
} from '@zach.codes/react-calendar';

import MyMonthlyBody from '../Components/MyMonthlyBody';

let user = "emily"

const MyMonth = () => {

  let [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const onMonthChange = (date) => {
    setCurrentMonth(date);
  }
  const [year, setYear] = useState(getYear(currentMonth));
  const [month, setMonth] = useState(getMonth(currentMonth) + 1);

  useEffect(() => {
    const newyear = getYear(currentMonth);
    const newmonth = getMonth(currentMonth) + 1;
    setYear(newyear);
    setMonth(newmonth);
  }, [currentMonth]);

  return (
    <MonthlyCalendar
      currentMonth={currentMonth}
      onCurrentMonthChange={date => onMonthChange(date)}
    >
      <MonthlyNav />
      <MyMonthlyBody user={user} year={year} month={month}/>
    </MonthlyCalendar>
  );
};

export default MyMonth;