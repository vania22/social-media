import React from 'react';
import {useQuery} from "@apollo/client";

import {FETCH_POSTS_QUERY} from "../utils/graphql-queries";

import Container from "@material-ui/core/Container";
import {makeStyles, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import PostCard from "../components/PostCard";
import PostCardSkeleton from "../components/PostCardSkeleton";

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

export default Home
