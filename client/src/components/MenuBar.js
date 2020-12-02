import React, {useState} from 'react';
import {useLocation, Link} from 'react-router-dom'

import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

import classnames from 'classnames'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    appbar: {
        paddingLeft: 30,
        paddingRight: 30,
        '& a': {
            textDecoration: 'none'
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: '#fff',
        '& a, a:visited': {
            textDecoration: 'none',
            color: '#fff',
            display: 'flex'
        },
    },
    logo: {
        marginRight: 10,
        fontSize: 28
    },
    appButton: {
        color: '#fff',
        marginRight: 10,
    },
    appButtonActive: {
        background: '#fff',
        color: theme.palette.primary.main,
        '&:hover': {
            background: '#fff',
            color: theme.palette.primary.main,
        }
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const {pathname} = useLocation()

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        <Link to='/'>
                            <EmojiPeopleIcon className={classes.logo}/>
                            Socialize
                        </Link>
                    </Typography>

                    <Link to='/'>
                        <Button
                            name='Home'
                            className={classnames(classes.appButton, pathname === '/' && classes.appButtonActive)}
                        >
                            Home
                        </Button>
                    </Link>
                    <Link to='/login'>
                        <Button
                            name='Login'
                            className={classnames(classes.appButton, pathname === '/login' && classes.appButtonActive)}
                        >
                            Login
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}
