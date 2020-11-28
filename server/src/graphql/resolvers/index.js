import merge from 'lodash.merge';

import {post} from "./post";
import {user} from "./user";

export const resolvers = merge(post, user);
