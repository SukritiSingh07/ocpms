import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { ChatContainer, MessageInputArea, MessageList, MessageItem, MessageBubble } from './ChatStyles';
import axios from 'axios';

const MainChat = ({ projectId, userId, userName }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messageEndRef = useRef(null);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView();
    }, [messages]);

    // Fetch initial messages and setup SSE for real-time updates
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/dashboard/chat/${projectId}`);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();

        const eventSource = new EventSource(`http://localhost:5000/dashboard/chat/stream/${projectId}`);
        eventSource.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('Received message via SSE:', message);
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        return () => {
            eventSource.close();
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

        // Add message locally
        // setMessages((prevMessages) => [
        //     ...prevMessages,
        //     { ...messageData, _id: Date.now().toString(), createdAt: new Date() },
        // ]);

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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            // Prevent the default action (new line) and send the message
            e.preventDefault();
            handleSendMessage();
        }
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
                    multiline
                    value={newMessage}
                    rows={1}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyDown={handleKeyDown} 
                />
                <Button variant="contained" color="primary" onClick={handleSendMessage}>
                    Send
                </Button>
            </MessageInputArea>
        </ChatContainer>
    );
};

export default MainChat;
