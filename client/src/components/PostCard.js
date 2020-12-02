import React from 'react';
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

import moment from 'moment'
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

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
    postFooterButton: {
        color: '#fff',
        marginLeft: 'auto',
        '& a, a:visited': {
            textDecoration: 'none',
            color: '#fff',
        },
    }
}))

const PostCard = ({post: {body, createdAt, commentsCount, likesCount, user, _id}}) => {
    const classes = useStyles()

    return (
        <Grid item xl={4} md={4}>
            <Card className={classnames(classes.root, classes.card)}>
                <CardHeader
                    className={classes.root}
                    avatar={
                        <Avatar className={classes.avatar} style={{backgroundColor: getRandomColor()}}>
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
                    <IconButton>
                        <FavoriteIcon className={classnames(classes.icon, classes.likeIcon)}/>
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

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export default PostCard
