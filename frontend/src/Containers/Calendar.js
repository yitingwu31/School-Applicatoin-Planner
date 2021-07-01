import MyMonth from './MyMonth';
import '@zach.codes/react-calendar/dist/calendar-tailwind.css';

const Calendar = () => {
    return (
        <div className="Calendar">
            <MyMonth />
        </div>
        
    )
}

export default Calendar