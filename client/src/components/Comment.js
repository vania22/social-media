import React from 'react'

import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import UserAvatar from "./UserAvatar";

const Comment = ({comment}) => {
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <UserAvatar userId={comment.user._id} username={comment.user.username}/>
                </ListItemAvatar>
                <ListItemText
                    style={{color: '#fff'}}
                    primary={comment.user.username}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                style={{color: '#fff'}}
                            >
                                {comment.body}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" style={{backgroundColor: '#fff'}}/>
        </>
    )
}

export default Comment
