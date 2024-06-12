const mongoose  = require('mongoose')

// now the in person schema have the following fields:
const PersonSchema  =   new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username:{
        type: String,  
        required: true
    }, 
    password:{
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef','manager','waiter'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String
    },
    salary:{
        type: Number,
        required: true
    }
});
// Create Person model
const Person =  mongoose.model('Person',PersonSchema);
module.exports = Person;