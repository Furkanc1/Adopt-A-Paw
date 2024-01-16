// In heroku deployment, provide these environment variables
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://plutocoding:GX6Cb6VkTaBJgoma@cluster0.vkcagdy.mongodb.net/adoptapet?retryWrites=true&w=majority`);

module.exports = mongoose.connection;


// Link to the cloud
// https://cloud.mongodb.com/v2/65a301d94a78ed1597bbc1ff#/metrics/replicaSet/65a3022ac037bb239aafe06f/explorer/adoptapet/pets/find