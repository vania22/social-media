import React from 'react'

import Avatar from "@material-ui/core/Avatar";
import {getUserColor} from "../utils/colorGenerator";

const UserAvatar = ({userId, username}) => {

    return (
        <Avatar
            style={{backgroundColor: getUserColor(userId), color: '#fff'}}>
            {username.charAt(0).toUpperCase()}
        </Avatar>
    )
}

export default UserAvatar
