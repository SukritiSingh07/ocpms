const express = require('express');
const router = express.Router();
const Chat = require('../models/organisation/project/chat/chat.model');
const mongoose = require('mongoose');

// Fetch all messages for a project
router.get('/chat/:projectId', async (req, res) => {
    const { projectId } = req.params;
    try {
        // Find chat by projectId
        const chat = await Chat.findOne({ projectId }).populate('messages');
        if (!chat) {
            return res.json([]); // Return empty if no chat is found
        }
        res.json(chat.messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// Save a new message to the database
// Save a new message to the database
router.post('/chat', async (req, res) => {
    const { projectId, senderId, senderName, text } = req.body;
    try {
        console.log('Incoming request data:', req.body); // Debugging line

        // Check for missing fields
        if (!projectId || !senderId || !senderName || !text) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Convert projectId to ObjectId using 'new'
        const projectObjectId = new mongoose.Types.ObjectId(projectId);

        // Find existing chat or create a new one if it doesn't exist
        let chat = await Chat.findOne({ projectId: projectObjectId });
        if (!chat) {
            chat = await Chat.create({ projectId: projectObjectId, messages: [] });
        }

        // Create a new message object with projectId
        const newMessage = {
            projectId: projectObjectId, // Ensure projectId is included
            senderId,
            senderName,
            text,
            createdAt: new Date(),
        };

        // Push the new message to the messages array
        chat.messages.push(newMessage);

        // Save the chat document
        await chat.save();

        console.log('Message saved successfully:', newMessage);
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error saving message:', error.message);
        res.status(500).json({ error: 'Failed to save message' });
    }
});



module.exports = router;
