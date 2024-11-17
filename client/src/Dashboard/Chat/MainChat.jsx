import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { ChatContainer, MessageInputArea, MessageList, MessageItem, MessageBubble } from './ChatStyles';
import  io  from 'socket.io-client';
import axios from 'axios';

const MainChat = ({ projectId, userId, userName }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messageEndRef = useRef(null);
    const socket = useRef(io('http://localhost:5000'));

    
    // Auto-scroll to the latest message whenever `messages` changes
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]); // Runs whenever `messages` changes
    
    // Handle receiving a new message
    useEffect(() => {
        socket.current.on('receiveMessage', (message) => {
            console.log('Received message:', message);
            // setMessages((prevMessages) => [...prevMessages, message]);  
            setMessages([...messages,message]);  // Update messages state
        });
    }, []); // Runs once when the component mounts
    
    const fetchMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/dashboard/chat/${projectId}`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };
    
        useEffect(() => {
            console.log(projectId);
            socket.current.emit('joinRoom', { projectId });
            console.log(`Attempting to join room: ${projectId}`);
            fetchMessages();
    
            return () => {
                socket.current.disconnect();
            };
        }, [projectId]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;
    
        const messageData = {
            projectId,
            senderId: userId,
            senderName: userName,
            text: newMessage,
        };
    
        // Update the local state immediately to show the message
        setMessages((prevMessages) => [
            ...prevMessages,
            { ...messageData, _id: Date.now().toString(), createdAt: new Date() },
        ]);
        
        socket.current.emit('sendMessage', messageData);
        console.log('Sent message:', messageData);
    
        // Use axios to save the message to the database
        try {
            await axios.post('http://localhost:5000/dashboard/chat', messageData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    
        setNewMessage('');
    };
    

    return (
        <ChatContainer>
            <MessageList>
                {messages.map((message) => (
                    <MessageItem key={message._id}>
                        <MessageBubble isSender={message.senderId === userId}>
                            <Typography variant="body1">
                                <strong>{message.senderName}:</strong> {message.text}
                            </Typography>
                        </MessageBubble>
                    </MessageItem>
                ))}
                <div ref={messageEndRef}></div>
            </MessageList>
            <MessageInputArea>
                <TextField
                    variant="outlined"
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <Button variant="contained" color="primary" onClick={handleSendMessage}>
                    Send
                </Button>
            </MessageInputArea>
        </ChatContainer>
    );
};

export default MainChat;
