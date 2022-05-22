import { ApolloServer, gql } from 'apollo-server-lambda';
import User from '../users/type-defs';
import { resolver as userResolver } from '../users/users.schema';
import { GQLContext } from 'types';
import { buildSubgraphSchema } from '@apollo/federation';
import merge from 'lodash.merge';
// Construct a schema, using GraphQL schema language

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers, csrfPrevention: true });

export const handler = server.createHandler();
