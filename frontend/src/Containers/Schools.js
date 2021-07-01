import School_grid from '../Components/SchoolGrid'
import { useQuery } from '@apollo/react-hooks';
import { USER_SCHOOL_QUERY, SCHOOL_SUBSCRIPTION } from '../graphql';
import { useState, useEffect } from 'react';
import { compareTime } from '../utils';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const font = ['Quicksand', 'sans-serif'].join(',');

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: font,
    height: '60px',
    fontSize: '25px',
    paddingTop: '15px'
  }
}));

const Schools = ({ user }) => {
  const classes = useStyles();
  const [schools, setSchools] = useState([]);
  const { loading, error, data, subscribeToMore } = useQuery(USER_SCHOOL_QUERY, {
    variables: {
      user: user
    },
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    if (loading) console.log("Loading...");
    if (error) console.log("Error: ", error);
    if (!loading && !error) {
      const schoolList = data.userSchool;
      let sortedSchools = schoolList.slice();
      sortedSchools.sort((a, b) => compareTime(a, b));
      console.log('sortedSchools in School.js: ',sortedSchools)
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
          if (subscriptionData.data.school.mutation === 'UPDATED') {
            for (let i = 0; i < prev.userSchool.length; i++) {
              if (prev.userSchool[i].name === newSchool.name) {
                newlist.push(newSchool);
              } else {
                newlist.push(prev.userSchool[i]);
              }
            }
          } else {
            newlist = [newSchool, ...prev.userSchool];
          }
          newlist.sort((a, b) => compareTime(a, b));
          setSchools([...newlist]);

					return {
						...prev,
						schools: [...newlist],
					}
				}
			})
		} catch (e) { console.log(e) }
	}, [subscribeToMore]);

  return (
      <div className='Calendar'>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.title}
        >
          {user}'s Candidate Schools
        </Typography>
          <div>
            {schools.map((school, index) => (
              <School_grid 
                key = {index}
                name = {school.name}
                date = {school.deadline}
                todos = {school.todos}
                rate = {index + 1}
                user = {user}
                completed = {school.completed}
              />
            ))}
          </div>
      </div>
  )
}

export default Schools