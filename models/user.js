const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isLoggedIn: {
        type: Boolean,
        required: true,
        default: false
    },
    role: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('user', userSchema);