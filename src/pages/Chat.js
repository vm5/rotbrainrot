import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Chat = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography
          variant="h4"
          className="gradient-text"
          sx={{ fontFamily: 'Share Tech Mono, monospace', mb: 3 }}
        >
          ai therapy chat
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#fff', fontFamily: 'Fira Code, monospace' }}
        >
          vent to our ai bestie about ur brainrot
        </Typography>
      </Box>
    </Container>
  );
};

export default Chat; 