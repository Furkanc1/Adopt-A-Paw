// const { gql } = require(`apollo-server`);

const typeDefs = `
  type Query {
    users: [User!]!
    pets: [Pet!]!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Pet {
    _id: ID!
    name: String!
    species: String!
    age: Int
    adopted: Boolean
  }
`;

module.exports = typeDefs;