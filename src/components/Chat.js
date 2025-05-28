import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { useData } from '../context/DataContext';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { messages, addMessage, sentiment } = useData();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    await addMessage({
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
    });
    setMessage('');
    setIsLoading(false);
  };

  const getSentimentColor = (sentiment) => {
    if (sentiment >= 0.5) return 'var(--neon-green)';
    if (sentiment <= -0.5) return 'var(--neon-pink)';
    return '#666';
  };

  return (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}>
      {/* Messages Container */}
      <Box sx={{
        flex: 1,
        overflowY: 'auto',
        p: { xs: 1, sm: 2 },
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 2,
        border: '1px solid rgba(0, 255, 157, 0.1)',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(0, 0, 0, 0.2)',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'var(--neon-green)',
          borderRadius: '4px',
        },
      }}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              mb: 2,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                maxWidth: { xs: '85%', sm: '70%' },
                p: { xs: 1.5, sm: 2 },
                backgroundColor: msg.sender === 'user' 
                  ? 'rgba(0, 255, 157, 0.1)'
                  : 'rgba(255, 113, 206, 0.1)',
                border: `1px solid ${msg.sender === 'user' 
                  ? 'var(--neon-green)' 
                  : 'var(--neon-pink)'}`,
                borderRadius: 2,
                position: 'relative',
              }}
            >
              <Typography
                sx={{
                  color: '#fff',
                  fontFamily: 'Fira Code',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  wordBreak: 'break-word',
                }}
              >
                {msg.text}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: getSentimentColor(sentiment),
                  fontFamily: 'Share Tech Mono',
                  display: 'block',
                  mt: 1,
                  textAlign: 'right',
                  fontSize: { xs: '0.7rem', sm: '0.8rem' },
                }}
              >
                {new Date(msg.timestamp).toLocaleTimeString()}
              </Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Container */}
      <Box
        component="form"
        onSubmit={handleSend}
        sx={{
          display: 'flex',
          gap: 1,
          p: { xs: 1, sm: 2 },
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: 2,
          border: '1px solid rgba(0, 255, 157, 0.1)',
        }}
      >
        <TextField
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          variant="outlined"
          disabled={isLoading}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              fontFamily: 'Fira Code',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              '& fieldset': {
                borderColor: 'rgba(0, 255, 157, 0.3)',
              },
              '&:hover fieldset': {
                borderColor: 'var(--neon-green)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--neon-green)',
              },
            },
            '& .MuiOutlinedInput-input': {
              p: { xs: 1, sm: 1.5 },
            },
          }}
        />
        <IconButton 
          type="submit"
          disabled={isLoading || !message.trim()}
          sx={{
            color: 'var(--neon-green)',
            borderRadius: 1,
            border: '1px solid var(--neon-green)',
            p: { xs: 1, sm: 1.5 },
            '&:hover': {
              backgroundColor: 'rgba(0, 255, 157, 0.1)',
            },
            '&.Mui-disabled': {
              color: 'rgba(0, 255, 157, 0.3)',
              borderColor: 'rgba(0, 255, 157, 0.3)',
            },
          }}
        >
          {isLoading ? (
            <CircularProgress 
              size={24} 
              sx={{ 
                color: 'var(--neon-green)',
              }} 
            />
          ) : (
            <SendIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Chat; 