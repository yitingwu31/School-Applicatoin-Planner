import { gql } from '@apollo/client';

export const COMPLETE_SCHOOL_MUTATION = gql`
    mutation completeSchool (
        $key: String!
    ) {
        completeSchool (
            key: $key
        )
    }
`;

export const COMPLETE_TODO_MUTATION = gql`
    mutation completeTodo (
        $user: String!
        $school: String!
        $task: String!
    ) {
        completeTodo (
            user: $user
            school: $school
            task: $task
        )
    }
`;

export const COMPLETE_CHECKPOINT_MUTATION = gql`
    mutation completeCheckpoint (
        $user: String!
        $school: String!
        $task: String!
        $content: String!
    ) {
        completeCheckpoint (
            user: $user
            school: $school
            task: $task
            content: $content
        )
    }
`;


export const CREATE_USER_MUTATION = gql`
	mutation CreateUser($name: String, $password: String){
		createUser(
            name:$name,
            password:$password
        ){
            id
            name
            password
            schools
        }
  }
`;

export const CREATE_SCHOOL_MUTATION = gql`
	mutation createSchool(
			$owner: String!,
      		$name: String!,
      		$deadline: String!
		){
		createSchool(data:{
				owner: $owner
				name:$name
				deadline:$deadline
			}){
				name
				deadline
				todos{
					id
					key
					task
					deadline
					comment
					checkpoints{
						id
						key
						content
						time
						completed
					}
					completed
				}
				completed
			}
		}
`;

export const CREATE_TODO_MUTATION = gql`
	mutation createTodo(
		$owner:String!,
		$school:String!,
		$task:String!,
		$deadline:String!,
		$comment:String
	){
	createTodo(
		owner: $owner
		school: $school
		data: {
			task:$task
			deadline:$deadline
			comment:$comment
		}
	)
	{
		id
		key
		task
		deadline
		comment
		checkpoints{
			id
			key
			content
			time
			completed
		}
		completed
	}
	}	
`;

export const CREATE_CHECKPOINT_MUTATION = gql`
	mutation createCheckpoint(
		$owner:String!,
		$school:String!,
		$task:String!,
		$content:String!,
		$time:String!
	){
	createCheckpoint(
		owner:$owner
		school:$school
		task:$task
		data:{
			content: $content
			time: $time
		}
	)
	{
		id
		key
		content
		time
		completed
	}
	}
`;

export const UPDATE_SCHOOL_MUTATION = gql`
	mutation updateSchool(
		$user: String!, 
		$school: String!, 
		$date: String!
	){
		updateSchool(
			user: $user
			school: $school
			date: $date
		)
	}
`;

export const UPDATE_TODO_MUTATION = gql`
	mutation updateTodo(
		$user: String!, 
		$school: String!, 
		$task: String!, 
		$date: String!
	){
		updateTodo(
			user: $user
			school: $school
			task: $task
			date: $date
		)
	}
`;

export const UPDATE_CHECKPOINT_MUTATION = gql`
	mutation updateCheckpoint(
		$user: String!, 
		$school: String!, 
		$task: String!, 
		$content: String!,
		$date: String!,
	){
		updateCheckpoint(
			user: $user
			school: $school
			task: $task
			content: $content
			date: $date
		)
	}
`;