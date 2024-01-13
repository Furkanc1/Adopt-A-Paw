const path = require('path');
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const fetch = require('cross-fetch');
const db = require('./config/connection');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloClient, InMemoryCache, gql, HttpLink } = require('@apollo/client');

const PORT = process.env.PORT || 3001;
const app = express();
let secret = `secret-key`;
let token = null;

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
  context: ({ req }) => {

    token = req.headers.authorization || req.cookies.jwtToken;
    console.log(`Token`, token);

    try {
      let userAuth = jwt.verify(token, secret);
      console.log(`User Authenticated`, userAuth);
      return { user: userAuth };
    } catch (error) {
      return { user: null };
    }
  }
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
  app.get('/api/all', async (req, res) => {
    try {
      const result = await server.executeOperation({
        query: `query all {
          users {
            _id,
            email,
            username,
            password,
            createdAt,
            updatedAt
          },
          pets {
            _id,
            age,
            name,
            species,
            adopted,
            createdAt,
            updatedAt
          }
        }, `
      });

      res.json(result.body.singleResult.data);
    } catch (error) {
      res.status(500).send(`Error getting users`, error);
    }
  });
  
  app.get('/api/users', async (req, res) => {
    try {
      const result = await server.executeOperation({
        query: `query users {
          users {
            _id,
            email,
            username,
            password,
            createdAt,
            updatedAt
          }
        }`
      });

      res.json(result.body.singleResult.data.users);
    } catch (error) {
      res.status(500).send(`Error getting users`, error);
    }
  });

  // Assuming server is the Apollo Server instance
  const apolloServerUrl = 'http://localhost:3001/graphql'; // Replace with your Apollo Server endpoint
  const client = new ApolloClient({
    uri: apolloServerUrl,
    cache: new InMemoryCache(),
    link: new HttpLink({ 
      fetch,
      uri: '/graphql', 
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }),
  });

  app.post('/api/users', async (req, res) => {
    try {
      const { data } = await client.query({
        query: gql`
          query {
            users {
              email
              username,
            }
          }
        `,
      });

      const newUser = new User(req.body);
      await newUser.validate();

      const savedUser = await newUser.save();
  
      res.status(200).json(savedUser);
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        res.status(400).json({ error: 'Email already exists.' });
      } else if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
        res.status(400).json({ error: 'Username already exists.' });
      } else {
        res.status(500).send(`Error Adding User: ${error.message}`);
      }
      // res.status(500).send(`Error Adding User: ${error}`);
    }
  });
  
  app.post('/api/pets', async (req, res) => {
    try {
      const { data } = await client.query({
        query: gql`
          query {
            pets {
              age,
              name,
              species,
              adopted,
              creatorId,
            }
          }
        `,
      });

      const newPet = new Pet(req.body);
      await newPet.validate();

      const savedPet = await newPet.save();
  
      res.status(200).json(savedPet);
    } catch (error) {
      res.status(500).send(`Error Adding Pet: ${error}`);
    }
  });

  app.get('/api/pets', async (req, res) => {
    try {
      const result = await server.executeOperation({
        query: `query pets {
          pets {
            _id,
            age,
            name,
            species,
            adopted,
            creatorId,
            createdAt,
            updatedAt
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