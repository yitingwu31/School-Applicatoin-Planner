import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { MonthlyBody, MonthlyDay, DefaultMonthlyEventItem } from '@zach.codes/react-calendar';
import { CALENDARMONTH_QUERY } from '../graphql';

import { setCalendarTime } from '../utils';
import { useQuery } from '@apollo/react-hooks';
import { subscribe } from 'graphql';

const MyMonthlyBody = ({ user, year, month }) => {
    const [events, setEvents] = useState([]);
    const { loading, error, data, subscribeToMore } = useQuery(CALENDARMONTH_QUERY, {
        variables: {
            user: user,
            year: year,
            month: month
        }
    });

    useEffect(() => {
        if (loading) console.log("Loading...");
        if (error) console.log("Error: ", error);
        if (!loading && !error) {
            const tasklist = data.allByDate;
            let newEvents = [];
            // console.log("tasklist: ", tasklist);
            tasklist.map((row) => {
                newEvents.push({ title: row.context, date: setCalendarTime(row.deadline) })
            })
            // console.log("newevents: ", newEvents);
            setEvents(newEvents);
        }
    }, [data])
    

    return (
        <MonthlyBody events={events}>
            <MonthlyDay
                renderDay={data =>
                data.map((item, index) => {
                    // console.log(item.title, item.date);
                    return (
                    <DefaultMonthlyEventItem
                        key={index}
                        title={item.title}
                        date={format(item.date, 'k:mm')}
                    />
                )
            })
          }
        />
        </MonthlyBody>
    )
};

export default MyMonthlyBody;