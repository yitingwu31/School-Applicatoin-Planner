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
        /*

        */
        let nxtSchool = { ...school }
        if (event.keyCode === 13) {
            let newTask = addTodoRef.current.value
            const newTodo = {
                task: newTask,
                deadline: defaultDeadline,
                comment: "",
                checkpoints: [],
            };
            let newTodos = [...school.todos]
            newTodos.push(newTodo)
            nxtSchool.todos = [...newTodos]
            // console.log("handleAddTodo,", nxtSchool)
            setSchool(nxtSchool)
            addTodoRef.current.value = ""
        }
    }

    const handleAddComment = (todo) => (event) => {
        /*
        add one comment in a "todo"
        */
        let nxtSchool = { ...school }
        const index = findTodoIndex(todo)
        nxtSchool.todos[index].comment = event.target.value
        setSchool(nxtSchool)
    }
    const handleAddCheckpoint = (todo, Checkpoint) => (event) => {
        // console.log("handleAddCheckpoint")
        if (event.keyCode === 13) {

            //https://stackoverflow.com/a/63724115
            const td = { ...todo }
            const index = findTodoIndex(td)
            const cpindex = findCheckpointIndex(td, event.target.value)
            // console.log("index, cpindex:", index, cpindex)
            const existing = (x) => {
                if (x === -1) return false
                else return true
            }
            let nxtSchool = { ...school }
            //const nxtSchoolTODOS = [...school.todos]
            let TODO = { ...nxtSchool.todos[index] }

            let CHECKPOINTS = [...nxtSchool.todos[index].checkpoints] //關鍵array deep copy!!
            let CHECKPOINT = { ...Checkpoint }//checkpoint template
            if (!existing(cpindex)) {
                //console.log("checkpoint doesn't exitst")
                CHECKPOINT.content = event.target.value
                CHECKPOINT.time = TODO.deadline
                CHECKPOINTS.push(CHECKPOINT)
                nxtSchool.todos[index].checkpoints = CHECKPOINTS

            } else {
                //console.log("checkpoint exist")

                return
            }
            // console.log("CHECKPOINTS", CHECKPOINTS)
            // console.log("nxtSchool in addcheckpoint:", nxtSchool)

            setSchool(nxtSchool)
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
                                <DatePicker
                                    todo={todo}
                                    handleSetTodo={handleSetTodo}
                                    school={school}
                                    type="todo"
                                    pickerlable={`deadline ${index}`} />
                            </Grid>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Grid container spacing={0} alignItems="flex-end" justify="space-between">
                                <Grid container spacing={1} alignItems="flex-end" xs={7}>
                                    <Grid item>
                                        <CommentIcon />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="input-with-icon-grid"
                                            variant="outlined"
                                            label="add Todo Comment"
                                            onChange={handleAddComment(todo)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} alignItems="flex-end" xs={5}>
                                    <Grid item >
                                        <AddCircleIcon />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="add-checkpoint-input"
                                            label="add Checkpoint"
                                            onKeyDown={handleAddCheckpoint(todo, Checkpoint)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                        <Divider />
                        <AccordionDetails>
                            <Grid container spacing={0} alignItems="flex-end" justify="space-between">
                                {todo.checkpoints.map((checkpoint, index) => {
                                    const content = checkpoint.content
                                    return (
                                        <Grid container spacing={0} alignItems="flex-end">
                                            <Grid container xs={7} alignItems="flex-end" spacing={1}>
                                                <Grid item >
                                                    <CheckCircleOutlineIcon />
                                                </Grid>
                                                <Grid item >
                                                    {/* <TextField primary={`checkpoint: ${content}`} /> */}
                                                    <Typography>{`checkpoint: ${content}`}</Typography>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={5}>
                                                <DatePicker
                                                    todo={todo}
                                                    school={school}
                                                    handleSetTodo={handleSetTodo}
                                                    type="checkpoint"
                                                    num={findCheckpointIndex(todo, content)}
                                                    pickerlable={`deadline ${index}`}
                                                />
                                            </Grid>

                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </AccordionDetails>
                        <AccordionDetails>

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