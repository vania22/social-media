import React, {useState} from 'react';
import validator from 'validator';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
    return (
        <Typography variant="body2" color='secondary' align="center">
            Copyright ©
            <Link color="inherit" href="https://socialize.com/">
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
}));

export default function Login({register}) {
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({})

    const onSubmit = (e) => {
        e.preventDefault()

        // Clear errors object
        setError(false)

        // Field validations
        if(!email.trim() || !validator.isEmail(email)) {
            setError((prev) => ({...prev, email: 'Please provide a valid email'}))
            return
        } else if(!password.trim()){
            setError((prev) => ({ ...prev, password: 'Please provide a valid password'}))
            return
        }

        console.log('hello')
    }

    const onEmailChange = (e) => {
        setError({})
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setError({})
        setPassword(e.target.value)
    }

    return (
        <Grid container component="main" className={classes.root} style={{height: 'calc(100vh - 64px)'}}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} xl={8} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} xl={4} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon color='secondary' />
                    </Avatar>
                    <Typography component="h1" variant="h5" color='secondary'>
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate color='secondary' onSubmit={e => onSubmit(e)}>
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="off"
                            autoFocus
                            color='secondary'
                            className={classes.input}
                            value={email}
                            onChange={(e) => onEmailChange(e)}
                            error={!!error.email}
                            helperText={error.email}
                        />
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            className={classes.input}
                            color='secondary'
                            value={password}
                            onChange={(e) => onPasswordChange(e)}
                            error={!!error.password}
                            helperText={error.password}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="secondary" />}
                            label="Remember me"
                            color='secondary'
                            className={classes.checkbox}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!!error.email || !!error.password}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" color='secondary'>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" color='secondary'>
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
