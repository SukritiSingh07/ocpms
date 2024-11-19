import { Box, Button, styled } from '@mui/material';

export const ChatContainer = styled(Box)(({ theme }) => ({
    width: '78vw',
    // width: '100%',
    maxWidth: '1500px',
    // height: '100%',
    height: '78vh',
    display: 'flex',
    flexDirection: 'column',
    background: "linear-gradient(135deg, #f0f4f8, #d9e8ff)",
    margin: "0 auto",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
    boxShadow: theme.shadows[3],
}));

export const MessageList = styled(Box)(({ theme }) => ({
    flex: 1, 
    overflowY: 'auto',
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    // gap: theme.spacing(1),
    '&::-webkit-scrollbar': {
        display: 'none',  
    },
    '-ms-overflow-style': 'none', 
    'scrollbar-width': 'none',     
}));

export const MessageItem = styled(Box)(({ isSender, theme }) => ({
    display: "grid",
    justifyContent: isSender ? "flex-end" : "flex-start",
    marginBottom: "12px",
    textAlign:"center"
  }));

export const MessageBubble = styled(Box)(({ isSender, theme }) => ({
    padding: "10px 16px",
    borderRadius: "12px",
    backgroundColor: isSender
      ? theme.palette.primary.main
      : theme.palette.grey[300],
    color: isSender ? theme.palette.primary.contrastText : theme.palette.text.primary,
    maxWidth: "100%",
    // display: "flex",
    textAlign: "center",
    margin: 0,
}));

export const MessageInputArea = styled(Box)(({ theme }) => ({
    display: "flex",
    padding: "12px",
    borderTop: "1px solid #ddd",
    backgroundColor: "#C5D3E8",
}));

export const SendButton = styled(Button)(({ theme }) => ({
    marginLeft: "12px",
    height: "100%",
}));
