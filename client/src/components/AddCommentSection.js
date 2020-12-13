import React, {useContext, useState} from 'react'
import {useMutation} from "@apollo/client";

import TextField from "@material-ui/core/TextField";
import {Button, makeStyles} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import {CREATE_COMMENT_QUERY} from "../utils/graphql-queries";
import {AlertContext} from "../context/AlertContext";

const useStyles = makeStyles(theme => ({
    commentsSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
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
    input: {
        marginTop: 30,
        '& label': {
            color: '#fff !important'
        },
        '& ::before': {
            borderColor: '#fff'
        },
        '& textarea': {
            color: '#fff'
        },
        '& p': {
            color: '#fff',
            textAlign: 'right',
            marginTop: 10
        }
    }
}))

const AddCommentSection = ({postId}) => {
    const classes = useStyles()
    const {setAlert} = useContext(AlertContext)
    const [body, setBody] = useState('')
    const CHARACTER_LIMIT = 255;

    const [createComment] = useMutation(CREATE_COMMENT_QUERY, {
        variables: {postId, body}
    })

    const onCreateComment = () => {
        if (body.trim()) {
            createComment().catch(e => setAlert(e.message, 'error'))
            setBody('')
        } else {
            setAlert("Comment can't be empty", 'error')
        }
    }

    return (
        <div className={classes.commentsSection}>
            <TextField
                label="Comment"
                multiline
                fullWidth
                name='body'
                rows={6}
                variant="filled"
                className={classes.input}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                helperText={`${body.length}/${CHARACTER_LIMIT}`}
                inputProps={{
                    maxLength: CHARACTER_LIMIT
                }}
            />
            <Button
                className={classes.primaryButton}
                startIcon={<AddIcon/>}
                onClick={onCreateComment}
            >
                Add Comment
            </Button>
        </div>
    )
}

export default AddCommentSection
