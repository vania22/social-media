import {mergeTypeDefs} from "@graphql-tools/merge";

import {userDefs} from "./user";
import {postDefs} from "./post";
import {commentsDefs} from "./comments";
import {likesDefs} from "./like";


export const typeDefs  = mergeTypeDefs([
    userDefs,
    postDefs,
    commentsDefs,
    likesDefs
])
