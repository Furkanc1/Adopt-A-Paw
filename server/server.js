const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');

const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const db = require('./config/connection');
// const { User, Pet } = require('./schemas');

const PORT = process.env.PORT || 3001;
const app = express();

// Replace this whatever deployment service we use
// export const liveLink = `http://adoptapet.com`;
// export const origin = process.env.NODE_ENV === 'production' ? liveLink : `http://localhost:3000`;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // If you need to include cookies or authorization headers
}));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server));

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  } 

  app.get('/', (req, res) => {
    res.send(`Adopt-A-Pet Server`);
  });
  
  // Using Mongo / Mongoose
  // app.get('/users', async (req, res) => {
  //   try {
  //     const users = await User.find();
  //     res.json(users);
  //   } catch (error) {
  //     res.status(500).send(`Error getting users`, error);
  //   }
  // });

  // app.get('/pets', async (req, res) => {
  //   try {
  //     const pets = await Pet.find(); 
  //     res.json(pets);
  //   } catch (error) {
  //     res.status(500).send(`Error getting pets`, error);
  //   }
  // });

  // Using Apollo GraphQL
  app.get('/all', async (req, res) => {
    try {
      const result = await server.executeOperation({
        query: `query all {
          users {
            _id,
            email,
            username,
          },
          pets {
            _id,
            age,
            name,
            species,
            adopted,
          }
        }, `
      });

      res.json(result.body.singleResult.data);
    } catch (error) {
      res.status(500).send(`Error getting users`, error);
    }
  });
  
  app.get('/users', async (req, res) => {
    try {
      const result = await server.executeOperation({
        query: `query users {
          users {
            _id,
            email,
            username,
          }
        }`
      });

      res.json(result.body.singleResult.data.users);
    } catch (error) {
      res.status(500).send(`Error getting users`, error);
    }
  });

  app.get('/pets', async (req, res) => {
    try {
      const result = await server.executeOperation({
        query: `query pets {
          pets {
            _id,
            age,
            name,
            species,
            adopted,
          }
        }`
      });

      res.json(result.body.singleResult.data.pets);
    } catch (error) {
      res.status(500).send(`Error getting pets`, error);
    }
  });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();