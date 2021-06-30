import { gql } from '@apollo/client';

export const CALENDARMONTH_QUERY = gql`
    query allByDate(
        $user: String!
        $year: Int!
        $month: Int!
    ) {
        allByDate(
            user: $user
            year: $year
            month: $month
        ) {
            type
            context
            deadline
            completed
        }
    }
`

export const USER_SCHOOL_QUERY = gql`
    query userSchool (
        $user: String!
    ) {
        userSchool (
            user: $user
        ) {
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
`