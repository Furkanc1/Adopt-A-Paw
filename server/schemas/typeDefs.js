const typeDefs = `
  type Query {
    users: [User!]!
    pets: [Pet!]!
  }

  type User {
    _id: ID!
    email: String!
    username: String!
    password: String!
    createdAt: String
    updatedAt: String
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

  input NewUserInput {
    email: String!
    username: String!
    password: String!
  }

  type Pet {
    _id: ID!
    power: Int
    name: String!
    ownerId: String
    species: String!
    creatorId: String!
    createdAt: String
    updatedAt: String
    publicImageURL: String
  }

  input NewPetInput {
    power: Int
    name: String!
    ownerId: String
    species: String!
    creatorId: String!
    publicImageURL: String
  }
 
  type Mutation {
    addPet(newPet: NewPetInput): Pet
  }

  type Mutation {
    updatePet(petId: ID!, update: UpdatePetInput): Pet
  }

  input UpdatePetInput {
    power: Int
    name: String
    species: String
    ownerId: String
    publicImageURL: String
  }

  type Mutation {
    deletePet(petId: ID!): DeletePetResponse
  }
  
  type DeletePetResponse {
    success: Boolean!
    message: String
    deletedPetId: ID
  }
`;

module.exports = typeDefs;