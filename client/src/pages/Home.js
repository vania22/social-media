import React from 'react';
import {useQuery} from "@apollo/client";
import gql from 'graphql-tag'

const Home = () => {
    const {loading, data} = useQuery(FETCH_POSTS_QUERY)
    if (data) {
        console.log(data)
    }

    return <div>Home</div>
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            _id body createdAt likesCount commentsCount
            user {
                username
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

export default Home
