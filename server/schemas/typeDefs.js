const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    adoptedPets: [ID!]
  }

  type Pets {
    _id: ID!
    name: String!
    species: String!
    age: Int
    adopted: Boolean
    email: String!
  }

   type Auth{
    token: ID!
    user: User
   }
  type Query {
    Pet: [Pets]
    me:User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    logIn(email: String!, password: String!): Auth
    createPet(name: String!, species: String!, age: Int!, adopted: Boolean!, email: String!): User
    adoptPet(petId: ID!, userId: ID!): User
  }
`;

module.exports = typeDefs;
