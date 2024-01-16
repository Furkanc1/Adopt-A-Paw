require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
// const fetch = require('cross-fetch');
const db = require('./config/connection');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
// const { ApolloClient, InMemoryCache, gql, HttpLink } = require('@apollo/client');

const PORT = process.env.PORT || 5000;
const app = express();

// Replace this whatever deployment service we use
const origin = process.env.NODE_ENV === 'production' ? '*' : `http://localhost:3000`;

const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: origin,
    methods: [`GET`, `POST`, `UPDATE`, `PATCH`, `DELETE`],
    credentials: true
  }
});

let secret = process.env.SECRET;
let token = null;

// Global variables from DB open
let usersDatabaseWatcher = null;
let petsDatabaseWatcher = null;

const allQuery = `query all {
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
    power,
    name,
    species,
    ownerId,
    creatorId,
    createdAt,
    updatedAt
    publicImageURL,
  }
}, `;

app.use(cors({
  origin: origin,
  credentials: true, // If you need to include cookies or authorization headers
}));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    token = req.headers.authorization || req.cookies.jwtToken;
    try {
      let userAuth = jwt.verify(token, secret);
      return { user: userAuth };
    } catch (error) {
      return { user: null };
    }
  }
});

// This is where we clean up the data and reform at it
// This is so that the API can have this cleaner data, which will be used by the front end. (through the api call)
const reformatDatesOnMongoDBObjects = (objectWeWantToReformatDates) => {
  let refomrattedDateObjects = objectWeWantToReformatDates.map((obj) => {
    let createdAt = new Date(parseFloat(obj.createdAt)).toLocaleString();
    let updatedAt = new Date(parseFloat(obj.updatedAt)).toLocaleString();

    if (obj.password) delete obj.password;

    return {
      ...obj,
      createdAt,
      updatedAt,
      rawDataFromDatabse: obj,
    }
  });

  return refomrattedDateObjects;
}

const modifyDataFromDatabaseIntoCleanerArrays = (usersFromDatabase, petsFromDatabase) => {
  // This is all virtual data that doesn't affect our DB
  // We grab the Data from the DB, alter it, then serve it to the front end from the api
  // We refer to the API across the app instead of directly referring to the DB

  let modifiedPetsFromDatabase = reformatDatesOnMongoDBObjects(petsFromDatabase).map(petWithReformattedDates => {
    petWithReformattedDates.creator = usersFromDatabase.find(usr => usr._id == petWithReformattedDates.creatorId);
    if (petWithReformattedDates.ownerId) {
      return {
        ...petWithReformattedDates,
        owner: usersFromDatabase.find(usr => usr._id == petWithReformattedDates.ownerId),
      }
    } else return petWithReformattedDates;
  });

  let modifiedUsersFromDatabase = reformatDatesOnMongoDBObjects(usersFromDatabase).map(usr => ({
    ...usr,
    petsAdopted: modifiedPetsFromDatabase.filter(pt => pt.ownerId == usr._id),
    petsCreated: modifiedPetsFromDatabase.filter(pt => pt.creatorId == usr._id),
  }));

  let cleanedUpDataToServeToAPI = {
    pets: modifiedPetsFromDatabase,
    users: modifiedUsersFromDatabase
  }

  return cleanedUpDataToServeToAPI;
}

