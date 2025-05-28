import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from '@mui/material';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import theme from './theme';
import Layout from './components/Layout';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="734883538831-kmmv30p5ff63v368bgljlps7thkm2ha2.apps.googleusercontent.com">
      <ThemeProvider theme={theme}>
        <DataProvider>
          <AuthProvider>
            <Router>
              <Layout />
            </Router>
          </AuthProvider>
        </DataProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
