import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
	mutation CreateUser($name: String){
		createUser(name:$name)
  }
`

export const CREATE_SCHOOL_MUTATION = gql`
	mutation createSchool(
			$owner: String!,
      		$name: String!,
      		$deadline: String!
		){
		createSchool(
			data:{
				owner: $owner
				name:$name
				deadline:$deadline
			})
			{
				id
				key
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
		$comment:String!
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
	# {
	# 	id
	# 	key
	# 	task
	# 	deadline
	# 	comment
	# 	checkpoints{
	# 		id
	# 		key
	# 		content
	# 		time
	# 		completed
	# 	}
	# 	completed
	# }
	}	
`

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
	# {
	# 	id
	# 	key
	# 	content
	# 	time
	# 	completed
	# }
	}
	

`