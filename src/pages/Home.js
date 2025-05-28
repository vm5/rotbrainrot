import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  CircularProgress,
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/chat');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="matrix-bg" />
      
      <Container maxWidth="sm">
        <Card
          sx={{
            background: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--neon-green)',
            boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)',
          }}
        >
          <CardContent>
            <Stack spacing={4} alignItems="center" sx={{ py: 4 }}>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: 'Share Tech Mono',
                  color: 'var(--neon-green)',
                  textAlign: 'center',
                  textShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
                }}
              >
                rotBRAINrot.exe
              </Typography>

              <Typography
                sx={{
                  fontFamily: 'Fira Code',
                  color: '#666',
                  textAlign: 'center',
                  maxWidth: '80%',
                }}
              >
                ur mental health companion fr fr no cap bestie
              </Typography>

              <Button
                variant="contained"
                size="large"
                onClick={() => login()}
                startIcon={isLoading ? <CircularProgress size={20} sx={{ color: '#000' }} /> : <GoogleIcon />}
                disabled={isLoading}
                sx={{
                  fontFamily: 'Share Tech Mono',
                  backgroundColor: 'var(--neon-green)',
                  color: '#000',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: 'var(--neon-blue)',
                  },
                  '&.Mui-disabled': {
                    backgroundColor: 'rgba(0, 255, 157, 0.5)',
                    color: '#000',
                  },
                }}
              >
                {isLoading ? 'connecting...' : 'login.exe'}
              </Button>

              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: 'Share Tech Mono',
                    color: '#444',
                    display: 'block',
                    textAlign: 'center',
                  }}
                >
                  system.msg: secure login via google auth
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: 'Share Tech Mono',
                    color: '#444',
                    display: 'block',
                    textAlign: 'center',
                  }}
                >
                  privacy.policy: we keep ur data safe bestie
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Home; 