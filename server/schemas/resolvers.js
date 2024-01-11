const { Pet, User } = require('./index');

const resolvers = {
  Mutation: {
    addUser: async (_, { newUser }) => {
      try {
        const userToSave = new User(newUser);
        await userToSave.validate();
        const savedUser = await userToSave.save();
        return savedUser;
      } catch (error) {
        throw new Error(`Error Adding User: ${error.message}`);
      }
    },
  },
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