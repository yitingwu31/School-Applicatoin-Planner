import React, { useState, useRef } from 'react';
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
import SchoolIcon from '@material-ui/icons/School';
import CloseIcon from '@material-ui/icons/Close';
import {
    UPDATE_SCHOOL_MUTATION, UPDATE_TODO_MUTATION, UPDATE_CHECKPOINT_MUTATION
} from '../graphql';
import { useMutation } from '@apollo/client';
import { Time2String } from '../utils'

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


/*********************************************************************** */

export default function CustomizedEditSchool({ name, date, todos, user, editOpen, handleEditClose }) {
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
        let nxtSchool = { ...School }
        //https://kanboo.github.io/2018/01/27/JS-ShallowCopy-DeepCopy/
        for (let i = 0; i < School_todos.length; i++) {
            let nxtTodo = { ...Todo }
            nxtTodo.task = School_todos[i]
            nxtSchool.todos[i] = nxtTodo
        }
        return nxtSchool
    }
    const initEditSchool = () => {
        // initialize data from query
        const nxtSchool = {
            name: name,
            deadline: date,
            todos: [...todos]
        }
        return nxtSchool
    }
    const initCheckedSchool = () => {
        return todos.map((todo) => {
            return todo.task
        })
    }

    const _EditSchool = initEditSchool()
    // const _School = initSchool(School_todos, Todo, School)
    const [checked, setChecked] = useState(initCheckedSchool())
    const [school, setSchool] = useState(_EditSchool)

    const [updateSchool, { loading: SchoolLoading, error: SchoolError }] = useMutation(UPDATE_SCHOOL_MUTATION)
    const [updateTodo, { loading: TodoLoading, error: TodoError }] = useMutation(UPDATE_TODO_MUTATION)
    const [updateCheckpoint, { loading: CheckpointLoading, error: CheckpointError }] = useMutation(UPDATE_CHECKPOINT_MUTATION)

    if (SchoolLoading) console.log("SchoolLoading")
    if (SchoolError) console.log("SchoolError: ", JSON.stringify(SchoolError, null, 2))
    if (TodoLoading) console.log("TodoLoading")
    if (TodoError) console.log("TodoError: ", JSON.stringify(TodoError, null, 2))
    if (CheckpointLoading) console.log("CheckpointLoading")
    if (CheckpointError) console.log("CheckpointError: ", JSON.stringify(CheckpointError, null, 2))

    const DatetypeIsNotString = (date) => {
        if (typeof (date) !== "string") {
            return true
        }
        else {
            return false
        }
    }
    const handleMutation = async () => {
        const addSchool = { ...school }
        let updateDate = ""
        if (DatetypeIsNotString(addSchool.deadline)) {
            // console.log("update school date")
            updateDate = Time2String(addSchool.deadline)
            await updateSchool({
                variables: {
                    user: user,
                    school: name,
                    date: updateDate
                }
            })
                .then((result) => console.log(result))
                .catch((e) => console.log("catch e in update: ", e))
        }
        //const user = "emily" //modify later

        for (let i = 0; i < addSchool.todos.length; i++) {
            let addTodo = { ...addSchool.todos[i] }
            if (DatetypeIsNotString(addTodo.deadline)) {
                // console.log("update todo date")
                updateDate = Time2String(addTodo.deadline)
                await updateTodo({
                    variables: {
                        user: user,
                        school: name,
                        task: addTodo.task,
                        date: updateDate,
                    }
                })
            }

            for (let j = 0; j < addTodo.checkpoints.length; j++) {
                let addCheckpoint = { ...addTodo.checkpoints[j] }
                //console.log("addCheckpoint",addCheckpoint)
                // console.log("update checkpoint date")
                if (DatetypeIsNotString(addCheckpoint.time)) {
                    updateDate = Time2String(addCheckpoint.time)
                    await updateCheckpoint({
                        variables: {
                            user: user,
                            school: name,
                            task: addTodo.task,
                            content: addCheckpoint.content,
                            date: updateDate,
                        }
                    })

                }
            }
        }
    }

    const findTodoIndex = (todo) => {
        const Todotask = todo.task
        const ans = school.todos.findIndex((nxtTodo) => {
            return nxtTodo.task === Todotask
        })
        return ans
    }
    const findCheckpointIndex = (todo, content) => {
        //console.log("in find checkpointindex")
        const nxtTodoindex = findTodoIndex(todo)
        const nxtTodo = school.todos[nxtTodoindex]
        //console.log(nxtTodo)
        //console.log(content)
        return nxtTodo.checkpoints.findIndex((item) => item.content === content)
    }
    const handleSetTodo = (todo) => {
        /*
        after modify each "todo" in school (add new "todo"
         won't call this) in form e.g. change date
        */
        let nxtSchool = { ...school }
        //find and replace
        const index = findTodoIndex(todo)
        nxtSchool.todos[index] = todo
        // console.log("handleSetTodo nxtschool: ", index, nxtSchool)
        setSchool(nxtSchool)
        // the school state is correct for sure.
        // console.log("school in handlesettodo:", school)
    }

    const handleAddSchool = () => {
        /*
        only work after click "ok" button.
        immediatly output data.
        */
        //finalize AddSchool data output
        // console.log("handleaddSchool")

        // addSchool is the school object prepaired upload to backend.
        let addSchool = { ...school }
        // console.log("school in handleAddSchool", school)
        let nxtSchoolnxtTodoS = [...school.todos]
        let addSchoolNxtTodoS = []
        // filter checked todo
        for (let i = 0; i < nxtSchoolnxtTodoS.length; i++) {
            if (checked.includes(nxtSchoolnxtTodoS[i].task)) {
                addSchoolNxtTodoS.push(nxtSchoolnxtTodoS[i])

            }
        }
        //format date
        addSchool.deadline = Time2String(addSchool.deadline)
        addSchoolNxtTodoS.map((todo) => {
            // todo.checkpoints.map((checkpoint) => {
            //     return checkpoint.time = Time2String(checkpoint.time)
            // })
            todo.checkpoints = todo.checkpoints.map((checkpoint) => {
                checkpoint.time = Time2String(checkpoint.time)
                return checkpoint
            })
            return todo.deadline = Time2String(todo.deadline)
        })


        // addSchool.name = schoolNameRef.current.value
        addSchool.todos = addSchoolNxtTodoS
        console.log("nxt addSchool prototype: ", addSchool)
        // handleMutation()
        // setSchool(addSchool);


    }


    const hOkBtnOnClick = () => {
        // problem here.
        // console.log("click", school)
        // console.log("schooldatetype", school.deadline, typeof (school.deadline), DatetypeIsString(school.deadline))
        // console.log("tododatetype:", school.todos[0].deadline, typeof (school.todos[0].deadline), DatetypeIsString(school.todos[0].deadline))
        // console.log("checkpointdatetype:", school.todos[0].checkpoints[0].time, typeof (school.todos[0].checkpoints[0].time), DatetypeIsString(school.todos[0].checkpoints[0].time))
        // handleAddSchool()
        handleMutation()
        handleEditClose()
    }

    return (
        <div>
            <Dialog onClose={handleEditClose} aria-labelledby="customized-dialog-title"
                open={editOpen} fullWidth={true} maxWidth={'md'}>
                <DialogTitle id="customized-dialog-title" onClose={handleEditClose}>
                    Edit School
                </DialogTitle>
                <DialogContent dividers>
                    <div className={classes.margin}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item xs={1}>
                                <SchoolIcon />
                            </Grid>
                            <Grid item>
                                <Typography id="input-with-icon-grid" label="School Name">{name}</Typography>
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
                        {/* {console.log("rdr school",school)} */}
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
                {/* {console.log("rdr c_addschool:", school)} */}
                <DialogActions>
                    <Button autoFocus onClick={hOkBtnOnClick}
                        color="primary" >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
