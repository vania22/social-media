import React from 'react'
import {ApolloClient, InMemoryCache, createHttpLink, ApolloProvider} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

import App from './App';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
})

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                getPosts: {
                    keyArgs: false,
                    // Concatenate the incoming list items with
                    // the existing list items.
                    merge(existing = [], incoming) {
                        if(incoming.length === 1){
                            return [...incoming, ...existing]
                        }

                        return  [...existing, ...incoming]
                    },
                }
            }
        }
    }
})

const client = new ApolloClient( {
    link: authLink.concat(httpLink),
    cache
})

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)
