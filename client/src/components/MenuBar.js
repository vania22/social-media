import React, {useState, useContext} from 'react';
import {useLocation, Link} from 'react-router-dom'

import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AddIcon from '@material-ui/icons/Add';

import classnames from 'classnames'

import {AuthContext} from "../context/AuthContext";
import CreatePostModal from "./CreatePostModal";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    appbar: {
        paddingLeft: 30,
        flexGrow: 1,
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
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottom: '1px solid #fff',
    },
    primaryButton: {
        background: '#fff',
        color: theme.palette.primary.main,
        margin: '0 10px',
        '&:hover': {
            background: '#fff',
            color: theme.palette.primary.main,
        }
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const {pathname} = useLocation()
    const {user, logout} = useContext(AuthContext)
    const [dialogOpen, setDialogOpen] = useState(false)

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
                    {user &&
                            <Button
                                className={classes.primaryButton}
                                startIcon={<AddIcon/>}
                                onClick={() => setDialogOpen(!dialogOpen)}
                            >
                                Create
                            </Button>
                    }

                    <Link to='/'>
                        <Button
                            name='Home'
                            className={classnames(classes.appButton, pathname === '/' && classes.appButtonActive)}
                        >
                            Home
                        </Button>
                    </Link>
                    {!user ?
                        <Link to='/login'>
                            <Button
                                name='Login'
                                className={classnames(classes.appButton, pathname === '/login' && classes.appButtonActive)}
                            >
                                Login
                            </Button>
                        </Link>
                        :
                        <>
                            <Link to='/user'>
                                <Button
                                    name='User'
                                    className={classnames(classes.appButton, pathname === '/user' && classes.appButtonActive)}
                                >
                                    My profile
                                </Button>
                            </Link>
                            <Link to='/'>
                                <Button
                                    name='Login'
                                    onClick={logout}
                                    className={classes.appButton}
                                >
                                    LogOut
                                </Button>
                            </Link>
                        </>
                    }
                </Toolbar>
            </AppBar>
            <CreatePostModal open={dialogOpen} handleClose={() => setDialogOpen(false)}/>
        </div>
    );
}
