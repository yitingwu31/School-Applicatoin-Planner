import { format, subMonths, addMonths, getYear } from 'date-fns';
import { useMonthlyCalendar } from '@zach.codes/react-calendar';

const MyMonthNav = () => {
    let { locale, currentMonth, onCurrentMonthChange } = useMonthlyCalendar();
  
    return (
      <div className="flex justify-end mb-4" style={{alignSelf: "center"}}>
        <button
          onClick={() => onCurrentMonthChange(subMonths(currentMonth, 1))}
          className="cursor-pointer"
        >
          Previous
        </button>
        <div className="ml-4 mr-4 w-32 text-center" aria-label="Current Month">
          {format(
            currentMonth,
            getYear(currentMonth) === getYear(new Date()) ? 'LLLL' : 'LLLL yyyy',
            { locale }
          )}
        </div>
        <button
          onClick={() => onCurrentMonthChange(addMonths(currentMonth, 1))}
          className="cursor-pointer"
        >
          Next
        </button>
      </div>
    );
};

export default MyMonthNav;