import {gql} from 'apollo-server';

export const postDefs = gql`
    type Query {
        post: Post!
    }

    type Post {
        name: String!
    }
`
