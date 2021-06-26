import MyMonth from './MyMonth';
import '@zach.codes/react-calendar/dist/calendar-tailwind.css';

const Calendar = () => {
    return (
        <div className="Calendar">
            {/* <h1>Calendar View Page</h1> */}
            <MyMonth />
        </div>
        
    )
}

export default Calendar