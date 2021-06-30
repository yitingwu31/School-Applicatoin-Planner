import { gql } from '@apollo/client';

export const SCHOOL_SUBSCRIPTION = gql`
    subscription school (
        $user: String!
    ) {
        school (
            user: $user
        ) {
            mutation
            data {
                name
                deadline
                key
                completed
                todos {
                    key
                    task
                    deadline
                    completed
                    checkpoints {
                        key
                        content
                        time
                        completed
                    }
                }
            }
        }
    }
`