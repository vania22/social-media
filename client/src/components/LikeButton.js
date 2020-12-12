import React, {useContext} from "react";
import classnames from "classnames";
import {useMutation} from "@apollo/client";

import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

import {TOGGLE_LIKE_QUERY} from "../utils/graphql-queries";
import {AuthContext} from "../context/AuthContext";

const LikeButton = ({classes, likes, likesCount, postId}) => {
    const {user: currentUser} = useContext(AuthContext)
    const hasUserLiked = !!likes.find(like => like.user._id === currentUser?._id)

    const [toggleLike] = useMutation(TOGGLE_LIKE_QUERY, {
        variables: {id: postId}
    })

    const onLikeClick = () => {
        if (!currentUser?._id) {
            return
        }
        toggleLike()
    }

    return (
        <IconButton onClick={onLikeClick}>
            <FavoriteIcon
                className={classnames(hasUserLiked ? classes.likeIconLiked : classes.icon, classes.likeIcon)}/>
            <span className={classes.count} style={{left: 30}}>{likesCount}</span>
        </IconButton>
    )
}

export default LikeButton
