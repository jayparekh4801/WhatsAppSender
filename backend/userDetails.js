const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    userName : String,
    password : String
});

let users = mongoose.model("users", userSchema);

module.exports = users;