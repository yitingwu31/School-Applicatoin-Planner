import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DatePicker({ todo, handleSetTodo, type, num, pickerlable }) {
    // The first commit of Material-UI
    const ID = pickerlable.toLowerCase().split(' ').join('-')
    let Lable = pickerlable.split(" ")
    let rm = Lable.splice(-1, 1)
    Lable = Lable.join(" ")

    let TODO = { ...todo }
    
    let dldate = ""
    if (type === "todo") { dldate = TODO.deadline }
    if (type === "checkpoint") { dldate = TODO.checkpoints[num].deadline }


    //const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedDate, setSelectedDate] = React.useState(dldate);
    const handleDateChange = (date) => {
        setSelectedDate(date);

        if (type === "todo") {
            handleTodoDeadline(date)
        }
        if (type === "checkpoint") {
            handleCheckpointDeadline(date)
        }
    };

    const handleTodoDeadline = (date) => {
        TODO.deadline = date
        handleSetTodo(TODO)//it works
    }

    const handleCheckpointDeadline = (date) => {
        //console.log("datepicker TODO:",TODO)
        let CHECKPOINTS = [...TODO.checkpoints]
        let CHECKPOINT = { ...TODO.checkpoints[num] }
        CHECKPOINT.deadline = date //ok
        const newCP = { ...CHECKPOINT }
        let newCHPS = []//ok
        for (let i = 0; i < CHECKPOINTS.length; i++) {
            let c = {}
            if (i === num) {
                c = newCP
            } else {
                c = { ...CHECKPOINTS[i] }
            }

            newCHPS.push(c)
        }

        //CHECKPOINTS = [{ ...CHECKPOINTS[num] }] //without this line the answer is correct
        //TODO.checkpoints = [...CHECKPOINTS] //not ok
        // const newName = TODO.newName
        const newName = TODO.name
        const newDeadline = TODO.deadline
        const newComment = TODO.comment
        const newTODO = {
            name: newName,
            deadline: newDeadline,
            comment: newComment,
            checkpoints: newCHPS,
        }
        // console.log(newName)
        //CHECKPOINTS[num] is correct, CHECKPOINTS&TODO is wrong
        //console.log("1", newTODO.checkpoints[num].deadline)//sometimes correct
        // console.log("2", CHECKPOINT)//correct
        // console.log("3", newCHPS)//correct
        // console.log("4", newTODO)//correct
        handleSetTodo(newTODO)
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
                    }}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
