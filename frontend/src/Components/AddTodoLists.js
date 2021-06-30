import React, { useState, useEffect, useRef } from 'react';
import DatePicker from './DatePicker'
import {
    Button, IconButton, Typography, TextField, Grid,
    Dialog, Divider, Card, CardHeader,
    List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText,
    ListItemAvatar, Avatar, Checkbox
} from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddIcon from '@material-ui/icons/Add';
import AddCircleIcon from '@material-ui/icons/AddCircle'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CommentIcon from '@material-ui/icons/Comment';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


export default function AddTodoLists({ todos, school, setSchool, checked, setChecked,
    classes, findTodoIndex, findCheckpointIndex, defaultDeadline, handleSetTodo }) {

    const Checkpoint = {
        content: "",
        time: defaultDeadline
    }
    const addTodoRef = useRef();
    
    const handleAddTodo = (event) => {
        let SCHOOL = { ...school }
        let value = ""
        if (event.keyCode === 13) {
            value = addTodoRef.current.value
            let newTodos = [...school.todos]
            newTodos.push(value)
            SCHOOL.todos = [...newTodos]
            setSchool(SCHOOL)
            addTodoRef.current.value = ""
        }
    }

    const handleAddComment = (todo) => (event) => {
        let SCHOOL = { ...school }
        const index = findTodoIndex(todo)
        SCHOOL.todos[index].comment = event.target.value
        setSchool(SCHOOL)
    }
    const handleAddCheckpoint = (todo, Checkpoint) => (event) => {
        if (event.keyCode === 13) {
            //console.log("in add checkpoint")
            //https://stackoverflow.com/a/63724115
            const td = { ...todo }
            const index = findTodoIndex(td)
            const cpindex = findCheckpointIndex(td, event.target.value)
            //console.log("index, cpindex:", index, cpindex)
            const existing = (x) => {
                if (x === -1) return false
                else return true
            }
            let SCHOOL = { ...school }
            //const SCHOOLTODOS = [...school.todos]
            let TODO = { ...SCHOOL.todos[index] }

            let CHECKPOINTS = [...SCHOOL.todos[index].checkpoints] //關鍵array deep copy!!
            let CHECKPOINT = { ...Checkpoint }//checkpoint template
            if (!existing(cpindex)) {
                //console.log("checkpoint doesn't exitst")
                CHECKPOINT.content = event.target.value
                CHECKPOINT.time = TODO.deadline
                CHECKPOINTS.push(CHECKPOINT)
                //console.log(index)
                SCHOOL.todos[index].checkpoints = CHECKPOINTS

            } else {
                //console.log("checkpoint exist")

                return
            }
            // console.log("school", SCHOOL)
            // console.log("leave add checkpoint")
            setSchool(SCHOOL)
            event.target.value = ""
            return
        }
    }
    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };
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
    function not(a, b) {
        return a.filter((value) => b.indexOf(value) === -1);
    }
    function intersection(a, b) {
        return a.filter((value) => b.indexOf(value) !== -1);
    }
    function union(a, b) {
        return [...a, ...not(b, a)];
    }
    const items = todos.map((todo) => {
        return todo.task
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
                title="Select Todos"
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            {todos.map((todo, index) => {
                const value = todo.task
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
                                    type="todo"
                                    pickerlable={`deadline ${index}`} />
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
                                                    <CheckCircleOutlineIcon />
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
                                        onKeyDown={handleAddCheckpoint(todo, Checkpoint)}
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