import { useState } from 'react' 
import { Toolbar, IconButton, Button, Menu, MenuItem } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { Link as MaterialLink } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div>
            <Toolbar>
                <Button aria-controls="view-menu"  aria-haspopup="true" onClick={handleClick}>
                    View
                </Button>
                <Menu id="view-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={handleClose} component={RouterLink} to="/schools">School</MenuItem>
                    <MenuItem onClick={handleClose} component={RouterLink} to="/calendar">Calendar</MenuItem>
                </Menu>
                <IconButton aria-label="add school" color="primary" component={RouterLink} to="/addSchool">
                    <AddCircleIcon />
                </IconButton>
            </Toolbar>
        </div>
    )
}

export default NavBar;