import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import Navigation from './Navigation';
import Home from '../pages/Home';
import AiChat from './AiChat';
import Analytics from '../pages/Analytics';
import Journal from '../pages/Journal';
import Reminders from '../pages/Reminders';
import Resources from '../pages/Resources';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return null; // Don't render anything while loading
  return isAuthenticated ? children : <Navigate to="/" />;
};

const Layout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Don't render anything while loading
  if (isLoading) return null;

  // If not authenticated, only show Home route
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  // If authenticated, show all routes
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <Box sx={{ display: 'flex' }}>
            <Navigation />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                width: { sm: `calc(100% - 240px)` },
                ml: { sm: '240px' },
                overflow: 'auto',
              }}
            >
              <Routes>
                <Route path="/" element={<Navigate to="/chat" />} />
                <Route
                  path="/chat"
                  element={
                    <ProtectedRoute>
                      <AiChat />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analytics"
                  element={
                    <ProtectedRoute>
                      <Analytics />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/journal"
                  element={
                    <ProtectedRoute>
                      <Journal />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reminders"
                  element={
                    <ProtectedRoute>
                      <Reminders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/resources"
                  element={
                    <ProtectedRoute>
                      <Resources />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Box>
          </Box>
        }
      />
    </Routes>
  );
};

export default Layout; 