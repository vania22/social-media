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
    {
        getPosts{
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
                }
            }
            comments {
                _id
                body
                user {
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
