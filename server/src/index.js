import {ApolloServer} from 'apollo-server'

import {dbConnection} from './database/database';
import {typeDefs} from "./graphql/typeDefs";
import {resolvers} from "./graphql/resolvers";

const startServer = async () => {
    // Connect to DB - returns Database instance
    const db = await dbConnection();

    // Create Apollo server, context = database instance
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({db})
    });

    // Start server
    server.listen({port: 5000})
        .then(res => console.log(`Server started at ${res.url}`))
}

startServer();



