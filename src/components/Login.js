import React from 'react';
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
} from '@mui/material';
import { Google as GoogleIcon, Psychology as BrainIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { user, login, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (user) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          p: 3,
          background: 'linear-gradient(45deg, rgba(0, 255, 157, 0.1), rgba(255, 113, 206, 0.1))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 255, 157, 0.2)',
          borderRadius: 2,
        }}
      >
        <Avatar
          src={user.picture}
          alt={user.name}
          sx={{
            width: 64,
            height: 64,
            border: '2px solid #00ff9d',
            boxShadow: '0 0 10px rgba(0, 255, 157, 0.3)',
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Share Tech Mono',
            color: 'var(--neon-green)',
            textShadow: '0 0 10px rgba(0, 255, 157, 0.3)',
            mb: 1,
          }}
        >
          welcome back {user.name?.toLowerCase().split(' ')[0]} uwu
        </Typography>
        <Button
          onClick={logout}
          variant="contained"
          sx={{
            background: 'linear-gradient(45deg, rgba(255, 0, 85, 0.2), rgba(255, 113, 206, 0.2))',
            border: '1px solid rgba(255, 0, 85, 0.3)',
            color: '#fff',
            fontFamily: 'Share Tech Mono, monospace',
            '&:hover': {
              background: 'linear-gradient(45deg, rgba(255, 0, 85, 0.3), rgba(255, 113, 206, 0.3))',
            },
          }}
        >
          logout.exe
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Grid Effect */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 255, 157, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 157, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          opacity: 0.5,
          zIndex: 1,
        }}
      />

      {/* Brain Icon */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          mb: 2,
          width: isMobile ? '80px' : '100px',
          height: isMobile ? '80px' : '100px',
          borderRadius: '50%',
          background: 'rgba(0, 255, 157, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid rgba(0, 255, 157, 0.3)',
          boxShadow: '0 0 20px rgba(0, 255, 157, 0.2)',
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': {
              transform: 'translateY(0)',
              boxShadow: '0 0 20px rgba(0, 255, 157, 0.2)',
            },
            '50%': {
              transform: 'translateY(-10px)',
              boxShadow: '0 10px 20px rgba(0, 255, 157, 0.4)',
            },
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -2,
            left: -2,
            right: -2,
            bottom: -2,
            borderRadius: '50%',
            background: 'linear-gradient(45deg, transparent, rgba(0, 255, 157, 0.5), transparent)',
            animation: 'rotate 4s linear infinite',
          },
          '@keyframes rotate': {
            '0%': {
              transform: 'rotate(0deg)',
            },
            '100%': {
              transform: 'rotate(360deg)',
            },
          },
        }}
      >
        <BrainIcon 
          sx={{ 
            fontSize: isMobile ? '40px' : '50px',
            color: 'var(--neon-green)',
            filter: 'drop-shadow(0 0 5px rgba(0, 255, 157, 0.5))',
            animation: 'pulse 2s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': {
                transform: 'scale(1)',
                opacity: 0.8,
              },
              '50%': {
                transform: 'scale(1.1)',
                opacity: 1,
              },
            },
          }} 
        />
      </Box>

      {/* Title outside the box */}
      <Typography
        variant="h3"
        sx={{
          fontFamily: 'Share Tech Mono',
          color: 'var(--neon-green)',
          textShadow: '0 0 10px rgba(0, 255, 157, 0.5)',
          fontSize: isMobile ? '1.8rem' : '2.5rem',
          letterSpacing: '0.1em',
          whiteSpace: 'nowrap',
          mb: 4,
          position: 'relative',
          zIndex: 2,
          '&::before': {
            content: '"rot"',
            color: 'var(--neon-green)',
            opacity: 0.5,
            position: 'absolute',
            left: -40,
            fontSize: '0.8em',
          },
          '&::after': {
            content: '".exe"',
            color: 'var(--neon-green)',
            opacity: 0.5,
            position: 'absolute',
            right: -60,
            fontSize: '0.8em',
          },
        }}
      >
        BRAIN
      </Typography>

      {/* Content Container */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          p: isMobile ? 2 : 3,
          maxWidth: '95%',
          width: isMobile ? '300px' : '400px',
          border: '1px solid rgba(0, 255, 157, 0.3)',
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(4px)',
          boxShadow: '0 0 20px rgba(0, 255, 157, 0.2)',
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': {
              boxShadow: '0 0 20px rgba(0, 255, 157, 0.2)',
            },
            '50%': {
              boxShadow: '0 0 30px rgba(0, 255, 157, 0.4)',
            },
            '100%': {
              boxShadow: '0 0 20px rgba(0, 255, 157, 0.2)',
            },
          },
        }}
      >
        <Typography
          sx={{
            color: '#666',
            fontFamily: 'Fira Code',
            fontSize: isMobile ? '0.75rem' : '0.8rem',
            mb: 2,
          }}
        >
          ur mental health companion fr fr no cap bestie
        </Typography>
        <Typography
          sx={{
            color: '#666',
            fontFamily: 'Fira Code',
            fontSize: isMobile ? '0.65rem' : '0.7rem',
          }}
        >
          system.msg: secure login via google auth
        </Typography>
        <Typography
          sx={{
            color: '#666',
            fontFamily: 'Fira Code',
            fontSize: isMobile ? '0.65rem' : '0.7rem',
            mb: 3,
          }}
        >
          privacy.policy: we keep ur data safe bestie
        </Typography>

        {/* Login Button */}
        <Button
          onClick={login}
          variant="outlined"
          startIcon={<GoogleIcon />}
          sx={{
            color: 'var(--neon-green)',
            borderColor: 'var(--neon-green)',
            fontFamily: 'Share Tech Mono',
            fontSize: isMobile ? '0.9rem' : '1rem',
            p: isMobile ? '8px 16px' : '10px 20px',
            '&:hover': {
              borderColor: 'var(--neon-green)',
              backgroundColor: 'rgba(0, 255, 157, 0.1)',
            },
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(0, 255, 157, 0.2), transparent)',
              animation: 'shimmer 2s infinite',
            },
            '@keyframes shimmer': {
              '100%': {
                left: '100%',
              },
            },
          }}
        >
          login.exe
        </Button>
      </Box>
    </Box>
  );
};

export default Login; 