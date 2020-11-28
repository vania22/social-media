import {gql} from 'apollo-server';

export const userDefs = gql`
    type Query {
        user: User!
    }
    
    type User {
        name: String!
    }
`
