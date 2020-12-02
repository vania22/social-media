import React, {useState} from 'react';
import validator from 'validator';
import classnames from 'classnames'
import {Link} from 'react-router-dom';
import gql from "graphql-tag";
import {useMutation} from '@apollo/client'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from "@material-ui/core/CircularProgress";


function Copyright() {
    const classes = useStyles();
    return (
        <Typography variant="body2" color='secondary' align="center">
            Copyright ©
            <Link to="https://socialize.com/" className={classes.link}>
                Socialize{' '}
            </Link>
            {new Date().getFullYear()}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#e8e8e8',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.light,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        position: 'relative',
        zIndex: 0
    },
    formLoading: {
        opacity: '0.8'
    },
    input: {
        '& label': {
            color: '#fff'
        },
        '& ::before': {
            borderColor: '#fff'
        },
        '& input': {
            color: '#fff'
        }
    },
    checkbox: {
        color: '#fff',
        '& svg': {
            color: '#fff'
        }
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        textDecoration: 'none',
        color: '#fff',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    loader: {
        position: 'absolute',
        top: '15%',
        left: '45%',
        zIndex: 10,
        color: theme.palette.secondary.light
    }
}));

export default function Login({register}) {
    const classes = useStyles(register);
    const [values, setValues] = useState({username: '', email: '', password: ''})
    const [error, setError] = useState({})

    const onInputChange = (e) => {
        setError({})
        setValues((prevState => ({...prevState, [e.target.name]: e.target.value})))
    }

    const [registerUser, {loading: registerLoading}] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(result)
        },
        variables: values
    })

    const [loginUser, {loading: loginLoading}] = useMutation(LOGIN_USER, {
        update(proxy, result) {
            console.log(result)
        },
        variables: values
    })

    const onSubmit = (e) => {
        e.preventDefault()

        // Clear errors object
        setError(false)

        // Field validations
        if (register && !values.username.trim()) {
            setError((prev) => ({...prev, username: 'Please provide a valid username'}))
            return
        } else if (!values.email.trim() || !validator.isEmail(values.email)) {
            setError((prev) => ({...prev, email: 'Please provide a valid email'}))
            return
        } else if (!values.password.trim()) {
            setError((prev) => ({...prev, password: 'Please provide a valid password'}))
            return
        }

        // If prop "register" === true, then execute registerUser query, else - execute loginUser
        if (register) {
            registerUser()
                .then(({data}) => {
                    console.log(data)
                })
                .catch((e) => {
                    if (e.message.includes('email')) {
                        setError((prevState => ({...prevState, email: e.message})))
                    } else if (e.message.includes('username')) {
                        setError((prevState => ({...prevState, username: e.message})))
                    }
                })
        } else {
            loginUser()
                .then(({data}) => {
                    console.log(data)
                })
                .catch((e) => {
                    setError((prevState => ({...prevState, email: e.message, password: e.message})))
                })
        }
    }

    return (
        <Grid container component="main" className={classes.root} style={{height: 'calc(100vh - 64px)'}}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} xl={8} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} xl={4} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon color='secondary'/>
                    </Avatar>
                    <Typography component="h1" variant="h5" color='secondary'>
                        {register ? 'Sign Up' : 'Sign In'}
                    </Typography>
                    <form
                        className={classnames(classes.form, registerLoading || loginLoading ? classes.formLoading : null)}
                        noValidate
                        color='secondary'
                        onSubmit={e => onSubmit(e)}
                    >
                        {register &&
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            autoFocus
                            noValidate
                            name="username"
                            label="Username"
                            type="text"
                            id="username"
                            autoComplete="off"
                            className={classes.input}
                            color='secondary'
                            value={values.username}
                            onChange={(e) => onInputChange(e)}
                            error={!!error.username}
                            helperText={error.username}
                        />
                        }
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="off"
                            noValidate
                            autoFocus={!register}
                            color='secondary'
                            className={classes.input}
                            value={values.email}
                            onChange={(e) => onInputChange(e)}
                            error={!!error.email}
                            helperText={error.email}
                        />
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            noValidate
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="off"
                            className={classes.input}
                            color='secondary'
                            value={values.password}
                            onChange={(e) => onInputChange(e)}
                            error={!!error.password}
                            helperText={error.password}
                        />
                        {!register &&
                        <FormControlLabel
                            control={<Checkbox value="remember" color="secondary"/>}
                            label="Remember me"
                            color='secondary'
                            className={classes.checkbox}
                        />
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!!error.email || !!error.password}
                        >
                            {register ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <Grid container>
                            {register ?
                                <Grid item>
                                    <Link to="/login" className={classes.link}>
                                        Have an account? Sign In
                                    </Link>
                                </Grid>
                                :
                                <Grid item>
                                    <Link to="/register" className={classes.link}>
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                            }

                        </Grid>
                        <Box mt={5}>
                            <Copyright/>
                        </Box>
                        {loginLoading || registerLoading ?
                            <CircularProgress color="secondary" size={50} className={classes.loader}/>
                            : null
                        }
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

const REGISTER_USER = gql`
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

const LOGIN_USER = gql`
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
