const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const petSchema = new Schema({
    name: { type: String, required: true },
    species: { type: String, required: true },
    age: { type: Number },
    // will add more pet-related fields as needed
    // boolean will determine if they are or are not adopted
    adopted: { type: Boolean, default: false },

    // (dont have an adopter portion planned out yet) (for future reference):
    //   adopter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});


const Pet = mongoose.model('Pet', petSchema)
module.exports = Pet