import { gql } from '@apollo/client';

export const CreateSchool = gql`
	mutation createSchool
	(
      $owner: String!,
      $name: String!,
      $deadline: String!
    )
	{
	createSchool(data:{
		owner:$owner
		name: $name
		deadline: $deadline
		})
		{
			id
			name
			deadline
			todos{
				id
				task
				deadline
				comment
				checkpoints
		}
	}	
	}
  }
`;

export const CreateUser = gql`
  mutation CreateUser
  (
	$name: String
  )
  {
	createUser(name:$name){
		id
		name
		schools{
		  name
		  deadline
		}
	  }
  }
`