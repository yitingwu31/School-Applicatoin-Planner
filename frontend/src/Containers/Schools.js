import School_grid from '../Components/SchoolGrid'
import { useQuery } from '@apollo/react-hooks';
import { USER_SCHOOL_QUERY, SCHOOL_SUBSCRIPTION } from '../graphql';
import { useState, useEffect } from 'react';
import { compareTime } from '../utils';

let user = 'emily'

/*
const schools_data = [
	{
	  id: 1,
	  name: "University of California, Berkeley",
	  deadline: "3/28",
	  todos: [
		{
		  task: "PS",
		  deadline: "3/26",
		  completed: false,
		  checkpoints: [
			{
			  content: "ps1",
			  time: "3/6",
			  completed: false
			},
			{
			  content: "ps2",
			  time: "3/2",
			  completed: true
			}
		  ]
		},
		{
		  task: "SOP",
		  deadline: "3/27",
		  completed: true,
		  checkpoints: []
		}
	  ]
	},
	{
	  id: 2,
	  name: "Rice University",
	  deadline: "5/10",
	  todos: [
		{
		  task: "Letters",
		  deadline: "5/9",
		  completed: false,
		  checkpoints: []
		},
		{
		  task: "CV",
		  deadline: "5/8",
		  completed: false,
		  checkpoints: []
		}
	  ]
	},
	{
	  id: 3,
	  name: "Duke University",
	  deadline: "3/20",
	  todos: []
	},
	{
	  id: 4,
	  name: "Carnigie Mellon University",
	  deadline: "4/4",
	  todos: []
	}
  ];

  let all_schools = [] 
  for (let i = 0; i < schools_data.length; i++){
	  all_schools.push(<School_grid
							key = {i}
							name = {schools_data[i].name}
							date = {schools_data[i].deadline}
							rate = {i+1}
							todos = {schools_data[i].todos}
							// completed = {schools_data[i].completed}
						/>)
  }
*/

const Schools = () => {
	const [schools, setSchools] = useState([]);
	// const [editOpen, setEditOpen] = useState(false)
	const { loading, error, data, subscribeToMore } = useQuery(USER_SCHOOL_QUERY, {
		variables: {
			user: user
		},
		fetchPolicy: "cache-and-network"
	});
	// const handleEditOpen = () => {
    //     setEditOpen(true);
    // };
    // const handleEditClose = () => {
    //     setEditOpen(false);
    // };

	useEffect(() => {
		if (loading) console.log("Loading...");
		if (error) console.log("Error: ", error.message);
		if (!loading && !error) {
			// console.log("School query done!");
			const schoolList = data.userSchool;
			let sortedSchools = schoolList.slice();
			sortedSchools.sort((a, b) => compareTime(a, b));
			setSchools(sortedSchools);
		}
	}, [data]);

	useEffect(() => {
		console.log("catch subscription!")
		try {
			subscribeToMore({
				document: SCHOOL_SUBSCRIPTION,
				variables: { user: user },
				updateQuery: (prev, { subscriptionData }) => {
					if (!subscriptionData.data) return prev;
					const newSchool = subscriptionData.data.school.data;
					let newlist = [];
					let same = false;
					for (let i = 0; i < prev.userSchool.length; i++) {
						if (prev.userSchool[i].name === newSchool.name) {
							newlist.push(newSchool);
							same = true;
						} else {
							newlist.push(prev.userSchool[i]);
						}
					}

					if (same) {
						setSchools([...newlist]);
					} else {
						newlist = [newSchool, ...prev.userSchool];
						setSchools([...newlist]);
					}


					return {
						...prev,
						schools: [...newlist],
					}
				}
			})
		} catch (e) { console.log(e) }
	}, [subscribeToMore]);

	return (
		<div>
			<h1>{user}'s List of Candidate Schools</h1>
			<div>
				{schools.map((school, index) => (
					<School_grid
						key={index}
						name={school.name}
						date={school.deadline}
						todos={school.todos}
						rate={index + 1}
						user={user}
						completed={school.completed}
						// editOpen={editOpen} 
						// handleEditClose={handleEditClose}
					/>

				))}
			</div>
		</div>
	)
}

export default Schools