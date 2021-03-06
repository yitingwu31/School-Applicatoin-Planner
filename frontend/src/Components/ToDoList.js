import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import CheckpointList from './CheckpointList';
import { useMutation } from '@apollo/client';
import { COMPLETE_TODO_MUTATION } from '../graphql';
import { dateDisplay } from '../utils';

const font = ['Libre Baskerville', 'serif', 'Quicksand', 'sans-serif'].join(',');

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#E9EAEC',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  itemText: {
    fontFamily: font,
    fontSize: "13px"
  }
}));

export default function CheckboxListSecondary({ todos, user, fakeCheck }) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);

  const [completeTodo] = useMutation(COMPLETE_TODO_MUTATION);

  useEffect(() => {
    function setCheck() {
      let chk = [];
      // todos.map((todo, idx) => {
      //   if (todo.completed === true) {
      //     chk.push(idx);
      //   }
      // })
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].completed === true) {
          chk.push(i);
        }
      }
      setChecked(chk);
    }
    setCheck();
  }, [todos]);

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
    await completeTodo({
      variables: {
        user: user,
        school: todos[index].key.split('-')[1],
        task: todos[index].task
      }
    });
    fakeCheck(todos[index].task);
  }

  return (
    <List dense className={classes.root}>
      {todos.map((todo, index) => {
        const labelId = `checkbox-list-secondary-label-${index}`;
        return (
          <div>
          <ListItem key={index} button>
            <ListItemText className={classes.itemText} id={labelId} primary={todo.task} secondary={dateDisplay(todo.deadline)}/>
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
          <CheckpointList checkpoints={todo.checkpoints} user={user}/>
          </div>
        );
      })}
    </List>
  );
}
