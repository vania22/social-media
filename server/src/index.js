import {ApolloServer} from 'apollo-server'

import {dbConnection} from './database/database';
import User from "./database/models/User";
import Post from "./database/models/Post";
import {typeDefs} from "./graphql/typeDefs";
import {resolvers} from "./graphql/resolvers";

const startServer = async () => {
    // Connecting to Database
    await dbConnection();

    // Create Apollo server, set context to the object
    // with database models
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({
            User,
            Post
        })
    });

    // Start server
    server.listen({port: 5000})
        .then(res => console.log(`Server started at ${res.url}`))
}

startServer();



