import React, {useContext} from 'react';
import {useQuery} from "@apollo/client";
import gql from 'graphql-tag'

import Container from "@material-ui/core/Container";
import {makeStyles, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import PostCard from "../components/PostCard";
import PostCardSkeleton from "../components/PostCardSkeleton";
import {AlertContext} from "../context/AlertContext";

const useStyles = makeStyles(theme => ({
    container: {
        padding: '30px 30px',
        maxWidth: 1500
    },
    paper: {
        height: 140,
        width: 100,
    },
    pageTitle: {
        color: '#fff',
        marginBottom: 30
    }
}))

const Home = () => {
    const {loading, data} = useQuery(FETCH_POSTS_QUERY)
    const classes = useStyles()

    return (
        <Container className={classes.container} disableGutters={true}>
            <Typography variant='h3' className={classes.pageTitle}>Recent Posts</Typography>
            <Grid container direction="row" justify='center'>
                <Grid container justify="flex-start" spacing={2}>
                    {
                        loading ?
                            [1, 2, 3, 4].map((item) => (
                                <PostCardSkeleton key={item}/>
                            ))
                            :
                            data && data.getPosts.map(post => (
                                <PostCard post={post} key={post._id}/>
                            ))
                    }
                </Grid>
            </Grid>
        </Container>

    )
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
