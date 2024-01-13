const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pet, User } = require('./index');

const resolvers = {
  Mutation: {
    signIn: async (_, { email, password }) => {
      try {
        let userToSignIn = await User.findOne({ email });

        // If User is not Found or Wrong Password from Bcrypt
        if (!userToSignIn || !bcrypt.compareSync(password, userToSignIn.password)) {
          throw new Error (`Invalid Credentials`);
        }

        let token = jwt.sign({ userId: userToSignIn._id }, `secret-key`, { expiresIn: '1h' });

        return {
          token,
          user: userToSignIn
        };
      } catch {
        throw new Error(`Error Signing In: ${error.message}`);
      }
    },
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
    addPet: async (_, { newPet }) => {
      try {
        const petToSave = new Pet(newPet);
        await petToSave.validate();
        const savedPet = await petToSave.save();
        return savedPet;
      } catch (error) {
        throw new Error(`Error Adding Pet: ${error.message}`);
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