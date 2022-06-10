import 'reflect-metadata';
import { ApolloServer, gql } from 'apollo-server-lambda';
import { UserResolver as userResolver } from '../resolvers/users/user.resolver';
import { GQLContext } from 'types';
import { buildSubgraphSchema } from '@apollo/federation';
import merge from 'lodash.merge';
import { services } from '../../../services/services';
import { buildSchema } from 'type-graphql';

const schema = await buildSchema({
  resolvers: [userResolver],
  validate: false
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
