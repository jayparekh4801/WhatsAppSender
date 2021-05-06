const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    email : String,
    userName : String,
    password : String
});

let users = mongoose.model("users", userSchema);

module.exports = users;