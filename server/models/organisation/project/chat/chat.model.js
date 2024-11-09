const mongoose = require('mongoose');

// Define schema for the message
const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

// Define schema for the chat
const chatSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project', // Assuming you have a Project model
        required: true,
    },
    messages: [messageSchema], // Embedded array of messages
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
