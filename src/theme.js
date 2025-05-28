import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff9d', // neon green
      light: '#71ffb9',
      dark: '#00cc7d',
    },
    secondary: {
      main: '#ff71ce', // neon pink
      light: '#ff9de3',
      dark: '#cc5aa5',
    },
    background: {
      default: '#000000',
      paper: 'rgba(10, 10, 10, 0.95)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: 'Share Tech Mono, monospace',
    h1: {
      fontFamily: 'Share Tech Mono, monospace',
    },
    h2: {
      fontFamily: 'Share Tech Mono, monospace',
    },
    h3: {
      fontFamily: 'Share Tech Mono, monospace',
    },
    h4: {
      fontFamily: 'Share Tech Mono, monospace',
    },
    h5: {
      fontFamily: 'Share Tech Mono, monospace',
    },
    h6: {
      fontFamily: 'Share Tech Mono, monospace',
    },
    body1: {
      fontFamily: 'Fira Code, monospace',
    },
    body2: {
      fontFamily: 'Fira Code, monospace',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
        },
        switchBase: {
          padding: 1,
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#000',
            '& + .MuiSwitch-track': {
              backgroundColor: '#00ff9d',
              opacity: 1,
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          backgroundColor: '#666',
          opacity: 0.5,
        },
      },
    },
  },
});

export default theme; 