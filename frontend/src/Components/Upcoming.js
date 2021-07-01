import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { Time2String, dateDisplay } from '../utils';
import { UPCOMING_QUERY } from '../graphql';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
}));

const Upcoming = ({ user="emily" }) => {
    const classes = useStyles();
    const [weekstr, setWeestr] = useState([]);
    const [upcoming, setUpcoming] = useState([]);

    useEffect(() => {
        const day = new Date();
        let newweekstr = [];
        newweekstr.push(Time2String(day));
        for (let i = 1; i < 7; i++) {
            day.setDate(day.getDate() + 1);
            newweekstr.push(Time2String(day));
        }
        setWeestr([...newweekstr]);
    }, [user])

    const { loading, error, data, subscribeToMore } = useQuery(UPCOMING_QUERY, {
        variables: {
            user: user,
            dates: weekstr
        }
    })

    useEffect(() => {
        if (loading) console.log("Loading upcoming...");
        if (error) console.log("Error upcoming: ", error);
        if (!loading && !error) {
            console.log("upcoming query done!");
            const uplist = data.allInWeek;
            console.log(uplist)
            setUpcoming([...uplist]);
        }
    }, [data])

    const getIcon = (type) => {
        return type === "todo" ? <AssignmentIcon /> : <PlaylistAddCheckIcon />
    }

    let display = upcoming.length === 0 ? 
    (
        "You're all done fore this week!!"
    )
    :
    (
        <List className={classes.root}>
            {upcoming.map((task) => (
                <div>
                <ListItem >
                    <ListItemAvatar>
                        {getIcon(task.type)}
                    </ListItemAvatar>
                    <ListItemText 
                        primary={task.context}
                        secondary={dateDisplay(task.deadline)}
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                </div>
            ))}
        </List>
    );

    return (
        <div>
            <Typography>
                Upcoming This Week...
            </Typography>
            {display}
        </div>
    )
};

export default Upcoming;
