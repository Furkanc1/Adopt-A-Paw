const typeDefs = `
  type Query {
    users: [User!]!
    pets: [Pet!]!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  input NewUserInput {
    email: String!
    username: String!
    password: String!
  }

  type Mutation {
    addUser(newUser: NewUserInput): User
  }

  type Mutation {
    signIn(email: String!, password: String!): AuthPayload
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Pet {
    _id: ID!
    name: String!
    species: String!
    age: Int
    adopted: Boolean
    publicImageURL: String
    ownerId: String
    creatorId: String!
  }
`;

module.exports = typeDefs;