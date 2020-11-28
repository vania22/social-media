import {mergeTypeDefs} from "@graphql-tools/merge";

import {userDefs} from "./user";
import {postDefs} from "./post";


export const typeDefs  = mergeTypeDefs([userDefs, postDefs])
