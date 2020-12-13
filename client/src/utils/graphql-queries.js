import gql from "graphql-tag";

export const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
    ) {
        register(
            input: {
                username: $username
                email: $email
                password: $password
            }
        ){
            _id
            email
            username
            createdAt
            token
        }
    }
`

export const LOGIN_USER = gql`
    mutation login(
        $password: String!
        $email: String!
    ) {
        login(
            input: {
                password: $password
                email: $email
            }
        ){
            _id
            email
            username
            createdAt
            token
        }
    }
`

export const FETCH_POSTS_QUERY = gql`
    query getPosts($skip: Int!)
    {
        getPosts(skip: $skip){
            _id body createdAt likesCount commentsCount
            user {
                username
                _id
            }
            likes {
                user {
                    username
                    _id
                }
            }
            comments {
                _id
                body
                user {
                    _id
                    username
                }
            }
        }
    }
`

export const CREATE_POST_QUERY = gql`
    mutation createPost(
        $body: String!
    ) {
        createPost(body: $body) {
            _id body createdAt likesCount commentsCount
            user {
                username
                _id
            }
            likes {
                user {
                    username
                    _id
                }
            }
            comments {
                _id
                body
                user {
                    _id
                    username
                }
            }
        }
    }
`

export const TOGGLE_LIKE_QUERY = gql`
    mutation toggleLike($id: ID!){
        toggleLike(postId: $id){
            _id likesCount
            likes {
                user {
                    username
                    _id
                }
            }
        }
    }
`

export const GET_POST_QUERY = gql`
    query getPost($id: ID!){
        getPost(_id: $id){
            _id body createdAt likesCount commentsCount
            user {
                username
                _id
            }
            likes {
                user {
                    username
                    _id
                }
            }
            comments {
                _id
                body
                user {
                    username
                    _id
                    createdAt
                }
            }
        }
    }
`

export const CREATE_COMMENT_QUERY = gql`
    mutation createComment(
        $postId: ID!
        $body: String!
    ) {
        createComment(
            input: {
                postId: $postId
                body: $body
            }
        ){
            _id commentsCount
            comments {
                _id
                body
                createdAt
                user {
                    _id
                    username
                }
            }
        }
    }
`
