import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useGoogleLogin } from '@react-oauth/google';

const LoginButton = ({ onSuccess, onError }) => {
  const login = useGoogleLogin({
    onSuccess: onSuccess,
    onError: onError,
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Typography
        variant="h6"
        className="gradient-text"
        sx={{ fontFamily: 'Share Tech Mono, monospace' }}
      >
        login.exe required
      </Typography>
      <Button
        onClick={() => login()}
        variant="contained"
        startIcon={<GoogleIcon />}
        sx={{
          background: 'linear-gradient(45deg, #00ff9d 30%, #00bf8f 90%)',
          color: '#000',
          fontFamily: 'Share Tech Mono, monospace',
          padding: '10px 20px',
          '&:hover': {
            background: 'linear-gradient(45deg, #00bf8f 30%, #006d4f 90%)',
          },
          textTransform: 'none',
          borderRadius: 2,
          boxShadow: '0 0 10px rgba(0, 255, 157, 0.3)',
        }}
      >
        authenticate with google fr fr
      </Button>
    </Box>
  );
};

export default LoginButton; 