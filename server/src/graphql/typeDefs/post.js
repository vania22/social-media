import {gql} from 'apollo-server';

export const postDefs = gql`
    type Query {
        getPosts: [Post]!
        getPost(_id: ID!): Post!
    }

    type Mutation {
        createPost(body: String!): Post!
        deletePost(_id: ID!): Post!
    }

    type Post {
        _id: ID!
        body: String!
        createdAt: String!
        user: User!
        comments: [Comment]!
        commentsCount: Int!
        likes: [Like]!
        likesCount: Int!
    }
`
