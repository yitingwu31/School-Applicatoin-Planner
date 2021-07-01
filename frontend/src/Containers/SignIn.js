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
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION, USER_QUERY } from '../graphql';

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



const SignIn = ({ setUser, setSignIn }) => {

	const classes = useStyles();
	const [values, setValues] = React.useState({
		username: '',
		password: '',
		showPassword: false,
	});
	const { loading, error, data, refetch } = useQuery(USER_QUERY, {
		variables: {
			name: values.username,
			password: values.password,
		},
		fetchPolicy: "network-only"
	});
	const [createUser, { loading: UserLoading, error: UserError }] = useMutation(CREATE_USER_MUTATION)
	if (UserError) console.log("createuser error:", JSON.stringify(UserError, null, 2))

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleMutation = async (addUser) => {

		// console.log("in handle mutation", addUser.username, addUser.password)
		try {
			await createUser({
				variables: {
					name: addUser.username,
					password: addUser.password,
				}
			})
			await refetch()
			if (error) console.log("query error: ", JSON.stringify(error, null, 2))

			console.log("refetchdata", data)
		} catch (e) {
			console.log(e)
		}
		if (data.username === addUser.username
			&& data.password === addUser.password
		) {
			console.log("sign in")
			setUser(addUser.username)
			setSignIn(true)
		}

	}

	const handleAddUser = () => {
		let addUser = values
		handleMutation(addUser)
	}

	const handleSignIn = () => {
		if (values.username !== "" && values.password !== "") {
			handleAddUser()
		}
		else {
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
