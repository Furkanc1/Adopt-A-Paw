const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const petSchema = new Schema({
    age: { type: Number },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { 
        type: String, 
        required: [true, `Please enter a name for the pet`]
    },
    species: { 
        type: String,
        required: true
    },
    adopted: { 
        type: Boolean, 
        default: false
    },
}, {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
});

const Pet = model('Pet', petSchema);
module.exports = Pet;