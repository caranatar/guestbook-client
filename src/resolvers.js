import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Query {
    accessToken: String!
  }
`;

export const resolvers = {};
