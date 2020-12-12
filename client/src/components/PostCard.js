import React from 'react';
import {Link} from "react-router-dom";
import moment from 'moment'
import classnames from 'classnames'

import Card from "@material-ui/core/Card";
import {CardHeader, makeStyles} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import ChatIcon from '@material-ui/icons/Chat';
import Button from "@material-ui/core/Button";

import LikeButton from "./LikeButton";
import UserAvatar from "./UserAvatar";

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

const PostCard = ({post: {body, createdAt, commentsCount, likesCount, likes, user, _id}, single}) => {
    const classes = useStyles()

    return (
        <Card className={classnames(classes.root, classes.card)}>
            <CardHeader
                className={classes.root}
                avatar={<UserAvatar userId={user._id} username={user.username}/>}
                title={user.username}
                subheader={moment(createdAt).fromNow()}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.body}>
                    {body}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardFooter} disableSpacing>
                <LikeButton classes={classes} postId={_id} likesCount={likesCount} likes={likes}/>
                <IconButton>
                    <ChatIcon className={classes.icon}/>
                    <span className={classes.count}>{commentsCount}</span>
                </IconButton>
                {!single
                    ? <Button size="small" className={classes.postFooterButton}>
                        <Link to={`/post/${_id}`}>
                            Read more
                        </Link>
                    </Button>
                    : null
                }
            </CardActions>
        </Card>
    )
}

export default PostCard
