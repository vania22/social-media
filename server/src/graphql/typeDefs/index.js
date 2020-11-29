import {mergeTypeDefs} from "@graphql-tools/merge";

import {userDefs} from "./user";
import {postDefs} from "./post";
import {commentsDefs} from "./comments";


export const typeDefs  = mergeTypeDefs([
    userDefs,
    postDefs,
    commentsDefs
])
