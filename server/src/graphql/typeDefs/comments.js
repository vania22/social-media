import {gql} from 'apollo-server';

export const commentsDefs = gql`    
    type Mutation {
        createComment(input: createCommentInput!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
    }

    type Comment {
        _id: ID!
        body: String!
        createdAt: String!
        user: User!
    }
    
    input createCommentInput {
        postId: ID!
        body: String!
    }
`
