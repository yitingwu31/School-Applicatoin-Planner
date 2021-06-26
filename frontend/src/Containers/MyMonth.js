import { format, subHours, startOfMonth } from 'date-fns';
import { useState } from 'react';
import {
  MonthlyBody,
  MonthlyDay,
  MonthlyCalendar,
  MonthlyNav,
  DefaultMonthlyEventItem,
} from '@zach.codes/react-calendar';

import { setTime } from '../utils';

const MyMonth = () => {

    let [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
    const onMonthChange = (date) => {
        setCurrentMonth(date);
        console.log("Month change date ", date);
    }

  return (
    <MonthlyCalendar
      currentMonth={currentMonth}
      onCurrentMonthChange={date => onMonthChange(date)}
    >
      <MonthlyNav />
      <MonthlyBody
        events={[
          { title: 'Call John', date: subHours(new Date(), 1) },
          { title: 'Walk Dog', date: new Date() },
          { title: 'Web Meeting ^^', date: setTime({ year: 2021, month: 6, date: 27, hour: 11, minute: 0}) }
        ]}
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
            )})
          }
        />
      </MonthlyBody>
    </MonthlyCalendar>
  );
};

export default MyMonth;