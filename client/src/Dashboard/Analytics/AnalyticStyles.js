import { Box, styled } from '@mui/material';

export const AnalyticsContainer = styled(Box)(({ theme }) => ({
    padding: '20px',
    // margin: '0 auto',
    // maxWidth: '1500px',
    width: '75svw',
    backgroundColor: theme.palette.background.default,
}));

export const AnalyticsTitle = styled('h2')(({ theme }) => ({
    textAlign: 'center',
    marginBottom: '30px',
    color: theme.palette.text.primary,
}));

export const AnalyticsGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    // gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '50px',
}));

export const AnalyticsCard = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: '20px',
    borderRadius: '10px',
    boxShadow: theme.shadows[3],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '250px',
    maxHeight: '500px',
    '& h3': {
        fontSize: '1.2rem',
        marginBottom: '15px',
        color: theme.palette.text.secondary,
    },
}));
