import { gql } from '@apollo/client';

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