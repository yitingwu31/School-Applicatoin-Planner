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
    // CREATE_USER_MUTATION, 
    CREATE_SCHOOL_MUTATION, CREATE_TODO_MUTATION, CREATE_CHECKPOINT_MUTATION
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

export default function CustomizedAddSchool({ open, handleClose }) {
    const classes = useStyles();
    const School_todos = [
        "Program Research", "Register", "Application Form",
        "Letter", "SOP(Statement of Purpose)", "PS(Personal Statement)",
        "GRE/Toefl", "CV/Resume", "Transcripts"
    ]
    const defaultDeadline = new Date()
    let School = {
        name: "",
        deadline: defaultDeadline,
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

    const _School = initSchool(School_todos, Todo, School)
    const [checked, setChecked] = useState([]);
    const [school, setSchool] = useState(_School)
    const schoolNameRef = useRef();
    const [createSchool, { loading: SchoolLoading, error: SchoolError }] = useMutation(CREATE_SCHOOL_MUTATION)
    const [createTodo, { loading: TodoLoading, error: TodoError }] = useMutation(CREATE_TODO_MUTATION)
    const [createCheckpoint, { loading: CheckpointLoading, error: CheckpointError }] = useMutation(CREATE_CHECKPOINT_MUTATION)

    // if (SchoolLoading) console.log("SchoolLoading")
    // if(SchoolError) console.log("SchoolError",JSON.stringify(SchoolError, null, 2))
    // if (TodoLoading) console.log("TodoLoading")
    // if(TodoError) console.log("TodoError",TodoError)
    if (CheckpointLoading) console.log("CheckpointLoading")
    if (CheckpointError) console.log("CheckpointError", CheckpointError)

    const handleMutation = async (addSchool) => {
        const owner = "emily" //modify later
        //await 
        await createSchool({
            variables: {
                owner: owner,
                name: addSchool.name,
                deadline: addSchool.deadline
            }
        })
        for (let i = 0; i < addSchool.todos.length; i++) {
            let addTodo = { ...addSchool.todos[i] }
            //await 
            await createTodo({
                variables: {
                    owner: owner,
                    school: addSchool.name,
                    task: addTodo.task,
                    name: addSchool.name,
                    deadline: addTodo.deadline,
                    comment: addTodo.comment
                }
            })
            for (let j = 0; j < addTodo.checkpoints.length; j++) {
                let addCheckpoint = { ...addTodo.checkpoints[j] }
                //console.log("addCheckpoint",addCheckpoint)
                //await 
                await createCheckpoint({
                    variables: {
                        owner: owner,
                        school: addSchool.name,
                        task: addTodo.task,
                        content: addCheckpoint.content,
                        time: addCheckpoint.time
                    }
                })
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
        console.log("school in handleAddSchool", school)
        const nxtSchoolnxtTodoS = [...school.todos]
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

        addSchool.name = schoolNameRef.current.value
        addSchool.todos = addSchoolNxtTodoS
        // console.log("nxt addSchool prototype: ", addSchool)
        handleMutation(addSchool)
        // setSchool(addSchool);

        handleClose();
    }
    const hOkBtnOnClick = () => {
        // problem here.
        // console.log("click", school)
        handleAddSchool()
        handleClose()
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
                        <Grid container spacing={1} alignItems="center" justify="space-between">
                            <Grid container xs={7} spacing={2} alignItems="flex-end">
                                <Grid item >
                                    <SchoolIcon />
                                </Grid>
                                <Grid item>
                                    <TextField id="input-with-icon-grid"
                                        label="School Name" inputRef={schoolNameRef}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={5} >
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
