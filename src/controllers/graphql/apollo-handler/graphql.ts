import { ApolloServer, gql } from 'apollo-server-lambda';
import User from '../users/type-defs';
import { resolver as userResolver } from '../users/users.schema';
import { GQLContext } from 'types';
import { buildSubgraphSchema } from '@apollo/federation';
import merge from 'lodash.merge';

const schema = buildSubgraphSchema({
  typeDefs: [User],
  resolvers: merge(userResolver),
});

const services = {};

const server = new ApolloServer({
  schema,
  context: async ({ context, event }) =>
    ({
      reqHeaders: event.headers,
      services,
      cache: {},
    } as GQLContext),
});

export const handler = server.createHandler();
