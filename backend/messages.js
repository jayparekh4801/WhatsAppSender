const mongoose = require("mongoose");

messagesSchema = mongoose.Schema({
    messages : [],
    userName : String
});

let userMessages = mongoose.model("userMessage", messagesSchema);

module.exports = userMessages;
