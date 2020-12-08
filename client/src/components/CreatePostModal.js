import React, {useContext} from 'react'
import {useMutation} from "@apollo/client";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core";

import {AlertContext} from "../context/AlertContext";
import {CREATE_POST_QUERY, FETCH_POSTS_QUERY} from "../utils/graphql-queries";

// Slider component used to make a slider animation for Dialog
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    root: {
        color: '#fff',
    },
    dialogTitle: {
        color: '#fff'
    },
    input: {
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
    },
    postButton: {
        color: '#fff',
        backgroundColor: '#3F88C5',
        '&:hover': {
            color: '#fff',
            backgroundColor: '#3F88C5',
            opacity: '0.8'
        }
    }
}))

const CreatePostModal = ({handleClose, open}) => {
    const classes = useStyles()

    const CHARACTER_LIMIT = 255;
    const [values, setValues] = React.useState({
        body: ''
    });

    const {setAlert} = useContext(AlertContext)

    const [createPost, {loading}] = useMutation(CREATE_POST_QUERY, {
            variables: values,
            update(cache, result) {
                // Getting data from cache
                const data = cache.readQuery({
                    query: FETCH_POSTS_QUERY,
                });

                // Updating posts from cache by adding newly created post
                cache.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: {
                        getPosts: [result.data.createPost, ...data.getPosts],
                    },
                });
            }
        }
    )

    const onPostCreate = () => {
        if (values.body.trim()) {
            createPost()
            handleClose()
        } else {
            setAlert("Post can't have empty body", 'error')
        }
    }

    const handleChange = event => {
        setValues({...values, [event.target.name]: event.target.value});
    };

    return (
        <Dialog
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            open={open}
            className={classes.root}
            PaperProps={{style: {width: 600}}}
        >
            <DialogTitle id="alert-dialog-slide-title" className={classes.dialogTitle}>Create new
                post</DialogTitle>
            <DialogContent>
                <TextField
                    label="Content"
                    multiline
                    fullWidth
                    name='body'
                    rows={6}
                    variant="filled"
                    className={classes.input}
                    value={values.body}
                    onChange={(e) => handleChange(e)}
                    helperText={`${values.body.length}/${CHARACTER_LIMIT}`}
                    inputProps={{
                        maxLength: CHARACTER_LIMIT
                    }}
                />
            </DialogContent>
            <DialogActions style={{padding: '8px 24px', paddingBottom: '20px'}}>
                <Button
                    className={classes.postButton}
                    onClick={onPostCreate}
                    disabled={loading}
                >
                    Post!
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreatePostModal;
