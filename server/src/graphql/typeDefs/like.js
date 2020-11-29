import {gql} from 'apollo-server';

export const likesDefs = gql`
    type Mutation {
        toggleLike(postId: ID!): Post!
    }

    type Like {
        _id: ID!
        createdAt: String!
        user: User!
    }
`
