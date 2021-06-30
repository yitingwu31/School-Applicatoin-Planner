import { gql } from '@apollo/client';

export const TODO_SUBSCRIPTION = gql`
    subscription todo (
        $user: String!
    ) {
        todo (
            user: $user
        ) {
            mutation
            data {
                key
                task
                deadline
            }
        }
    }
`;