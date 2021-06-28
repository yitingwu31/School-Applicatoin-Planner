import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers({ todo, handleSetTodo, type, num, pickerlable }) {
    // The first commit of Material-UI
    const ID = pickerlable.toLowerCase().split(' ').join('-')
    let Lable = pickerlable.split(" ")
    let rm = Lable.splice(-1, 1)
    Lable = Lable.join(" ")

    //console.log("ID: ",ID,"lable: ",Lable)
    const [selectedDate, setSelectedDate] = React.useState(new Date('2021-12-25'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    let TODO = { ...todo }

    const handleTodoDeadline = (TODO) => {
        TODO.deadline = selectedDate
        handleSetTodo(TODO)
    }
    const handleCheckpointDeadline = (TODO) => {
        TODO.checkpoints[num].deadline = selectedDate
        handleSetTodo(TODO)
    }



    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    margin="normal"
                    id={ID}
                    label={Lable}
                    format="yyyy/MM/dd"
                    value={selectedDate}
                    onChange={(date) => {
                        handleDateChange(date)
                        if (type === "todo") { handleTodoDeadline(TODO) }
                        if (type === "checkpoint") { handleCheckpointDeadline(TODO) }
                    }}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
