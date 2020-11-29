import {gql} from 'apollo-server';

export const userDefs = gql`
    type Query {
        me: User!
    }
    
    type Mutation {
        register(input: RegisterInput): User!
        login(input: LoginInput): User!
    }
    
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        token: String!
        createdAt: String!
    }
    
    input RegisterInput {
        username: String!
        password: String!
        email: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }
`
