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
        }
    }
`