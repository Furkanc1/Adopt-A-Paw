const { Pet, User } = require('./index');

const resolvers = {
  Query: {
    users: async () => {
      let users = await User.find();
      return users;
    },
    pets: async () => {
      let pets = await Pet.find();
      return pets;
   }
  }
}

module.exports = resolvers;