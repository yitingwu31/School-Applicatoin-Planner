import React, { useState, useEffect, useRef } from 'react';
import {
    Button, IconButton, Typography, TextField, Grid,
    Dialog, Divider, Card, CardHeader,
    List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText,
    ListItemAvatar, Avatar, Checkbox
} from '@material-ui/core';
import DatePicker from './DatePicker'
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import CommentIcon from '@material-ui/icons/Comment';
import SchoolIcon from '@material-ui/icons/School';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleIcon from '@material-ui/icons/AddCircle'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



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
    let School = {
        name: "",
        todos: []
    }
    const Todo = {
        name: "",
        deadline: "yyyy-MM-dd-hh-mm",
        comment: "",
        checkpoints: [],
    };
    const Checkpoint = {
        content: "",
        deadline: "yyyy-MM-dd-hh-mm"
    }
    const initSchool = (School_todos, Todo, School) => {
        let SCHOOL = { ...School }
        //https://kanboo.github.io/2018/01/27/JS-ShallowCopy-DeepCopy/
        for (let i = 0; i < School_todos.length; i++) {
            let TODO = { ...Todo }
            TODO.name = School_todos[i]
            SCHOOL.todos[i] = TODO
        }
        return SCHOOL
    }

    School = initSchool(School_todos, Todo, School)
    //console.log("initSchool: ",School)
    const [checked, setChecked] = useState([]);
    const [school_todos, setSchoolTodos] = useState(School_todos)
    const [school, setSchool] = useState(School)
    const addTodoRef = useRef();
    const schoolNameRef = useRef();


    const handleSetTodo = (todo) => {
        let SCHOOL = { ...school }
        //find and replace
        const index = findTodoIndex(todo)
        SCHOOL.todos[index] = todo
        setSchool(SCHOOL)
    }

    const handleAddTodo = (event) => {
        let value = ""
        if (event.keyCode === 13) {
            value = addTodoRef.current.value
            const newTodos = [...school_todos]
            newTodos.push(value)
            setSchoolTodos(newTodos)
            addTodoRef.current.value = ""
        }
    }
    const handleAddComment = (todo) => (event) => {
        let SCHOOL = { ...school }
        const index = findTodoIndex(todo)
        SCHOOL.todos[index].comment = event.target.value
        setSchool(SCHOOL)
    }
    const findTodoIndex = (todo) => {
        const TodoName = todo.name
        const ans = school.todos.findIndex((TODO) => {
            return TODO.name === TodoName
        })
        return ans
    }
    const findCheckpointIndex = (todo, content) => {
        console.log("in find checkpointindex")
        const TODOindex = findTodoIndex(todo)
        const TODO = school.todos[TODOindex]
        //console.log(TODO)
        //console.log(content)
        return TODO.checkpoints.findIndex((item) => item.content === content)
    }
    const handleSetCheckpoint = (todo, content) => {
        let SCHOOL = { ...school }
        const index = findTodoIndex(todo)
        let CHECKPOINTS = { ...SCHOOL[index].checkpoints }
        const cpindex = findCheckpointIndex(todo, content)
        //setSchool(SCHOOL)
        return
    }
    const handleAddCheckpoint = (todo) => (event) => {
        if (event.keyCode === 13) {
            console.log("in add checkpoint")
            //console.log(todo)
            //console.log(event.target.value)
            //https://stackoverflow.com/a/63724115
            const td = { ...todo }
            const index = findTodoIndex(td)

            const existing = () => {
                const cpindex = findCheckpointIndex(td, event.target.value)
                if (cpindex === -1) return false
                else return true
            }
            const cpindex = findCheckpointIndex(td, event.target.value)
            //console.log("todo index",index)
            console.log("cpindex", cpindex)
            let SCHOOL = { ...school }
            console.log("old todo: ", SCHOOL.todos)
            // let CHECKPOINTS = SCHOOL.todos[index].checkpoints
            // console.log("old checkpoints: ", CHECKPOINTS)
            // const CHECKPOINT = { ...Checkpoint }
            // console.log("checkpoint template: ", CHECKPOINT)

            if (cpindex === -1) {
                //checkpoint doesn't exitst
                let CHECKPOINTS = SCHOOL.todos[index].checkpoints
                console.log("old checkpoints: ", CHECKPOINTS)
                const CHECKPOINT = { ...Checkpoint }
                console.log("checkpoint template: ", CHECKPOINT)
                console.log("checkpoint doesn't exitst")
                CHECKPOINT.content = event.target.value
                CHECKPOINTS.push(CHECKPOINT)
                console.log("pushed checkpoints: ", CHECKPOINTS)
                const checkpointindex = findCheckpointIndex(td, event.target.value)
                console.log("checkpointindex: ", checkpointindex)
                console.log("new cp: ", CHECKPOINTS)
                console.log("todos: ", SCHOOL.todos[index])
                SCHOOL.todos[checkpointindex].checkpoints = CHECKPOINTS

            } else {
                //checkpoint already exitst
                console.log("checkpoint exist")
                return
            }
            console.log("school", SCHOOL)
            console.log("leave add checkpoint")
            setSchool(SCHOOL)

            return
        }
    }
    const handleAddSchool = () => {
        const schoolname = schoolNameRef.current.value
        console.log(schoolname)
        console.log(checked)
        const AddSchool = {
            SchoolName: schoolname,
            SchoolTodos: checked
        }
        setAddSchool(AddSchool);
        handleClose();
    }

    function not(a, b) {
        return a.filter((value) => b.indexOf(value) === -1);
    }

    function intersection(a, b) {
        return a.filter((value) => b.indexOf(value) !== -1);
    }

    function union(a, b) {
        return [...a, ...not(b, a)];
    }

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };
    const customAccordion = (title, todos) => {
        //todos=school.todos
        const items = todos.map((todo) => {
            return todo.name
        })
        return (
            <Card>
                <CardHeader
                    className={classes.cardHeader}
                    avatar={
                        <Checkbox
                            onClick={handleToggleAll(items)}
                            checked={numberOfChecked(items) === items.length && items.length !== 0}
                            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                            disabled={items.length === 0}
                            inputProps={{ 'aria-label': 'all items selected' }}
                        />
                    }
                    title={title}
                    subheader={`${numberOfChecked(items)}/${items.length} selected`}
                />
                <Divider />
                {todos.map((todo, index) => {
                    const value = todo.name
                    const todoName = todo.name
                    const labelId = `transfer-list-all-item-${index}-label`;
                    return (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-label="Expand"
                                aria-controls="additional-actions1-content"
                                id={labelId}
                            >

                                <Grid item xs={8}>
                                    <FormControlLabel
                                        aria-label="Acknowledge"
                                        onClick={(event) => {
                                            handleToggle(value)
                                            event.stopPropagation()
                                        }}
                                        onFocus={(event) => event.stopPropagation()}
                                        control={<Checkbox
                                            checked={checked.indexOf(value) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />}
                                        label={value}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <DatePicker todo={todo} handleSetTodo={handleSetTodo}
                                        type="todo" pickerlable={`Complete Time ${index}`} />
                                </Grid>
                            </AccordionSummary>
                            <AccordionDetails>

                                <Grid className={classes.margin} container spacing={1}
                                    alignItems="flex-end">
                                    <Grid item xs={1}>
                                        <CommentIcon />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="input-with-icon-grid"
                                            variant="outlined"
                                            label="Type Comment..."
                                            onChange={handleAddComment(todo)}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container>
                                    <List>
                                        {todo.checkpoints.map((checkpoint, index) => {

                                            const content = checkpoint.content

                                            return (
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <SchoolIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={content} />
                                                    <DatePicker
                                                        todo={todo}
                                                        handleSetTodo={handleSetTodo}
                                                        type="checkpoint"
                                                        num={findCheckpointIndex(todo, content)}
                                                        pickerlable={`deadline ${index}`} />
                                                </ListItem>
                                            )
                                        })}
                                    </List>
                                </Grid>
                                <Grid className={classes.margin} container spacing={0}
                                    alignItems="flex-end" justify="flex-start">
                                    <Grid item xs={1}>
                                        <AddCircleIcon />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField
                                            id="add-checkpoint-input"
                                            label="Add Checkpoint"
                                            onKeyDown={handleAddCheckpoint(todo)}
                                        />
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                    )
                })
                }
                <Grid className={classes.margin} container spacing={0}
                    alignItems="flex-end" justify="flex-start">
                    <Grid item xs={1}>
                        <AddIcon />
                    </Grid>
                    <Grid item xs={11}>
                        <TextField
                            id="add-todo-input"
                            label="Add Todo"
                            inputRef={addTodoRef}
                            onKeyDown={handleAddTodo} />
                    </Grid>
                </Grid>
            </Card>

        )
    }


    const customList = (title, items) => (
        <Card>
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                        disabled={items.length === 0}
                        inputProps={{ 'aria-label': 'all items selected' }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            <List className={classes.list} dense component="div" role="list">
                {items.map((value, index) => {
                    const labelId = `transfer-list-all-item-${index}-label`;

                    return (
                        <Grid container spacing={2} >
                            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                                <Grid item xs={1}>
                                    <ListItemIcon>
                                        <Checkbox
                                            checked={checked.indexOf(value) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                </Grid>
                                <Grid item xs={4}>
                                    <ListItemText id={labelId} primary={value} />
                                </Grid>
                                <Grid item xs={4}>
                                    <DatePicker pickerlable={`Complete Time ${index}`} />
                                </Grid>

                            </ListItem>
                        </Grid>
                    );
                })}
                <Divider />
                <Grid className={classes.margin} container spacing={0} alignItems="flex-end" justify="flex-start">
                    <ListItem button >
                        <Grid item xs={1}>
                            <AddIcon />
                        </Grid>
                        <Grid item xs={11}>
                            <TextField
                                id="add-todo-input"
                                label="Add Todo"
                                inputRef={addTodoRef}
                                onKeyDown={handleAddTodo} />
                        </Grid>
                    </ListItem>
                </Grid>
            </List>
        </Card >
    );


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
                                    onChange={(e) => { console.log(e.target.value) }}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <Grid item>{customAccordion('School Todos', school.todos)}</Grid>
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
