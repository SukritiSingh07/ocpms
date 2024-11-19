import { Box, styled, Typography } from '@mui/material';

// Full-page container with grid layout
export const AnalyticsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column', // Ensure content flows vertically
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    minHeight: '100vh', // Ensure full viewport height
    width: '100%', // Take full width of the viewport
    padding: '40px',
    background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.background.default})`,
    gap: '20px',
    boxSizing: 'border-box', // Include padding in the total width/height
    overflow: 'hidden', // Prevent scrolling
}));


// Hero title styling
export const AnalyticsHero = styled(Typography)(({ theme }) => ({
    fontSize: '2.5rem',
    fontWeight: 700,
    color: theme.palette.primary.contrastText,
    textAlign: 'center',
}));

// Top charts container
export const TopChartsWrapper = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // Two charts side by side
    gap: '20px',
    width: '100%',
    maxWidth: '1400px',
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr', // Stack charts on smaller screens
    },
}));

// Individual card styling
export const AnalyticsCard = styled(Box)(({ theme }) => ({
    background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.action.hover})`,
    borderRadius: '15px',
    boxShadow: theme.shadows[5],
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    height: '100%', // Stretch to fill grid space
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[8],
    },
    '& h3': {
        fontSize: '1.4rem',
        fontWeight: 600,
        marginBottom: '15px',
        color: theme.palette.text.primary,
    },
}));

// Bottom chart container
export const BottomChartWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1400px',
    marginTop: '20px',
}));
