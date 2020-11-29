import merge from 'lodash.merge';

import {post} from "./post";
import {user} from "./user";
import {comment} from "./comments";
import {like} from "./likes";

export const resolvers = merge(
    post,
    user,
    comment,
    like
);
