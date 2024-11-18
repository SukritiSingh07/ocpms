const express = require('express');
const router = express.Router();
const Chat = require('../models/organisation/project/chat/chat.model');
const mongoose = require('mongoose');

const clients = [];

// Endpoint to stream messages using Server-Sent Events (SSE)
router.get('/chat/stream/:projectId', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const clientId = Date.now();
    const clientData = {
        id: clientId,
        projectId: req.params.projectId,
        res
    };
    clients.push(clientData);

    req.on('close', () => {
        clients.splice(clients.indexOf(clientData), 1);
    });
});

// Helper function to broadcast new messages to clients
const sendMessageToClients = (message) => {
    clients.forEach((client) => {
        if (client.projectId === message.projectId.toString()) {
            client.res.write(`data: ${JSON.stringify(message)}\n\n`);
        }
    });
};

router.get('/chat/:projectId', async (req, res) => {
    const { projectId } = req.params;
    try {
        const chat = await Chat.findOne({ projectId }).populate('messages');
        res.json(chat ? chat.messages : []);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

router.post('/chat', async (req, res) => {
    const { projectId, senderId, senderName, text } = req.body;
    try {
        const projectObjectId = new mongoose.Types.ObjectId(projectId);
        let chat = await Chat.findOne({ projectId: projectObjectId });

        if (!chat) {
            chat = await Chat.create({ projectId: projectObjectId, messages: [] });
        }

        const newMessage = {
            projectId: projectObjectId,
            senderId,
            senderName,
            text,
            createdAt: new Date(),
        };

        chat.messages.push(newMessage);
        await chat.save();

        sendMessageToClients(newMessage);
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Failed to save message' });
    }
});

module.exports = router;
