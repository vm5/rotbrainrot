import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Quiz = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography
          variant="h4"
          className="gradient-text"
          sx={{ fontFamily: 'Share Tech Mono, monospace', mb: 3 }}
        >
          daily vibe check
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#fff', fontFamily: 'Fira Code, monospace' }}
        >
          track ur mental state with daily quizzes fr fr
        </Typography>
      </Box>
    </Container>
  );
};

export default Quiz; 