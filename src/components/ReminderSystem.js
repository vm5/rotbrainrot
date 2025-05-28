import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const reminderMessages = [
  "bestie ur mental health check is loading... time to spill the tea fr fr",
  "hey bestie! time for ur daily brain damage assessment no cap",
  "mental health check incoming! don't leave me on read bestie",
  "it's giving very much time for a vibe check rn",
  "brain rot check in 3... 2... 1...",
  "bestie we need to talk about ur mental state fr fr",
];

const reminderTimes = {
  morning: 9,
  afternoon: 14,
  evening: 20,
};

const ReminderSystem = () => {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [reminderSettings, setReminderSettings] = useState({
    morning: true,
    afternoon: true,
    evening: true,
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    // Check time every minute
    const interval = setInterval(() => {
      const now = new Date();
      const currentHour = now.getHours();

      Object.entries(reminderTimes).forEach(([timeOfDay, hour]) => {
        if (currentHour === hour && reminderSettings[timeOfDay]) {
          showReminder();
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [reminderSettings]);

  useEffect(() => {
    // Check if notifications are supported
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notifications");
      return;
    }

    // Check if permission was already granted
    if (Notification.permission === "granted") {
      setNotificationsEnabled(true);
    }
  }, []);

  const showReminder = () => {
    const message = reminderMessages[Math.floor(Math.random() * reminderMessages.length)];
    setCurrentMessage(message);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const handleRespond = (response) => {
    setOpen(false);
    setSnackbarOpen(true);
    // Here you would typically save the response to your database
  };

  const handleNotificationToggle = async () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notifications");
      return;
    }

    if (Notification.permission === "granted") {
      setNotificationsEnabled(!notificationsEnabled);
      // Update reminder settings based on notification toggle
      setReminderSettings(prev => ({
        ...prev,
        morning: !notificationsEnabled,
        afternoon: !notificationsEnabled,
        evening: !notificationsEnabled
      }));
    } else if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setNotificationsEnabled(true);
        // Enable all reminders when notifications are enabled
        setReminderSettings({
          morning: true,
          afternoon: true,
          evening: true
        });
      }
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            background: 'linear-gradient(45deg, rgba(0, 255, 157, 0.1), rgba(255, 113, 206, 0.1))',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 255, 157, 0.2)',
            boxShadow: '0 0 15px rgba(0, 255, 157, 0.1)',
            color: '#fff',
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'Share Tech Mono, monospace',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <NotificationsIcon sx={{ color: '#00ff9d' }} />
            <Typography className="gradient-text">
              vibe check incoming
            </Typography>
          </Box>
          <IconButton
            onClick={handleClose}
            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography 
            sx={{ 
              my: 2,
              fontFamily: 'Fira Code, monospace',
            }}
          >
            {currentMessage}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 2, p: 2 }}>
          <Button
            onClick={() => handleRespond('good')}
            sx={{
              background: 'linear-gradient(45deg, #00ff9d 30%, #00bf8f 90%)',
              color: '#000',
              fontFamily: 'Share Tech Mono, monospace',
              '&:hover': {
                background: 'linear-gradient(45deg, #00bf8f 30%, #006d4f 90%)',
              },
            }}
          >
            im slaying rn
          </Button>
          <Button
            onClick={() => handleRespond('mid')}
            sx={{
              background: 'linear-gradient(45deg, #ff71ce 30%, #b967ff 90%)',
              color: '#000',
              fontFamily: 'Share Tech Mono, monospace',
              '&:hover': {
                background: 'linear-gradient(45deg, #b967ff 30%, #ff71ce 90%)',
              },
            }}
          >
            mid vibes tbh
          </Button>
          <Button
            onClick={() => handleRespond('bad')}
            sx={{
              background: 'linear-gradient(45deg, #ff0055 30%, #ff71ce 90%)',
              color: '#000',
              fontFamily: 'Share Tech Mono, monospace',
              '&:hover': {
                background: 'linear-gradient(45deg, #ff71ce 30%, #ff0055 90%)',
              },
            }}
          >
            not slaying rn
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            background: 'linear-gradient(45deg, rgba(0, 255, 157, 0.2), rgba(255, 113, 206, 0.2))',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 255, 157, 0.2)',
            color: '#fff',
            '& .MuiAlert-icon': {
              color: '#00ff9d',
            },
          }}
        >
          vibe check logged bestie, ur doing amazing sweetie
        </Alert>
      </Snackbar>

      <Box sx={{ p: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={notificationsEnabled}
              onChange={handleNotificationToggle}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: 'var(--neon-green)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 255, 157, 0.1)',
                  },
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: 'var(--neon-green)',
                },
              }}
            />
          }
          label={
            <Typography sx={{ fontFamily: 'Share Tech Mono', color: '#fff' }}>
              {notificationsEnabled ? 'notifications.enabled' : 'notifications.disabled'}
            </Typography>
          }
        />
      </Box>
    </>
  );
};

export default ReminderSystem; 