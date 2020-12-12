import React, {useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from "@apollo/client";

import {makeStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";

import Comment from "../components/Comment";
import PostCard from "../components/PostCard";
import AddCommentSection from "../components/AddCommentSection";
import {AuthContext} from "../context/AuthContext";
import {GET_POST_QUERY} from "../utils/graphql-queries";

const useStyles = makeStyles(theme => ({
    container: {
        padding: '30px 120px',
        maxWidth: 1500
    },
    spinner: {
        position: 'absolute',
        top: 300,
        left: '50%',
        color: '#fff'
    },
    primaryButton: {
        background: '#fff',
        color: theme.palette.primary.main,
        marginLeft: 20,
        marginTop: 25,
        '&:hover': {
            background: '#fff',
            color: theme.palette.primary.main,
        }
    }
}))

const SinglePost = () => {
    const {user} = useContext(AuthContext)
    const classes = useStyles()
    const {postId} = useParams()
    const {loading, data} = useQuery(GET_POST_QUERY, {
        variables: {id: postId}
    })
    // Destructuring getPost to post variable for accessibility purpose
    let post = data?.getPost

    if (loading) {
        return (
            <CircularProgress size={60} className={classes.spinner}/>
        )
    }

    return (
        <Container className={classes.container} disableGutters={true}>
            <PostCard post={post} single/>
            {post.comments.length === 0
                ? <Typography variant='h4' style={{color: '#fff', marginTop: 40}}>
                    No comments yet
                </Typography>
                :
                <>
                    <Typography variant='h4' style={{color: '#fff', marginTop: 40}}>
                        Comments
                    </Typography>
                    <List>
                        {post.comments.map(comment => <Comment comment={comment} key={comment._id}/>)}
                    </List>
                </>
            }
            {user && <AddCommentSection postId={postId}/>}
        </Container>
    )
}

export default SinglePost
