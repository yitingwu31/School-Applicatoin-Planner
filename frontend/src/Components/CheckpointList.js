import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { useMutation } from '@apollo/client';
import { COMPLETE_CHECKPOINT_MUTATION } from '../graphql';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#E9EAEC',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: "brown"
  },
}));

export default function CheckpointList ({ checkpoints, user }) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);

  const [completeCheckpoint] = useMutation(COMPLETE_CHECKPOINT_MUTATION);

  useEffect(() => {
    let chk = [];
    checkpoints.map((check, idx) => {
      if (check.completed === true) {
        chk.push(idx);
      }
    })
    setChecked(chk);
  }, [checkpoints]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    }
    else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    handleCheck(value);
  };

  const handleCheck = async (index) => {
    const chop = checkpoints[index].key.split('-');
    await completeCheckpoint ({
        variables: {
            user: user,
            school: chop[1],
            task: chop[2],
            content: checkpoints[index].content
        }
    })
  }

  return (
    <List dense className={classes.root}>
      {checkpoints.map((check, index) => {
        const labelId = `checkbox-list-secondary-label-${index}`;
        return (
          <ListItem key={index} button>
            <ListItemText id={labelId} primary={`${check.content}`} secondary={check.time}/>
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(index)}
                checked={checked.indexOf(index) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
                color="primary"
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
