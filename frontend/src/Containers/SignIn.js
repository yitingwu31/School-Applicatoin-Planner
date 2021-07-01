import "../App.css";
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    verricalAlign: 'middle',
    height: '150px',
    width: '50%',
    marginTop: '30%',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  title: {
    fontFamily: 'sans-serif',
    fontSize: '40px',
    textAlign: 'center',
  },
  margin: {
    margin: theme.spacing(1.5),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

const SignIn = ({user, password}) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    username: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignIn = () => {
    if (values.username !== "" && values.password !== ""){
        // if the username exists, check if the password is correct
        
        // if the username doesn't exist (it's a new username), then create a new user
    }
    else{
        alert("Please enter your username or password");
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>Sign in to Your Workspace</div>
      
      <div>
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="component-simple">Username</InputLabel>
          <Input
            id="component-simple"
            type={values.showPassword ? 'text' : 'username'}
            value={values.username}
            onChange={handleChange('username')}
          />
        </FormControl>
        
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
            variant="contained"
            size="small"
            color="primary"
            className={classes.margin}
            onClick={handleSignIn}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};
  
export default SignIn;
