const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

const Signup = mongoose.model('user', signupSchema);

module.exports = Signup;
