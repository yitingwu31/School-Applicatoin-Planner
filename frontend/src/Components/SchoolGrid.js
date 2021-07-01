import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import { dateDisplay, missingDisplay } from '../utils';
import { useMutation } from '@apollo/client';
import { COMPLETE_SCHOOL_MUTATION } from '../graphql';
import EditIcon from '@material-ui/icons/Edit';
import EditSchool from './EditSchool'

// const font = ['Libre Baskerville', 'serif', 'Quicksand', 'sans-serif'].join(',');
const font = ['Quicksand', 'sans-serif'].join(',');

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
		fontFamily: font,
		fontSize: '21px',
		color: 'black',
		fontWeight: '500'
	},
	avatar: {
		backgroundColor: '#FAD02C',
	},
	item: {
		fontFamily: font,
		fontSize: '18px',
		color: 'black',
		fontWeight: '400'
	}
}));

export default function SchoolCard({ key, name, date, todos, rate, user, completed }) {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const [editOpen, setEditOpen] = useState(false)
	const handleEditOpen = () => {
		setEditOpen(true);
	};
	const handleEditClose = () => {
		setEditOpen(false);
	};

	const [missing, setMissing] = useState();
	const [percent, setPercent] = useState(0);
	const [fakeMissings, setFakeMissings] = useState([]);
	const [completeSchool] = useMutation(COMPLETE_SCHOOL_MUTATION);

	useEffect(() => {
		let msg = findMissing(todos);
		setMissing(msg);
	}, [todos])

	useEffect(() => {
		async function compschool(missing) {
			if (missing === "All done!" && completed === false) {
				await completeSchool({
					variables: {
						key: `${user}-${name}`
					}
				})
			};
		};
		compschool(missing);
	}, [missing])

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const findMissing = (todos) => {
		let missing = todos.filter((todo) => todo.completed === false);
		setFakeMissings(missing);
		const per = Math.round((todos.length - missing.length) / todos.length * 100);
		setPercent(per);
		if (missing.length === 0) {
			return 'All done!'
		}
		let ret = '';
		for (let i = 0; i < missing.length; i++) {
			ret = ret.concat(`${missingDisplay(missing[i].task)}, `);
		}
		ret = ret.slice(0, -2)
		return ret;
	}

	const fakeCheck = (task) => {
		let ret = '';
		for (let i = 0; i < fakeMissings.length; i++) {
			if (fakeMissings[i].task === task) {
				fakeMissings.splice(i, 1);
			} else {
				ret = ret.concat(`${missingDisplay(fakeMissings[i].task)}, `);
			}
		}
		ret = ret === '' ? "All done!" : ret.slice(0, -2);
		setMissing(ret);
		setPercent(Math.round((todos.length - fakeMissings.length) / todos.length * 100));
	}

	return (
		<Box m={1.5}>
			<Card className={classes.root}>
				<CardHeader className={classes.header}
					avatar={
						<Avatar className={classes.avatar}>{rate}</Avatar>
					}
					action={
						<IconButton aria-label="edit school" color="primary" onClick={handleEditOpen}>
							<EditIcon />
						</IconButton>
						// <Button color="primary">Edit</Button>
					}
				/>
				<EditSchool
					name={name}
					date={date}
					todos={todos}
					user={user}
					editOpen={editOpen}
					handleEditClose={handleEditClose}

				/>
				<CardContent>
					<Grid container spacing={2}>
						<Grid item xs={3}>
							<Typography className={classes.grid}>{name}</Typography>
						</Grid>
						<Grid item xs={6}>
							<ProgressBar percent={percent} />
							<Typography>{missing}</Typography>
						</Grid>
						<Grid item xs={3}>
							<Typography variant="subtitle1">Upcoming Date:</Typography>
							<Typography variant="subtitle1">{dateDisplay(date)}</Typography>
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
				<Collapse in={expanded} timeout="auto">
					<CardContent>
						<h3>To-Do's:</h3>
						<ToDoList todos={todos} user={user} fakeCheck={fakeCheck} />
					</CardContent>
				</Collapse>
			</Card>
		</Box>
	);
}
