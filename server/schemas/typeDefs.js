// Prupose: Define the typeDefs for the GraphQL schema
const { GraphQLScalarType, Kind } = require("graphql");

const typeDefs = `
  type Auth {
    token: ID!
    user: User
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    coronationPoints: Int
  }

  type Query {
    users: [User]
    user(_id: ID!): User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
    loginUser(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
