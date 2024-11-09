// chat.js
const express = require('express');
const router = express.Router();
const Message = require('../models/organisation/project/chat/chat.model');

// Fetch messages for a specific project
router.get('/chat/:projectId', async (req, res) => {
    const { projectId } = req.params;
    try {
        const messages = await Message.find({ projectId }).sort({ createdAt: 1 });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send({ error: 'Failed to fetch messages' });
    }
});

module.exports = router;
