import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { ChatContainer, MessageInputArea, MessageList, MessageItem, MessageBubble, SendButton } from './ChatStyles';
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
    {messages.map((message, index) => {
      const isSender = message.senderId === userId;

      // Check if the next message is from the same sender and time
      const isLastInGroup =
        index === messages.length - 1 || // Last message in the list
        messages[index + 1].senderId !== message.senderId || // Next message has a different sender
        new Date(messages[index + 1].createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }) !==
          new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

      return (
        <MessageItem key={message._id} isSender={isSender}>
          {/* Show sender name only for the first message in the group */}
          {/* <Box sx={{display: "grid"}}> */}
          {index === 0 ||
          messages[index - 1].senderId !== message.senderId ? (
            <Typography
              variant="caption"
              sx={{
                marginBottom: "4px",
                color: "text.secondary",
                textAlign: "left",
                paddingLeft: "8px",
              }}
            >
              {!isSender && message.senderName}
            </Typography>
          ) : null}

          <MessageBubble isSender={isSender}>
          <Typography
                  sx={{
                    whiteSpace: "pre-wrap", // Preserves line breaks
                    wordWrap: "break-word", // Prevents overflow for long words
                    maxWidth: "500px"
                  }}
                  variant="body2"
                >
                  {message.text}
                </Typography>
          </MessageBubble>

          {/* Show timestamp only for the last message in the group */}
          { isLastInGroup && (
            <Typography
            //   variant="h8"
              sx={{
                fontSize: '8px',
                marginTop: "4px",
                color: "text.secondary",
                textAlign: isSender ? "right" : "left",
                ...(isSender ? { marginRight: "4px" } : { marginLeft: "4px" }),
              }}
            >
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          )}
        </MessageItem>
      );
    })}
    <div ref={messageEndRef}></div>
  </MessageList>
  <MessageInputArea>
    <TextField
      variant="outlined"
      fullWidth
      multiline
      rows={1}
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      placeholder="Type a message..."
      onKeyDown={handleKeyDown}
    />
    <SendButton variant="contained" color="primary" onClick={handleSendMessage}>
      Send
    </SendButton>
  </MessageInputArea>
</ChatContainer>

    );
};

export default MainChat;
