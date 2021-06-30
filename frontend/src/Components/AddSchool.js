import React, { useState, useEffect, useRef } from 'react';
import AddTodoLists from './AddTodoLists'
import {
    Button, IconButton, Typography, TextField, Grid, Dialog,
} from '@material-ui/core';
import DatePicker from './DatePicker'
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { setCalendarTime, convertTimeString } from '../utils'

import SchoolIcon from '@material-ui/icons/School';
import CloseIcon from '@material-ui/icons/Close';



const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },

    cardHeader: {
        padding: theme.spacing(1, 2),
    },
    list: {
        width: 200,
        height: 230,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function CustomizedDialogs({ open, handleClose, setAddSchool }) {
    const classes = useStyles();
    const School_todos = [
        "Program Research", "Register", "Application Form",
        "Letter", "SOP(Statement of Purpose)", "PS(Personal Statement)",
        "GRE/Toefl", "CV/Resume", "Transcripts"
    ]
    const defaultDeadline = new Date()
    let School = {
        name: "",
        todos: []
    }
    const Todo = {
        task: "",
        deadline: defaultDeadline,
        comment: "",
        checkpoints: [],
    };

    const initSchool = (School_todos, Todo, School) => {
        let SCHOOL = { ...School }
        //https://kanboo.github.io/2018/01/27/JS-ShallowCopy-DeepCopy/
        for (let i = 0; i < School_todos.length; i++) {
            let TODO = { ...Todo }
            TODO.task = School_todos[i]
            SCHOOL.todos[i] = TODO
        }
        return SCHOOL
    }

    const _School = initSchool(School_todos, Todo, School)
    const [checked, setChecked] = useState([]);
    const [school, setSchool] = useState(_School)

    const schoolNameRef = useRef();

    const findTodoIndex = (todo) => {
        const Todotask = todo.task
        const ans = school.todos.findIndex((TODO) => {
            return TODO.task === Todotask
        })
        return ans
    }
    const findCheckpointIndex = (todo, content) => {
        //console.log("in find checkpointindex")
        const TODOindex = findTodoIndex(todo)
        const TODO = school.todos[TODOindex]
        //console.log(TODO)
        //console.log(content)
        return TODO.checkpoints.findIndex((item) => item.content === content)
    }
    const handleSetTodo = (todo) => {
        let SCHOOL = { ...school }
        //find and replace
        const index = findTodoIndex(todo)
        SCHOOL.todos[index] = todo
        //console.log("handleSetTodo: ", index, SCHOOL)
        setSchool(SCHOOL)
    }

    const handleAddSchool = () => {
        let AddSchool = { ...school }
        const SCHOOLTODOS = [...school.todos]
        let AddSchoolTODOS = []
        for (let i = 0; i < SCHOOLTODOS.length; i++) {
            if (checked.includes(SCHOOLTODOS[i].task)) {
                AddSchoolTODOS.push(SCHOOLTODOS[i])
            }
        }
        AddSchool.name = schoolNameRef.current.value
        AddSchool.todos = AddSchoolTODOS
        console.log("AddSchool: ", AddSchool)
        setAddSchool(AddSchool);
        handleClose();
    }

    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title"
                open={open} fullWidth={true} maxWidth={'md'}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add School
                </DialogTitle>
                <DialogContent dividers>
                    <div className={classes.margin}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item xs={1}>
                                <SchoolIcon />
                            </Grid>
                            <Grid item>
                                <TextField id="input-with-icon-grid"
                                    label="School Name" inputRef={schoolNameRef}
                                />
                            </Grid>
                            <Grid item >
                                <DatePicker 
                                todo={Todo} 
                                school={school}
                                handleSetTodo={handleSetTodo} 
                                setSchool={setSchool}
                                defaultDeadline={defaultDeadline}
                                type={"school"} num="NAN" 
                                pickerlable={`deadline #`} />
                            </Grid>

                        </Grid>
                    </div>

                    <Grid item>
                        <AddTodoLists
                            todos={school.todos}
                            school={school}
                            setSchool={setSchool}
                            checked={checked}
                            setChecked={setChecked}
                            classes={classes}
                            findTodoIndex={findTodoIndex}
                            findCheckpointIndex={findCheckpointIndex}
                            defaultDeadline={defaultDeadline}
                            handleSetTodo={handleSetTodo}
                        />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => {
                        handleClose()
                        handleAddSchool()
                    }} color="primary" >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
