import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Chip,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Psychology as BrainIcon,
  Lightbulb as InsightIcon,
  LocalOffer as TagIcon,
} from '@mui/icons-material';
import { useData } from '../context/DataContext';

const Journal = () => {
  const { updateActivity, addActivity } = useData();
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('journalEntries');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: 'brain.dump.20240315',
        content: 'today was a good day fr fr, feeling blessed bestie',
        timestamp: '2024-03-15T10:30:00',
        mood: 'positive',
        tags: ['grateful', 'blessed'],
        analysis: {
          sentiment: 8,
          themes: ['gratitude', 'positivity'],
          suggestions: ['Keep this positive energy going bestie!', 'Share ur blessings with others fr fr'],
        },
      },
    ];
  });

  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
  });

  const [editEntry, setEditEntry] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const analyzeEntry = (content) => {
    // Keywords for different moods and themes
    const moodKeywords = {
      positive: ['good', 'great', 'happy', 'blessed', 'slay', 'fr fr', 'love', 'excited'],
      negative: ['sad', 'bad', 'anxious', 'stressed', 'worried', 'depressed', 'hate'],
      neutral: ['okay', 'fine', 'meh', 'idk', 'tbh'],
    };

    const themeKeywords = {
      gratitude: ['thankful', 'blessed', 'grateful', 'appreciate'],
      anxiety: ['worried', 'anxious', 'stress', 'overwhelmed'],
      relationships: ['friend', 'family', 'bestie', 'relationship'],
      goals: ['future', 'goal', 'plan', 'dream'],
      selfCare: ['self-care', 'rest', 'sleep', 'exercise', 'health'],
    };

    const words = content.toLowerCase().split(/\s+/);
    
    // Calculate sentiment
    let sentiment = 5;
    words.forEach(word => {
      if (moodKeywords.positive.includes(word)) sentiment += 1;
      if (moodKeywords.negative.includes(word)) sentiment -= 1;
    });
    sentiment = Math.max(1, Math.min(10, sentiment));

    // Identify themes
    const themes = [];
    Object.entries(themeKeywords).forEach(([theme, keywords]) => {
      if (keywords.some(keyword => words.includes(keyword))) {
        themes.push(theme);
      }
    });

    // Generate suggestions based on sentiment and themes
    const suggestions = [];
    if (sentiment < 5) {
      suggestions.push(
        'bestie ur feelings are valid fr fr',
        'maybe try some self-care activities rn?',
        'remember to reach out to ur support system no cap'
      );
    } else if (sentiment > 7) {
      suggestions.push(
        'ur energy is immaculate rn bestie!',
        'share these good vibes with others fr fr',
        'document what made today special for future reference'
      );
    }

    if (themes.includes('anxiety')) {
      suggestions.push(
        'try some breathing exercises bestie',
        'lets break down whats worrying u',
        'remember: this too shall pass fr fr'
      );
    }

    // Extract tags
    const tags = [...new Set([
      ...themes,
      sentiment > 7 ? 'positive' : sentiment < 4 ? 'negative' : 'neutral'
    ])];

    return {
      sentiment,
      themes,
      suggestions: suggestions.slice(0, 3),
      tags,
      mood: sentiment > 7 ? 'positive' : sentiment < 4 ? 'negative' : 'neutral'
    };
  };

  const handleAddEntry = () => {
    if (newEntry.title && newEntry.content) {
      const analysis = analyzeEntry(newEntry.content);
      const timestamp = new Date().toISOString();
      
      const entry = {
        id: Date.now(),
        ...newEntry,
        timestamp,
        ...analysis,
      };

      setEntries([entry, ...entries]);
      setNewEntry({ title: '', content: '' });
      
      // Update analytics
      updateActivity('Journal');
      addActivity({
        type: 'journal',
        message: 'Added new journal entry',
        time: timestamp,
      });
    }
  };

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleEditEntry = (entry) => {
    setEditEntry(entry);
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (editEntry) {
      const analysis = analyzeEntry(editEntry.content);
      const updatedEntry = {
        ...editEntry,
        ...analysis,
      };
      setEntries(entries.map(e => e.id === editEntry.id ? updatedEntry : e));
      setEditEntry(null);
      setShowEditDialog(false);
    }
  };

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'positive':
        return 'var(--neon-green)';
      case 'negative':
        return 'var(--neon-pink)';
      default:
        return 'var(--neon-blue)';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <div className="matrix-bg" />
      
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Share Tech Mono',
          color: 'var(--neon-green)',
          mb: 3,
          textAlign: 'center',
        }}
      >
        brain.dump.log
      </Typography>

      {/* New Entry Form */}
      <Card
        sx={{
          mb: 3,
          background: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--neon-green)',
        }}
      >
        <CardContent>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="entry.title"
              value={newEntry.title}
              onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
              InputProps={{
                sx: {
                  fontFamily: 'Share Tech Mono',
                  color: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--neon-green)',
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  fontFamily: 'Share Tech Mono',
                  color: 'var(--neon-green)',
                },
              }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="brain.dump"
              value={newEntry.content}
              onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
              InputProps={{
                sx: {
                  fontFamily: 'Fira Code',
                  color: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--neon-green)',
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  fontFamily: 'Share Tech Mono',
                  color: 'var(--neon-green)',
                },
              }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddEntry}
              sx={{
                fontFamily: 'Share Tech Mono',
                background: 'var(--neon-green)',
                color: '#000',
                '&:hover': {
                  background: 'var(--neon-blue)',
                },
              }}
            >
              save.entry
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Entry List */}
      <Stack spacing={2}>
        {entries.map((entry) => (
          <Card
            key={entry.id}
            sx={{
              background: 'rgba(10, 10, 10, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--neon-blue)',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, maxWidth: 'calc(100% - 80px)' }}>
                  <BrainIcon sx={{ color: getMoodColor(entry.mood), flexShrink: 0 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Share Tech Mono',
                      color: getMoodColor(entry.mood),
                      fontSize: { xs: '0.9rem', sm: '1.25rem' },
                    }}
                  >
                    {entry.title.includes('brain.dump') ? 
                      <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                        brain.dump.
                      </Box> : null}
                    {entry.title.replace('brain.dump.', '')}
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    size="small"
                    sx={{ color: 'var(--neon-green)' }}
                    onClick={() => handleEditEntry(entry)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ color: 'var(--neon-pink)' }}
                    onClick={() => handleDeleteEntry(entry.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>

              <Typography
                sx={{
                  fontFamily: 'Fira Code',
                  color: '#fff',
                  whiteSpace: 'pre-wrap',
                  mb: 2,
                }}
              >
                {entry.content}
              </Typography>

              {/* Tags */}
              <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {entry.tags?.map((tag, index) => (
                  <Chip
                    key={index}
                    icon={<TagIcon />}
                    label={tag}
                    size="small"
                    sx={{
                      fontFamily: 'Share Tech Mono',
                      backgroundColor: `${getMoodColor(entry.mood)}22`,
                      color: getMoodColor(entry.mood),
                      border: `1px solid ${getMoodColor(entry.mood)}`,
                    }}
                  />
                ))}
              </Box>

              {/* AI Insights */}
              {entry.analysis?.suggestions && (
                <Card
                  sx={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--neon-purple)',
                    mb: 2,
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <InsightIcon sx={{ color: 'var(--neon-purple)' }} />
                      <Typography
                        sx={{
                          fontFamily: 'Share Tech Mono',
                          color: 'var(--neon-purple)',
                        }}
                      >
                        ai.insights
                      </Typography>
                    </Box>
                    {entry.analysis.suggestions.map((suggestion, index) => (
                      <Typography
                        key={index}
                        sx={{
                          fontFamily: 'Fira Code',
                          color: '#666',
                          fontSize: '0.9rem',
                          mb: 0.5,
                        }}
                      >
                        → {suggestion}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              )}

              <Typography
                variant="caption"
                sx={{
                  fontFamily: 'Share Tech Mono',
                  color: '#666',
                }}
              >
                {new Date(entry.timestamp).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Edit Dialog */}
      <Dialog
        open={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        PaperProps={{
          sx: {
            background: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--neon-green)',
            minWidth: { xs: '90%', sm: '500px' },
          },
        }}
      >
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="entry.title"
              value={editEntry?.title || ''}
              onChange={(e) => setEditEntry({ ...editEntry, title: e.target.value })}
              InputProps={{
                sx: {
                  fontFamily: 'Share Tech Mono',
                  color: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--neon-green)',
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  fontFamily: 'Share Tech Mono',
                  color: 'var(--neon-green)',
                },
              }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="brain.dump"
              value={editEntry?.content || ''}
              onChange={(e) => setEditEntry({ ...editEntry, content: e.target.value })}
              InputProps={{
                sx: {
                  fontFamily: 'Fira Code',
                  color: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--neon-green)',
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  fontFamily: 'Share Tech Mono',
                  color: 'var(--neon-green)',
                },
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setShowEditDialog(false)}
            sx={{
              fontFamily: 'Share Tech Mono',
              color: 'var(--neon-pink)',
              borderColor: 'var(--neon-pink)',
              '&:hover': {
                borderColor: 'var(--neon-pink)',
                backgroundColor: 'rgba(255, 0, 85, 0.1)',
              },
            }}
          >
            cancel
          </Button>
          <Button
            onClick={handleSaveEdit}
            sx={{
              fontFamily: 'Share Tech Mono',
              color: 'var(--neon-green)',
              borderColor: 'var(--neon-green)',
              '&:hover': {
                borderColor: 'var(--neon-green)',
                backgroundColor: 'rgba(0, 255, 157, 0.1)',
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

export default Journal; 