const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server));

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    // app.get('*', (req, res) => {
    //   res.sendFile(path.join(__dirname, '../client/build/index.html'));
    // });
  } 

  // app.get(`/`, (req, res) => {
  //   res.send(`Adopt-A-Pet Server`);
  // });
 
  app.get(`/api`, (req, res) => {
    res.send(`Adopt-A-Pet API`);
  });

  // Using Apollo GraphQL
  app.get(`/api/all`, async (req, res) => {
    try {
      const result = await server.executeOperation({
        // This is the middle layer, taking raw data from the database, reformatting and re-calculating the data, and serving it up to the front end.
        // This way the front end is presented with clean non-bloated data.
        query: allQuery
      });

      let { users: usersFromDatabase, pets: petsFromDatabase } = result.body.singleResult.data;

      let dataToServeToAPI = modifyDataFromDatabaseIntoCleanerArrays(usersFromDatabase, petsFromDatabase);

      res.json(dataToServeToAPI);
    } catch (error) {
      res.status(500).send(`Error getting users`, error);
    }
  });
  
  app.get(`/api/users`, async (req, res) => {
    try {
      const result = await server.executeOperation({
        // This is the middle layer, taking raw data from the database, reformatting and re-calculating the data, and serving it up to the front end.
        // This way the front end is presented with clean non-bloated data.
        query: allQuery
      });

      let { users: usersFromDatabaseQuery, pets: petsFromDatabaseQuery } = result.body.singleResult.data;

      let dataToServeToAPI = modifyDataFromDatabaseIntoCleanerArrays(usersFromDatabaseQuery, petsFromDatabaseQuery);

      res.json(dataToServeToAPI.users);
    } catch (error) {
      res.status(500).send(`Error getting users`, error);
    }
  });

  app.get(`/api/pets`, async (req, res) => {
    try {
      const result = await server.executeOperation({
        // This is the middle layer, taking raw data from the database, reformatting and re-calculating the data, and serving it up to the front end.
        // This way the front end is presented with clean non-bloated data.
        query: allQuery
      });

      let { users: usersFromDatabaseQuery, pets: petsFromDatabaseQuery } = result.body.singleResult.data;

      let dataToServeToAPI = modifyDataFromDatabaseIntoCleanerArrays(usersFromDatabaseQuery, petsFromDatabaseQuery);

      res.json(dataToServeToAPI.pets);
    } catch (error) {
      res.status(500).send(`Error getting pets`, error);
    }
  });

  // If we were not using mutations, we would use the below code
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

  // Assuming server is the Apollo Server instance
  // const apolloServerUrl = 'http://localhost:${PORT}/graphql'; // Replace with your Apollo Server endpoint
  // const client = new ApolloClient({
  //   uri: apolloServerUrl,
  //   cache: new InMemoryCache(),
  //   link: new HttpLink({ 
  //     fetch,
  //     uri: '/graphql', 
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     }
  //   }),
  // });

  // app.post('/api/users', async (req, res) => {
  //   try {
  //     const { data } = await client.query({
  //       query: gql`
  //         query {
  //           users {
  //             email
  //             username,
  //           }
  //         }
  //       `,
  //     });

  //     const newUser = new User(req.body);
  //     await newUser.validate();

  //     const savedUser = await newUser.save();
  
  //     res.status(200).json(savedUser);
  //   } catch (error) {
  //     if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
  //       res.status(400).json({ error: 'Email already exists.' });
  //     } else if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
  //       res.status(400).json({ error: 'Username already exists.' });
  //     } else {
  //       res.status(500).send(`Error Adding User: ${error.message}`);
  //     }
  //     // res.status(500).send(`Error Adding User: ${error}`);
  //   }
  // });
  
  // app.post('/api/pets', async (req, res) => {
  //   try {
  //     const { data } = await client.query({
  //       query: gql`
  //         query {
  //           pets {
  //             name,
  //             power,
  //             species,
  //             ownerId,
  //             creatorId,
  //             publicImageURL,
  //           }
  //         }
  //       `,
  //     });

  //     const newPet = new Pet(req.body);
  //     await newPet.validate();

  //     const savedPet = await newPet.save();
  
  //     res.status(200).json(savedPet);
  //   } catch (error) {
  //     res.status(500).send(`Error Adding Pet: ${error}`);
  //   }
  // });

  // At this point we will already have access to the DB because it is open, therewfore we can listen for the changes in the DB
  // Once fully implemented we can remove our front-end simulations of the change
  db.once('open', () => {
    // Reference to our collection. Whenever there is achange to the users/pet collection, it will give us a signal
    // Real time listeners
    usersDatabaseWatcher = db.collection(`users`).watch();
    petsDatabaseWatcher = db.collection(`pets`).watch();

    usersDatabaseWatcher.on(`change`, (usersDatabaseChangeEvent) => {
      io.emit(`usersChanged`, usersDatabaseChangeEvent);
    })
    
    petsDatabaseWatcher.on(`change`, (petsDatabaseChangeEvent) => {
      io.emit(`petsChanged`, petsDatabaseChangeEvent);
    })

    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

process.on('SIGINT', () => {
  petsDatabaseWatcher.close();
  usersDatabaseWatcher.close();
  process.exit(0);
});

startApolloServer();