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

  input NewUserInput {
    email: String!
    username: String!
  }

  type Mutation {
    addUser(newUser: NewUserInput): User
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