import merge from 'lodash.merge';

import {post} from "./post";
import {user} from "./user";
import {comment} from "./comments";

export const resolvers = merge(
    post,
    user,
    comment
);
