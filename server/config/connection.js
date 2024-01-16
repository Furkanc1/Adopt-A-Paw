// In heroku deployment, provide these environment variables
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/adoptapet`);

module.exports = mongoose.connection;


// Link to the cloud
// https://cloud.mongodb.com/v2/65a301d94a78ed1597bbc1ff#/metrics/replicaSet/65a3022ac037bb239aafe06f/explorer/adoptapet/pets/find