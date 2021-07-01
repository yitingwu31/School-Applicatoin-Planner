import MyMonth from './MyMonth';
import '@zach.codes/react-calendar/dist/calendar-tailwind.css';

const Calendar = ({ user }) => {
    return (
        <div className="Calendar">
            <MyMonth user={user}/>
        </div>
        
    )
}

export default Calendar