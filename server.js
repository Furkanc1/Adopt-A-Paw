const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/adoptapet`);
const db = mongoose.connection;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  // pets: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Pet',
  //   },
  // ],
}, {
  toJSON: {
    virtuals: true,
  },
  id: false,
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.send(`Adopt-A-Pet Server`);
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// module.exports = {
//   app,
//   db
// };