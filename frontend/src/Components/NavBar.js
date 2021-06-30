import { useState } from 'react'
import { Toolbar, IconButton, Button, Menu, MenuItem } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { Link as RouterLink } from 'react-router-dom'
import AddSchool from './AddSchool'

const NavBar = () => {
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
            <Toolbar>
                <Button aria-controls="view-menu" aria-haspopup="true" onClick={handleClick}>
                    VIEW
                </Button>
                <Menu id="view-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={handleClose} component={RouterLink} to="/schools">School</MenuItem>
                    <MenuItem onClick={handleClose} component={RouterLink} to="/calendar">Calendar</MenuItem>
                </Menu>
                <IconButton aria-label="add school" color="primary" onClick={handleAddOpen}>
                    <AddCircleIcon />
                </IconButton>
                <AddSchool
                    handleClose={handleAddClose}
                    open={addOpen}
                />

            </Toolbar>
        </div>
    )
}

export default NavBar;