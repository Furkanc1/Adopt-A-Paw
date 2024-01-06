// const { Query, Mutation } = require('../models');
const { Pet, User } = require('./');

// @Resolver()
// export class FooResolver {

//   @Query()
//   sayHello() {
//     return 'Hello World!';
//   }
// }

const resolvers = {
  // get all pets (to put onto main page)
  // Query: {
  //   tech: async () => {
  //     return Tech.find({});
  //   },
  //   matchups: async (parent, { _id }) => {
  //     const params = _id ? { _id } : {};
  //     console.log(`id`, _id)
  //     return Matchup.find(params);
  //   },
  // },
  Query: {
    User: async () => {
      return User.find({});
    },
    Pet: async () => {
      return Pet.find({});
    },
    // other queries...
  },
  Mutation: {
    createPet: async (parent, args) => {
      // Change from matchup to Pet here
      const pet = await Pet.create(args);
      return pet;
    },
  },
  
};

module.exports = resolvers;