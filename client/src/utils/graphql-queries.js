import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            _id body createdAt likesCount commentsCount
            user {
                username
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
