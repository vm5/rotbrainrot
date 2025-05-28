import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Switch,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Collapse,
  Fade,
  CircularProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  WaterDrop as HydrationIcon,
  SelfImprovement as MindfulnessIcon,
  Grass as TouchGrassIcon,
  Bedtime as SleepIcon,
  Psychology as VibeIcon,
  Notifications as NotificationIcon,
} from '@mui/icons-material';
import { useData } from '../context/DataContext';

const REMINDER_TYPES = {
  hydration: {
    name: 'hydration.exe',
    icon: HydrationIcon,
    color: '#00E5FF',
    description: 'time to drink water bestie!! stay hydrated fr fr',
    defaultInterval: 'hourly',
  },
  mindfulness: {
    name: 'mindfulness.exe',
    icon: MindfulnessIcon,
    color: '#FF79FF',
    description: 'take a quick brain break and breathe bestie',
    defaultInterval: 'daily',
  },
  touchGrass: {
    name: 'touch.grass.exe',
    icon: TouchGrassIcon,
    color: '#00FF9D',
    description: 'go outside and touch some grass rn no cap',
    defaultInterval: 'daily',
  },
  sleep: {
    name: 'sleep.optimizer.exe',
    icon: SleepIcon,
    color: '#2979FF',
    description: 'bestie its time to shut down ur system for the day',
    defaultInterval: 'daily',
  },
  vibeCheck: {
    name: 'vibe.check.exe',
    icon: VibeIcon,
    color: '#FF1744',
    description: 'checking in on ur vibes bestie, u good?',
    defaultInterval: 'daily',
  },
};

