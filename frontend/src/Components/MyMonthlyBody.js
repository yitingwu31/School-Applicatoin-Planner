import { useEffect, useState } from 'react';
import { MonthlyBody, MonthlyDay } from '@zach.codes/react-calendar';
import { CALENDARMONTH_QUERY } from '../graphql';
import MonthlyEventItem from './MonthlyEventItem';

import { setCalendarTime } from '../utils';
import { useQuery } from '@apollo/react-hooks';

const MyMonthlyBody = ({ user, year, month }) => {
    const [events, setEvents] = useState([]);
    const { loading, error, data } = useQuery(CALENDARMONTH_QUERY, {
        variables: {
            user: user,
            year: year,
            month: month
        },
        fetchPolicy: "network-only"
    });

    useEffect(() => {
        if (loading) console.log("Loading...");
        if (error) console.log("Error: ", error);
        if (!loading && !error) {
            console.log("calendar query done!");
            const tasklist = data.allByDate;
            let newEvents = [];
            for (let i = 0; i < tasklist.length; i++) {
                newEvents.push({ title: tasklist[i].context, date: setCalendarTime(tasklist[i].deadline), completed: tasklist[i].completed });
            }
            // tasklist.map((row) => {
            //     newEvents.push({ title: row.context, date: setCalendarTime(row.deadline), completed: row.completed })
            // })
            setEvents(newEvents);
        }
    }, [data])
    

    return (
        <MonthlyBody events={events}>
            <MonthlyDay
                renderDay={data =>
                data.map((item, index) => {
                    return (
                    <MonthlyEventItem 
                        key={index}
                        title={item.title}
                        cp={item.completed}
                    />
                )
            })
          }
        />
        </MonthlyBody>
    )
};

export default MyMonthlyBody;