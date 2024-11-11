const mongoose = require('mongoose');

// Define schema for the message
const messageSchema = new mongoose.Schema({
    projectId: { type: String, required: true },
    senderId: { type: String, required: true },
    senderName: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
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
