import {ApolloServer} from 'apollo-server'
import dotenv from 'dotenv'

import {dbConnection} from './database/database';
import User from "./database/models/User";
import Post from "./database/models/Post";
import {typeDefs} from "./graphql/typeDefs";
import {resolvers} from "./graphql/resolvers";

// Loading .env file
dotenv.config();

const startServer = async () => {
    // Connecting to Database
    await dbConnection();

    // Create Apollo server, set context to the object
    // with database models
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: (req) => ({
            ...req,
            User,
            Post
        })
    });

    // Start server
    server.listen({port: 5000})
        .then(res => console.log(`Server started at ${res.url}`))
}

startServer();



