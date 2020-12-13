import React, {useRef, useState} from 'react';
import {useQuery} from "@apollo/client";

import {FETCH_POSTS_QUERY} from "../utils/graphql-queries";

import Container from "@material-ui/core/Container";
import {Button, makeStyles, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
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
    },
    primaryButton: {
        background: '#fff',
        color: theme.palette.primary.main,
        marginLeft: 20,
        marginTop: 25,
        maxWidth: 200,
        '&:hover': {
            background: '#fff',
            color: theme.palette.primary.main,
        }
    },
}))

const Home = () => {
    const classes = useStyles()
    let skip = useRef(0)
    const {loading, data, fetchMore} = useQuery(FETCH_POSTS_QUERY, {
        variables: {skip: skip.current},
        onCompleted() {
            if(data.getPosts.length !== 9) {
                skip.current = data.getPosts.length
            }
        }
    })


    const loadMore = () => {
        fetchMore({variables: {skip: skip.current + 9}})
        skip.current += 9
        console.log(skip.current)
    }

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
                                <Grid item xl={4} md={4} key={post._id}>
                                    <PostCard post={post}/>
                                </Grid>
                            ))
                    }
                </Grid>
            </Grid>
            <Button
                className={classes.primaryButton}
                startIcon={<AddIcon/>}
                onClick={loadMore}
            >
                Load more
            </Button>
        </Container>
    )
}

export default Home
