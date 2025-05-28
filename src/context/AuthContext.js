import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Box, Typography, CircularProgress } from '@mui/material';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      setIsLoading(true);
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        }).then(res => res.json());

        const userData = {
          id: userInfo.sub,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
          accessToken: response.access_token,
        };

        setUser(userData);
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: error => {
      console.error('Login Failed:', error);
      setIsLoading(false);
    },
  });

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  if (isLoading) {
    return (
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 2,
          background: 'linear-gradient(45deg, rgba(0, 255, 157, 0.1), rgba(255, 113, 206, 0.1))',
        }}
      >
        <CircularProgress 
          sx={{ 
            color: 'var(--neon-green)',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }} 
        />
        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: 'Share Tech Mono',
            color: 'var(--neon-green)',
            textShadow: '0 0 10px rgba(0, 255, 157, 0.5)',
          }}
        >
          loading brain.exe...
        </Typography>
      </Box>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 