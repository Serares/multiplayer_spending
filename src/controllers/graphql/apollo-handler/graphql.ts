import { ApolloServer, gql } from 'apollo-server-lambda';
import User from '../users/type-defs';
import { resolver as userResolver } from '../users/users.schema';
import { GQLContext } from 'types';
import { buildSubgraphSchema } from '@apollo/federation';
import merge from 'lodash.merge';
import { services } from '../../../services/services';
import { buildSchema } from 'type-graphql';

const schema = await buildSchema({
  typeDefs: [User],
  resolvers: merge(userResolver),
});

const server = new ApolloServer({
  schema,
  context: async ({ context, event }) =>
    ({
      reqHeaders: event.headers,
      services,
      cache: {},
      identity: context.identity,
    } as GQLContext),
});

export const handler = server.createHandler();
