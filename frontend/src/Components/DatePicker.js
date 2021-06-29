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

    let TODO = { ...todo }
    let dldate = ""
    if (type === "todo") { dldate = TODO.deadline }
    if (type === "checkpoint") { dldate = TODO.checkpoints[num].deadline }


    //const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedDate, setSelectedDate] = React.useState(dldate);
    const handleDateChange = (date) => {
        setSelectedDate(date);

        if (type === "todo") {
            // TODO.deadline = date
            // handleSetTodo(TODO)
            handleTodoDeadline(date)
        }
        if (type === "checkpoint") {

            handleCheckpointDeadline(date)


            // handleSetTodo(TODO)
        }


    };

    const handleTodoDeadline = (date) => {
        TODO.deadline = date
        handleSetTodo(TODO)
    }

    const handleCheckpointDeadline = (date) => {
        let CHECKPOINTS = [...TODO.checkpoints]
        let CHECKPOINT = { ...TODO.checkpoints[num] }
        CHECKPOINT.deadline = date
        CHECKPOINTS[num] = CHECKPOINT
        let newCHPs = []
        for (let i = 0; i < CHECKPOINTS.length; i++) {
            let c = { ...CHECKPOINTS[i] }
            newCHPs.push(c)
        }
        CHECKPOINTS = [...newCHPs]
        TODO.checkpoints = [...CHECKPOINTS]
        let newTODO = {
            name: TODO.name,
            deadline: TODO.deadline,
            comment: TODO.comment,
            checkpoints: [...TODO.checkpoints]
        }

        const newarr = [{ ...CHECKPOINT }]

        console.log("0", newarr, newCHPs)
        //CHECKPOINTS[num] is correct, CHECKPOINTS&TODO is wrong
        console.log("1", TODO.checkpoints[num].deadline)//correct
        console.log("2", CHECKPOINTS[num], CHECKPOINT)//correct
        console.log("3", TODO.checkpoints, CHECKPOINTS, newCHPs)//wrong
        console.log("4", newTODO)//wrong
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
                        //if (type === "todo") {
                        //    handleTodoDeadline(TODO)
                        //}
                        //if (type === "checkpoint") {
                        //handleCheckpointDeadline(TODO)
                        //}
                    }}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
