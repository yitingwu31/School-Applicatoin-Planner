import { useState } from 'react'
import { Toolbar, IconButton, Button, Menu, MenuItem, Typography, AppBar } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AddSchool from './AddSchool'
import '../App.css'

const font = ['Quicksand', 'sans-serif'].join(',');

const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1.5px solid ${theme.palette.divider}`,
        margin: '4px 4px',
        backgroundColor: '#9DC183',
        height: '80px',
        position: 'relative'
    },
    toolbarTitle: {
        flex: 1,
        fontFamily: font,
        fontSize: '35px',
        fontWeight: 'bold',
        color: 'white',
        marginLeft: '20px'
    },
    toolbarMenu: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '18px',
        paddingRight: '30px',
        paddingLeft: '20px',
        "&:focus": {
            outline: 'none'
        }
    },
    toolbarAdd: {
        color: 'white',
        size: 'big',
        "&:focus": {
            outline: 'none'
        }
    },
    menuItem: {
        fontFamily: font,
        fontSize: '18px'
    }
}));

const NavBar = () => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    // Add School
    const [addOpen, setAddOpen] = useState(false);
    const handleAddOpen = () => {
        setAddOpen(true);
    };
    const handleAddClose = () => {
        setAddOpen(false);
    };



    return (
        <div>
            <Toolbar className={classes.toolbar}>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="left"
                    noWrap
                    className={classes.toolbarTitle}
                >
                    School Application Planner
                </Typography>
                <IconButton className={classes.toolbarAdd} aria-label="add school" color="primary" onClick={handleAddOpen} size='big'>
                    <AddCircleIcon />
                </IconButton>
                <AddSchool
                    handleClose={handleAddClose}
                    open={addOpen}
                />
                <Button className={classes.toolbarMenu} aria-controls="view-menu" aria-haspopup="true" onClick={handleClick}>
                    VIEW
                </Button>
                <Menu id="view-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem className={classes.menuItem} onClick={handleClose} component={RouterLink} to="/schools">School</MenuItem>
                    <MenuItem className={classes.menuItem} onClick={handleClose} component={RouterLink} to="/calendar">Calendar</MenuItem>
                </Menu>
                

            </Toolbar>
        </div>
    )
}

export default NavBar;