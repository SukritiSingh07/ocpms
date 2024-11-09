import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { ChatContainer, MessageInputArea, MessageList, MessageItem, MessageBubble } from './ChatStyles';
import { io } from 'socket.io-client';

const MainChat = ({ projectId, userId, userName }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messageEndRef = useRef(null);
    const socket = useRef(io('http://localhost:5000'));

    // Join the room and listen for messages
    useEffect(() => {
        socket.current.emit('joinRoom', { projectId });

        // Fetch initial chat history
        fetchMessages();

        // Receive new messages from server
        socket.current.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
            messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        });

        // Cleanup on unmount
        return () => {
            socket.current.disconnect();
        };
    }, [projectId]);

    // Fetch previous chat messages
    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://localhost:5000/dashboard/chat/${projectId}`);
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            } else {
                console.error('Failed to fetch messages:', response.status);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // Handle sending a message
    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        // Emit message to socket server
        socket.current.emit('sendMessage', {
            projectId,
            senderId: userId,
            senderName: userName,
            text: newMessage,
        });

        setNewMessage('');
    };

    return (
        <ChatContainer>
            <MessageList>
                {messages.map((message) => (
                    <MessageItem key={message._id || Math.random()}>
                        <MessageBubble isSender={message.sender === userId}>
                            <Typography variant="body1">
                                <strong>{message.senderName || 'User'}:</strong> {message.text}
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
