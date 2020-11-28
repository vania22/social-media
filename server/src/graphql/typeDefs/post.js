import {gql} from 'apollo-server';

export const postDefs = gql`
    type Query {
        getPosts: [Post!]!
    }

    type Post {
        _id: ID!
        body: String!
        createdAt: String!
        username: String!
    }
`
