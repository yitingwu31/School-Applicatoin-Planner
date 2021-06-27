import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProgressBar from '../Components/ProgressBar'
import ToDoList from '../Components/ToDoList'
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: '98%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#E9EAEC',
  },
  header: {
      auto: 'left',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  grid: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  avatar: {
    backgroundColor: '#FAD02C',
  },
}));


export default function SchoolCard({key, name, date, rate}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box m={1.5}>
    <Card className={classes.root}>
      <CardHeader className={classes.header}
        avatar={
            <Avatar className={classes.avatar}>{rate}</Avatar>
        }
        action={
            <Button color="primary">Edit</Button>
        }
      />
      
      <CardContent>
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Typography className={classes.grid}>{name}</Typography>
            </Grid>
            <Grid item xs={6}>
                <ProgressBar/>
                <Typography>Missing: SOP, Letter</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="subtitle1">Upcoming Date:</Typography>
                <Typography variant="subtitle1">{date}</Typography>
            </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more">
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <h3>To-Do's:</h3>
          <ToDoList/>
        </CardContent>
      </Collapse>
    </Card>
    </Box>
  );
}