const Reminders = () => {
  const { reminderCompletion, updateReminder } = useData();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('reminders');
    return saved ? JSON.parse(saved) : Object.keys(REMINDER_TYPES).map(type => ({
      id: type,
      ...REMINDER_TYPES[type],
      enabled: false,
      interval: REMINDER_TYPES[type].defaultInterval,
      nextReminder: null,
    }));
  });

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    if (notificationsEnabled) {
      requestNotificationPermission();
    }
  }, [notificationsEnabled]);

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === 'granted');
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      setNotificationsEnabled(false);
    }
  };

  const handleReminderToggle = (reminder) => {
    setReminders(prev =>
      prev.map(r => {
        if (r.id === reminder.id) {
          const now = new Date();
          const nextReminder = calculateNextReminder(now, r.interval);
          return {
            ...r,
            enabled: !r.enabled,
            nextReminder: !r.enabled ? nextReminder : null,
          };
        }
        return r;
      })
    );
  };

  const calculateNextReminder = (fromDate, interval) => {
    const next = new Date(fromDate);
    switch (interval) {
      case 'hourly':
        next.setHours(next.getHours() + 1);
        next.setMinutes(0);
        break;
      case 'daily':
        next.setDate(next.getDate() + 1);
        next.setHours(9, 0, 0); // 9 AM next day
        break;
      case 'weekly':
        next.setDate(next.getDate() + 7);
        break;
      default:
        next.setHours(next.getHours() + 1);
    }
    return next.toISOString();
  };

  const handleEditReminder = (reminder) => {
    setEditingReminder(reminder);
    setShowDialog(true);
  };

  const handleSaveReminder = () => {
    if (editingReminder) {
      setReminders(prev =>
        prev.map(r => r.id === editingReminder.id ? editingReminder : r)
      );
    }
    setShowDialog(false);
    setEditingReminder(null);
  };

  const ReminderCard = ({ reminder }) => {
    const Icon = reminder.icon;
    const progress = (reminderCompletion.find(r => r.name === reminder.name)?.value || 0) / 10;
    
    return (
      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(0, 255, 157, 0.1)',
          borderRadius: 2,
          backdropFilter: 'blur(4px)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 0 20px ${reminder.color}20`,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Icon sx={{ color: reminder.color, mr: 1 }} />
            <Typography
              variant="h6"
              sx={{
                color: reminder.color,
                fontFamily: 'Share Tech Mono',
              }}
            >
              {reminder.name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              size="small"
              onClick={() => handleEditReminder(reminder)}
              sx={{ color: reminder.color }}
            >
              <EditIcon />
            </IconButton>
            <Switch
              checked={reminder.enabled}
              onChange={() => handleReminderToggle(reminder)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: reminder.color,
                  '&:hover': {
                    backgroundColor: `${reminder.color}20`,
                  },
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: reminder.color,
                },
              }}
            />
          </Box>
        </Box>
        <Typography
          sx={{
            color: '#fff',
            fontFamily: 'Fira Code',
            fontSize: '0.9rem',
            mb: 2,
          }}
        >
          {reminder.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="caption"
            sx={{
              color: '#666',
              fontFamily: 'Share Tech Mono',
            }}
          >
            {reminder.interval} | next: {reminder.nextReminder
              ? new Date(reminder.nextReminder).toLocaleTimeString()
              : 'not scheduled'}
          </Typography>
          <Box
            sx={{
              width: 40,
              height: 40,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress
              variant="determinate"
              value={progress * 100}
              sx={{
                color: reminder.color,
                position: 'absolute',
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: reminder.color,
                fontFamily: 'Share Tech Mono',
              }}
            >
              {Math.round(progress * 100)}%
            </Typography>
          </Box>
        </Box>
      </Paper>
    );
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3,
      }}>
        <Typography
          variant="h5"
          sx={{
            color: 'var(--neon-green)',
            fontFamily: 'Share Tech Mono',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <NotificationIcon />
          reminders.sys
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            sx={{
              color: '#666',
              fontFamily: 'Share Tech Mono',
              fontSize: '0.9rem',
            }}
          >
            notifications.{notificationsEnabled ? 'enabled' : 'disabled'}
          </Typography>
          <Switch
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
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
        </Box>
      </Box>

      {/* Reminders List */}
      <Box>
        {reminders.map((reminder) => (
          <ReminderCard key={reminder.id} reminder={reminder} />
        ))}
      </Box>

      {/* Edit Dialog */}
      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            border: '1px solid var(--neon-green)',
            borderRadius: 2,
            backdropFilter: 'blur(4px)',
          },
        }}
      >
        <DialogTitle
          sx={{
            color: 'var(--neon-green)',
            fontFamily: 'Share Tech Mono',
          }}
        >
          edit.reminder
        </DialogTitle>
        <DialogContent>
          {editingReminder && (
            <>
              <TextField
                fullWidth
                label="Description"
                value={editingReminder.description}
                onChange={(e) => setEditingReminder({
                  ...editingReminder,
                  description: e.target.value,
                })}
                sx={{
                  mt: 2,
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    fontFamily: 'Fira Code',
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
                  '& .MuiInputLabel-root': {
                    color: '#666',
                    fontFamily: 'Share Tech Mono',
                  },
                }}
              />
              <FormControl
                fullWidth
                sx={{
                  mt: 2,
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    fontFamily: 'Share Tech Mono',
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
                  '& .MuiInputLabel-root': {
                    color: '#666',
                    fontFamily: 'Share Tech Mono',
                  },
                }}
              >
                <InputLabel>Interval</InputLabel>
                <Select
                  value={editingReminder.interval}
                  label="Interval"
                  onChange={(e) => setEditingReminder({
                    ...editingReminder,
                    interval: e.target.value,
                  })}
                >
                  <MenuItem value="hourly">hourly</MenuItem>
                  <MenuItem value="daily">daily</MenuItem>
                  <MenuItem value="weekly">weekly</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setShowDialog(false)}
            sx={{
              color: 'var(--neon-pink)',
              borderColor: 'var(--neon-pink)',
              fontFamily: 'Share Tech Mono',
              '&:hover': {
                backgroundColor: 'rgba(255, 113, 206, 0.1)',
                borderColor: 'var(--neon-pink)',
              },
            }}
          >
            cancel
          </Button>
          <Button
            onClick={handleSaveReminder}
            sx={{
              color: 'var(--neon-green)',
              borderColor: 'var(--neon-green)',
              fontFamily: 'Share Tech Mono',
              '&:hover': {
                backgroundColor: 'rgba(0, 255, 157, 0.1)',
                borderColor: 'var(--neon-green)',
              },
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