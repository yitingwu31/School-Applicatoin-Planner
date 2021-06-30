import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DatePicker({
    todo, school, handleSetTodo, setSchool,
    type, num, pickerlable, defaultDeadline }) {

    const ID = pickerlable.toLowerCase().split(' ').join('-')
    let Lable = pickerlable.split(" ")
    let rm = Lable.splice(-1, 1)
    Lable = Lable.join(" ")

    let TODO = { ...todo }
    let SCHOOL = { ...school }
    let dldate = ""
    if (type === "school") { dldate = defaultDeadline }
    if (type === "todo") { dldate = TODO.deadline }
    if (type === "checkpoint") { dldate = TODO.checkpoints[num].time }


    //const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedDate, setSelectedDate] = React.useState(dldate);
    const handleSchoolDeadline = (date) => {
        console.log('in handleSchoolDeadline')
        SCHOOL.deadline = date
        setSchool(SCHOOL)
    }

    const handleTodoDeadline = (date) => {
        TODO.deadline = date
        handleSetTodo(TODO)
    }

    const handleCheckpointDeadline = (date) => {
        console.log("in datepicker.handleCheckpointDeadline")
        console.log("num", num)
        let CHECKPOINTS = [...TODO.checkpoints]
        let CHECKPOINT = { ...TODO.checkpoints[num] }
        CHECKPOINT.time = date
        const newCP = { ...CHECKPOINT }
        let newCHPS = []
        for (let i = 0; i < CHECKPOINTS.length; i++) {
            let c = {}
            if (i === num) {
                c = newCP
            } else {
                c = { ...CHECKPOINTS[i] }
            }

            newCHPS.push(c)
        }

        const newTask = TODO.task
        const newDeadline = TODO.deadline
        const newComment = TODO.comment
        const newTODO = {
            task: newTask,
            deadline: newDeadline,
            comment: newComment,
            checkpoints: newCHPS,
        }
        // console.log("newCHPS",newCHPS)
        // console.log("newTODO",newTODO)
        // console.log('call handle set todo in datepicker.handleCheckpointDeadline.')
        handleSetTodo(newTODO)
        // console.log('end handle set todo in datepicker.handleCheckpointDeadline.')
        // console.log("s", school)
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (type === "school") handleSchoolDeadline(date)
        if (type === "todo") handleTodoDeadline(date)
        if (type === "checkpoint") handleCheckpointDeadline(date)
    };

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
