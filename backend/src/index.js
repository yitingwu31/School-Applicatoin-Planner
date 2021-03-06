import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import School from './resolvers/School';
import Todo from './resolvers/Todo';
import User from './resolvers/User';
import Subscription from './resolvers/Subscription';

import mongo from './mongo';

const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        School,
        Todo,
        User
    },
    context: {
        db, 
        pubsub,
    },
});

mongo.connect();

server.start({ port: process.env.PORT | 5000 }, () => {
    console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});