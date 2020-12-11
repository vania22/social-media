import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {useMutation} from "@apollo/client";
import moment from 'moment'
import classnames from 'classnames'

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {CardHeader, makeStyles} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import {AuthContext} from "../context/AuthContext";
import {FETCH_POSTS_QUERY, TOGGLE_LIKE_QUERY} from "../utils/graphql-queries";
import {getUserColor} from "../utils/colorGenerator";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        '& .MuiTypography-colorTextSecondary': {
            color: '#fff'
        },
        '& .MuiCardHeader-title': {
            fontWeight: 'bold'
        },
        '& .MuiCardHeader-subheader': {
            color: theme.palette.primary.gray
        },
        '& .MuiCardHeader-root': {
            paddingBottom: 0
        }
    },
    avatar: {
        color: '#fff'
    },
    body: {
        height: 80,
        overflow: 'hidden',
        lineHeight: '1.5',
        display: '-webkit-box',
        '-webkit-line-clamp': 4,
        '-webkit-box-orient': 'vertical'
    },
    cardFooter: {
        position: 'relative',
        backgroundColor: '#3F88C5'
    },
    count: {
        position: 'absolute',
        fontSize: 12,
        color: '#fff',
        left: 39,
        top: 29,
    },
    icon: {
        color: '#fff'
    },
    likeIcon: {
        '&:hover': {
            color: '#e63946'
        }
    },
    likeIconLiked: {
        color: '#e63946'
    },
    postFooterButton: {
        color: '#fff',
        marginLeft: 'auto',
        '& a, a:visited': {
            textDecoration: 'none',
            color: '#fff',
        },
    }
}))

const PostCard = ({post: {body, createdAt, commentsCount, likesCount, likes, user, _id}}) => {
    const classes = useStyles()
    const {user: currentUser} = useContext(AuthContext)
    const hasUserLiked = !!likes.find(like => like.user._id === currentUser?._id)

    const [toggleLike] = useMutation(TOGGLE_LIKE_QUERY, {
        variables: {id: _id}
    })

    const onLikeClick = () => {
        if (!currentUser?._id) {
            return
        }
        toggleLike()
    }

    return (
        <Grid item xl={4} md={4}>
            <Card className={classnames(classes.root, classes.card)}>
                <CardHeader
                    className={classes.root}
                    avatar={
                        <Avatar className={classes.avatar} style={{backgroundColor: getUserColor(user._id)}}>
                            {user.username.charAt(0).toUpperCase()}
                        </Avatar>}
                    title={user.username}
                    subheader={moment(createdAt).fromNow()}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.body}>
                        {body}
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardFooter} disableSpacing>
                    <IconButton onClick={onLikeClick}>
                        <FavoriteIcon
                            className={classnames(hasUserLiked ? classes.likeIconLiked : classes.icon, classes.likeIcon)}/>
                        <span className={classes.count} style={{left: 30}}>{likesCount}</span>
                    </IconButton>
                    <IconButton>
                        <ChatIcon className={classes.icon}/>
                        <span className={classes.count}>{commentsCount}</span>
                    </IconButton>
                    <Button size="small" className={classes.postFooterButton}>
                        <Link to={`/post/${_id}`}>
                            Read more
                        </Link>
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default PostCard
