import { Box, styled } from '@mui/material';

export const ChatContainer = styled(Box)(({ theme }) => ({
    width: '75vw',
    maxWidth: '1500px',
    height: '75vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
}));

export const MessageList = styled(Box)(({ theme }) => ({
    flex: 1, 
    overflowY: 'auto',
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    '&::-webkit-scrollbar': {
        display: 'none',  
    },
    '-ms-overflow-style': 'none', 
    'scrollbar-width': 'none',     
}));

export const MessageItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
}));

export const MessageBubble = styled(Box)(({ isSender, theme }) => ({
    alignSelf: isSender ? 'flex-end' : 'flex-start',
    padding: theme.spacing(1),
    borderRadius: '10px',
    backgroundColor: isSender ? theme.palette.primary.main : theme.palette.grey[300],
    color: isSender ? '#fff' : theme.palette.text.primary,
    maxWidth: '60%',
}));

export const MessageInputArea = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    borderTop: `1px solid ${theme.palette.divider}`,
    position: 'sticky',
    bottom: 0,
    backgroundColor: theme.palette.background.default,
}));

export const SendButton = styled(Box)(({ theme }) => ({
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: theme.spacing(1, 2),
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));
