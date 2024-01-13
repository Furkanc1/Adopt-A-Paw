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
    createdAt: String
    updatedAt: String
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
    createdAt: String
    updatedAt: String
  }

  input NewUserInput {
    email: String!
    username: String!
    password: String!
  }

  input NewPetInput {
    name: String!
    species: String!
    age: Int
    adopted: Boolean
    creatorId: String!
  }

  type Mutation {
    addUser(newUser: NewUserInput): User
  }
 
  type Mutation {
    addPet(newPet: NewPetInput): Pet
  }

  type Mutation {
    signIn(email: String!, password: String!): AuthPayload
  }

  type AuthPayload {
    token: String
    user: User
  }
`;

module.exports = typeDefs;