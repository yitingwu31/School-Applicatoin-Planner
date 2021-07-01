import { format, subMonths, addMonths, getYear } from 'date-fns';
import { useMonthlyCalendar } from '@zach.codes/react-calendar';

const style = ({
  alignSelf: 'center',
  marginTop: '30px',
  marginBottom: '30px'
});

const MyMonthNav = () => {
    let { locale, currentMonth, onCurrentMonthChange } = useMonthlyCalendar();
  
    return (
      <div className="flex justify-end mb-4" style={style}>
        <button
          onClick={() => onCurrentMonthChange(subMonths(currentMonth, 1))}
          className="cursor-pointer"
          style={{fontSize: '16px'}}
        >
          Previous
        </button>
        <div className="ml-4 mr-4 w-32 text-center" style={{fontSize: '20px'}} aria-label="Current Month">
          {format(
            currentMonth,
            getYear(currentMonth) === getYear(new Date()) ? 'LLLL' : 'LLLL yyyy',
            { locale }
          )}
        </div>
        <button
          onClick={() => onCurrentMonthChange(addMonths(currentMonth, 1))}
          className="cursor-pointer"
          style={{fontSize: '16px'}}
        >
          Next
        </button>
      </div>
    );
};

export default MyMonthNav;
