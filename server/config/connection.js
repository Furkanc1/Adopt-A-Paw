require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

module.exports = mongoose.connection;

// In heroku deployment, provide these environment variables