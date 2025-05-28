import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  TextField,
  IconButton,
  Chip,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import {
  Edit as EditIcon,
  WaterDrop as WaterIcon,
  SelfImprovement as MeditateIcon,
  DirectionsWalk as ExerciseIcon,
  NightsStay as SleepIcon,
  Psychology as MentalIcon,
} from '@mui/icons-material';

const ReminderIcon = ({ type }) => {
  switch (type) {
    case 'hydration':
      return <WaterIcon />;
    case 'mindfulness':
      return <MeditateIcon />;
    case 'exercise':
      return <ExerciseIcon />;
    case 'sleep':
      return <SleepIcon />;
    case 'mental':
    default:
      return <MentalIcon />;
  }
};

// Default reminder templates
const reminderTemplates = [
  {
    id: 'water',
    title: 'hydration.exe',
    message: 'time to drink water bestie!! stay hydrated fr fr',
    type: 'hydration',
    color: 'var(--neon-blue)',
    frequency: 'hourly',
    active: true
  },
  {
    id: 'meditate',
    title: 'mindfulness.exe',
    message: 'take a quick brain break and breathe bestie',
    type: 'mindfulness',
    color: 'var(--neon-purple)',
    frequency: 'daily',
    active: true
  },
  {
    id: 'exercise',
    title: 'touch.grass.exe',
    message: 'go outside and touch some grass rn no cap',
    type: 'exercise',
    color: 'var(--neon-green)',
    frequency: 'daily',
    active: true
  },
  {
    id: 'sleep',
    title: 'sleep.optimizer.exe',
    message: 'bestie its time to shut down ur system for the day',
    type: 'sleep',
    color: '#01cdfe',
    frequency: 'daily',
    active: true
  },
  {
    id: 'mental',
    title: 'vibe.check.exe',
    message: 'how r u feeling rn bestie? time for a quick check',
    type: 'mental',
    color: 'var(--neon-pink)',
    frequency: 'daily',
    active: true
  },
];

const Reminders = () => {
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('reminders');
    return saved ? JSON.parse(saved) : reminderTemplates;
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    // Request notification permission when notifications are enabled
    if (notificationsEnabled && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, [notificationsEnabled]);

  const handleNotificationToggle = () => {
    if (!notificationsEnabled && Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          setNotificationsEnabled(true);
          scheduleNotifications();
        }
      });
    } else {
      setNotificationsEnabled(!notificationsEnabled);
      if (!notificationsEnabled) {
        scheduleNotifications();
      }
    }
  };

  const scheduleNotifications = () => {
    reminders.forEach((reminder) => {
      if (reminder.active) {
        const interval = getIntervalFromFrequency(reminder.frequency);
        setInterval(() => {
          if (Notification.permission === 'granted' && notificationsEnabled) {
            new Notification(reminder.title, {
              body: reminder.message,
              icon: '/logo192.png',
            });
          }
        }, interval);
      }
    });
  };

  const getIntervalFromFrequency = (frequency) => {
    switch (frequency) {
      case 'hourly':
        return 60 * 60 * 1000; // 1 hour
      case 'daily':
        return 24 * 60 * 60 * 1000; // 24 hours
      case 'weekly':
        return 7 * 24 * 60 * 60 * 1000; // 7 days
      default:
        return 60 * 60 * 1000; // default to 1 hour
    }
  };

  const handleEditReminder = (reminder) => {
    setEditingReminder(reminder);
    setOpenDialog(true);
  };

  const handleSaveReminder = () => {
    if (editingReminder) {
      setReminders(prev =>
        prev.map(r => r.id === editingReminder.id ? editingReminder : r)
      );
    }
    setOpenDialog(false);
    setEditingReminder(null);
  };

  const handleToggleReminder = (id) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === id
          ? { ...reminder, active: !reminder.active }
          : reminder
      )
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <div className="matrix-bg" />
      
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Share Tech Mono',
            color: 'var(--neon-green)',
            mb: 2,
          }}
        >
          system.notifications.config
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={notificationsEnabled}
              onChange={handleNotificationToggle}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: 'var(--neon-green)',
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

      {/* Reminders Grid */}
      <Stack spacing={2}>
        {reminders.map((reminder) => (
          <Card
            key={reminder.id}
            sx={{
              background: 'rgba(10, 10, 10, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: reminder.active ? reminder.color : 'rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 0 20px ${reminder.color}33`,
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      color: reminder.color,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <ReminderIcon type={reminder.type} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontFamily: 'Share Tech Mono', color: '#fff' }}
                    >
                      {reminder.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: 'Fira Code',
                        color: '#666',
                        fontSize: '0.9rem',
                      }}
                    >
                      {reminder.message}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    label={reminder.frequency}
                    size="small"
                    sx={{
                      fontFamily: 'Share Tech Mono',
                      backgroundColor: `${reminder.color}22`,
                      color: reminder.color,
                      border: `1px solid ${reminder.color}`,
                    }}
                  />
                  <Switch
                    checked={reminder.active}
                    onChange={() => handleToggleReminder(reminder.id)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: reminder.color,
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: reminder.color,
                      },
                    }}
                  />
                  <IconButton
                    onClick={() => handleEditReminder(reminder)}
                    sx={{ color: reminder.color }}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            background: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--neon-green)',
          },
        }}
      >
        <DialogTitle sx={{ fontFamily: 'Share Tech Mono', color: '#fff' }}>
          edit.reminder.config
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Title"
              value={editingReminder?.title || ''}
              onChange={(e) =>
                setEditingReminder(prev => ({ ...prev, title: e.target.value }))
              }
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: 'var(--neon-green)' },
                },
                '& .MuiInputLabel-root': { color: '#666' },
              }}
            />
            <TextField
              label="Message"
              value={editingReminder?.message || ''}
              onChange={(e) =>
                setEditingReminder(prev => ({ ...prev, message: e.target.value }))
              }
              multiline
              rows={2}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: 'var(--neon-green)' },
                },
                '& .MuiInputLabel-root': { color: '#666' },
              }}
            />
            <FormControl>
              <InputLabel sx={{ color: '#666' }}>Frequency</InputLabel>
              <Select
                value={editingReminder?.frequency || 'daily'}
                onChange={(e) =>
                  setEditingReminder(prev => ({ ...prev, frequency: e.target.value }))
                }
                sx={{
                  color: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--neon-green)',
                  },
                }}
              >
                <MenuItem value="hourly">hourly</MenuItem>
                <MenuItem value="daily">daily</MenuItem>
                <MenuItem value="weekly">weekly</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{
              color: '#666',
              fontFamily: 'Share Tech Mono',
            }}
          >
            cancel
          </Button>
          <Button
            onClick={handleSaveReminder}
            sx={{
              color: 'var(--neon-green)',
              fontFamily: 'Share Tech Mono',
            }}
          >
            save.changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Reminders; 