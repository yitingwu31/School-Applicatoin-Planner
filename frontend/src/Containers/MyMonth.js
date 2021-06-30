import { format, subHours, startOfMonth, getMonth, getYear } from 'date-fns';
import { useEffect, useState } from 'react';
import {
  MonthlyBody,
  MonthlyDay,
  MonthlyCalendar,
  MonthlyNav,
  DefaultMonthlyEventItem,
} from '@zach.codes/react-calendar';

import { setCalendarTime } from '../utils';
import MyMonthlyBody from '../Components/MyMonthlyBody';

const es6 = [
  { title: 'Walk Dog', date: setCalendarTime("2021-6-26-11-0") },
  { title: 'Web Meeting ^^', date: setCalendarTime("2021-6-27-11-0") }
]

const es7 = [
  { title: 'Doggy ^^', date: setCalendarTime("2021-7-27-11-0") }
]

const MyMonth = () => {

  let [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const onMonthChange = (date) => {
    setCurrentMonth(date);
    console.log("Month change date ", date);
  }
  const [year, setYear] = useState(getYear(currentMonth));
  const [month, setMonth] = useState(getMonth(currentMonth) + 1);

  const [events, setEvents] = useState(es6);

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
      {/* <MonthlyBody
        // events={[
        //   { title: 'Call John', date: subHours(new Date(), 1) },
        //   { title: 'Walk Dog', date: new Date() }
        // ]}
        events = {events}
      >
        <MonthlyDay
          renderDay={data =>
            data.map((item, index) => {
              console.log(item.title, item.date);
              return (
                <DefaultMonthlyEventItem
                  key={index}
                  title={item.title}
                  // Format the date here to be in the format you prefer
                  date={format(item.date, 'k:mm')}
                />
              )
            })
          }
        />
      </MonthlyBody> */}
      <MyMonthlyBody year={year} month={month}/>
    </MonthlyCalendar>
  );
};

export default MyMonth;