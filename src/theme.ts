import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#A852F6',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#2A2D3D',
      paper: '#1C1E2A',
    },
    text: {
      primary: '#ffffff',
      secondary: '#606581',
    },
    action: {
      hover: '#ffffff',
      active: '#A852F6',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '24px',
    },
    h2: {
      fontSize: '1rem',
    },
    body1: {
      fontSize: '14px',
    },
    subtitle1: {
      fontSize: '0.6875rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          textTransform: 'none',
        },
        containedSecondary: {
          backgroundColor: '#ffffff',
          color: '#1C1E2A',
          '&:hover': {
            backgroundColor: '#e0e0e0',
          },
        },
        sizeLarge: {
          padding: '8px 32px',
          fontWeight: 700,
          fontSize: '16px',
        },
      },
    },
  },
});

export default theme;
