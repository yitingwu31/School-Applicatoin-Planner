import React, { useState, useEffect, useRef } from 'react';
import {
    Button, IconButton, Typography, TextField, Grid,
    Dialog, Divider, Card, CardHeader,
    List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText,
    ListItemAvatar, Avatar, Checkbox
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import CommentIcon from '@material-ui/icons/Comment';
import SchoolIcon from '@material-ui/icons/School';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleIcon from '@material-ui/icons/AddCircle'

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

export default function CustomizedDialogs({ open, handleClose,setAddSchool }) {
    const classes = useStyles();
    const School_requests = [
        "Program Research", "Register", "Application Form",
        "Letter", "SOP(Statement of Purpose)", "PS(Personal Statement)",
        "GRE/Toefl", "CV/Resume", "Transcripts"
    ]
    const [checked, setChecked] = useState([]);
    const [school_requests, setSchoolRequests] = useState(School_requests)
    const textFieldRef = useRef();
    const SchoolNameRef = useRef();

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAddRequest = (event) => {
        let value = ""
        if (event.keyCode === 13) {
            value = textFieldRef.current.value
            const newRequests = [...school_requests]
            newRequests.push(value)
            setSchoolRequests(newRequests)
            textFieldRef.current.value = ""
        }
    }

    const handleAddSchool = () => {
        const schoolname = SchoolNameRef.current.value
        console.log(schoolname)
        console.log(checked)
        const AddSchool = {
            SchoolName: schoolname,
            SchoolRequests: checked
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

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

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
                        <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value} />
                        </ListItem>
                    );
                })}
                <Divider />
                <ListItem button >
                    <div className={classes.margin}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <AddIcon />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="add-request-input"
                                    label="Add Request"
                                    inputRef={textFieldRef}
                                    onKeyDown={handleAddRequest} />
                            </Grid>
                        </Grid>
                    </div>
                </ListItem>
            </List>
        </Card >
    );

    useEffect(() => {
        return () => { }
    }, [school_requests])


    return (
        <div>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title"
                open={open} fullWidth={true} maxWidth={'sm'}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add School
                </DialogTitle>
                <DialogContent dividers>
                    <div className={classes.margin}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <SchoolIcon />
                            </Grid>
                            <Grid item>
                                <TextField id="input-with-icon-grid" label="School Name" inputRef={SchoolNameRef} />
                            </Grid>
                        </Grid>
                    </div>

                    <Grid item>{customList('School Requests', school_requests)}</Grid>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary" onClick={handleAddSchool}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
