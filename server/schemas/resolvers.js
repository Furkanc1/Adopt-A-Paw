const {  } = require('../models');

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
  Mutation: {
    // create the pet (through user)
    createPet: async (parent, args) => {
      const matchup = await matchup.create(args);
      return matchup;
    },

  },
};

module.exports = resolvers;
