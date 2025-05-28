import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  Collapse,
  Chip,
  Fade,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Save as SaveIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Psychology as BrainIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { useData } from '../context/DataContext';

const Journal = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showSummary, setShowSummary] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { journalEntries, addJournalEntry, deleteJournalEntry, updateJournalEntry } = useData();

  // Simulated AI analysis - In a real app, this would call your AI service
  const analyzeEntries = async () => {
    setIsAnalyzing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsAnalyzing(false);
  };

  useEffect(() => {
    // Run analysis when component mounts
    analyzeEntries();
  }, []);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    const newEntry = {
      id: Date.now(),
      title,
      content,
      timestamp: new Date().toISOString(),
      mood: detectMood(content),
      tags: detectTags(content),
    };

    addJournalEntry(newEntry);
    setTitle('');
    setContent('');
    // Trigger reanalysis when new entry is added
    analyzeEntries();
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (editingEntry) {
      const updatedEntry = {
        ...editingEntry,
        mood: detectMood(editingEntry.content),
        tags: detectTags(editingEntry.content),
      };
      updateJournalEntry(editingEntry.id, updatedEntry);
      setShowEditDialog(false);
      setEditingEntry(null);
      // Trigger reanalysis when entry is edited
      analyzeEntries();
    }
  };

  const handleDelete = (id) => {
    deleteJournalEntry(id);
    // Trigger reanalysis when entry is deleted
    analyzeEntries();
  };

  const detectMood = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('happy') || lowerText.includes('good') || lowerText.includes('great')) {
      return 'positive';
    } else if (lowerText.includes('sad') || lowerText.includes('bad') || lowerText.includes('angry')) {
      return 'negative';
    }
    return 'neutral';
  };

  const detectTags = (text) => {
    const tags = text.match(/#\w+/g) || [];
    return tags.map(tag => tag.slice(1));
  };

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'positive':
        return 'var(--neon-green)';
      case 'negative':
        return 'var(--neon-pink)';
      default:
        return '#666';
    }
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2 }, height: '100%' }}>
      {/* Journal Entry Form */}
      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(0, 255, 157, 0.1)',
          borderRadius: 2,
          backdropFilter: 'blur(4px)',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: 'var(--neon-green)',
            fontFamily: 'Share Tech Mono',
            mb: 2,
          }}
        >
          entry.title
        </Typography>
        <TextField
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title..."
          sx={{
            mb: 2,
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
          }}
        />
        <Typography
          variant="h6"
          sx={{
            color: 'var(--neon-green)',
            fontFamily: 'Share Tech Mono',
            mb: 2,
          }}
        >
          brain.dump
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          sx={{
            mb: 2,
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
          }}
        />
        <Button
          fullWidth
          onClick={handleSave}
          disabled={!title.trim() || !content.trim()}
          sx={{
            color: 'var(--neon-green)',
            borderColor: 'var(--neon-green)',
            fontFamily: 'Share Tech Mono',
            border: '1px solid',
            p: 1.5,
            '&:hover': {
              backgroundColor: 'rgba(0, 255, 157, 0.1)',
              borderColor: 'var(--neon-green)',
            },
            '&.Mui-disabled': {
              color: 'rgba(0, 255, 157, 0.3)',
              borderColor: 'rgba(0, 255, 157, 0.3)',
            },
          }}
        >
          <SaveIcon sx={{ mr: 1 }} />
          save.entry
        </Button>
      </Paper>

      {/* AI Summary Section - Always visible */}
      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(0, 255, 157, 0.1)',
          borderRadius: 2,
          backdropFilter: 'blur(4px)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'var(--neon-green)',
              fontFamily: 'Share Tech Mono',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <BrainIcon sx={{ mr: 1 }} />
            ai.analysis
          </Typography>
        </Box>

        <Box>
          {isAnalyzing ? (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <CircularProgress sx={{ color: 'var(--neon-green)' }} />
              <Typography
                sx={{
                  color: '#666',
                  fontFamily: 'Share Tech Mono',
                  mt: 2,
                }}
              >
                analyzing_entries.exe
              </Typography>
            </Box>
          ) : (
            <>
              {/* Mood Distribution */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    color: '#666',
                    fontFamily: 'Share Tech Mono',
                    mb: 1,
                  }}
                >
                  mood.distribution
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {['positive', 'neutral', 'negative'].map((mood) => {
                    const count = journalEntries.filter(
                      (entry) => entry.mood === mood
                    ).length;
                    return (
                      <Chip
                        key={mood}
                        label={`${mood}: ${count}`}
                        sx={{
                          backgroundColor: `${getMoodColor(mood)}20`,
                          color: getMoodColor(mood),
                          border: `1px solid ${getMoodColor(mood)}`,
                          fontFamily: 'Share Tech Mono',
                        }}
                      />
                    );
                  })}
                </Box>
              </Box>

              {/* Common Tags */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    color: '#666',
                    fontFamily: 'Share Tech Mono',
                    mb: 1,
                  }}
                >
                  common.tags
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {Array.from(
                    new Set(
                      journalEntries.flatMap((entry) => entry.tags)
                    )
                  ).map((tag) => (
                    <Chip
                      key={tag}
                      label={`#${tag}`}
                      sx={{
                        backgroundColor: 'rgba(0, 255, 157, 0.1)',
                        color: 'var(--neon-green)',
                        border: '1px solid var(--neon-green)',
                        fontFamily: 'Share Tech Mono',
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Entry Patterns */}
              <Box>
                <Typography
                  sx={{
                    color: '#666',
                    fontFamily: 'Share Tech Mono',
                    mb: 1,
                  }}
                >
                  entry.patterns
                </Typography>
                <Typography
                  sx={{
                    color: '#fff',
                    fontFamily: 'Fira Code',
                    fontSize: '0.9rem',
                    p: 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: 1,
                    border: '1px solid rgba(0, 255, 157, 0.1)',
                  }}
                >
                  {`> Most active day: ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}\n`}
                  {`> Average entry length: ${Math.round(
                    journalEntries.reduce((acc, entry) => acc + entry.content.length, 0) /
                      (journalEntries.length || 1)
                  )} characters\n`}
                  {`> Total entries: ${journalEntries.length}`}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Paper>

      {/* Journal Entries List */}
      <Box sx={{ 
        maxHeight: 'calc(100vh - 400px)', 
        overflowY: 'auto',
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
        {journalEntries.map((entry) => (
          <Paper
            key={entry.id}
            sx={{
              p: { xs: 2, sm: 3 },
              mb: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(0, 255, 157, 0.1)',
              borderRadius: 2,
              backdropFilter: 'blur(4px)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  color: 'var(--neon-green)',
                  fontFamily: 'Share Tech Mono',
                }}
              >
                {entry.title}
              </Typography>
              <Box>
                <IconButton
                  size="small"
                  onClick={() => handleEdit(entry)}
                  sx={{ color: 'var(--neon-green)', mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(entry.id)}
                  sx={{ color: 'var(--neon-pink)' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
            <Typography
              sx={{
                color: '#fff',
                fontFamily: 'Fira Code',
                mb: 2,
                whiteSpace: 'pre-wrap',
              }}
            >
              {entry.content}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {entry.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={`#${tag}`}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(0, 255, 157, 0.1)',
                      color: 'var(--neon-green)',
                      border: '1px solid var(--neon-green)',
                      fontFamily: 'Share Tech Mono',
                    }}
                  />
                ))}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: getMoodColor(entry.mood),
                  fontFamily: 'Share Tech Mono',
                }}
              >
                {new Date(entry.timestamp).toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Edit Dialog */}
      <Dialog
        open={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            border: '1px solid var(--neon-green)',
            borderRadius: 2,
            backdropFilter: 'blur(4px)',
            minWidth: '300px',
          },
        }}
      >
        <DialogTitle
          sx={{
            color: 'var(--neon-green)',
            fontFamily: 'Share Tech Mono',
          }}
        >
          edit.entry
        </DialogTitle>
        <DialogContent>
          {editingEntry && (
            <>
              <TextField
                fullWidth
                label="Title"
                value={editingEntry.title}
                onChange={(e) => setEditingEntry({
                  ...editingEntry,
                  title: e.target.value,
                })}
                sx={{
                  mt: 2,
                  mb: 2,
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
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Content"
                value={editingEntry.content}
                onChange={(e) => setEditingEntry({
                  ...editingEntry,
                  content: e.target.value,
                })}
                sx={{
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
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setShowEditDialog(false)}
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
            onClick={handleSaveEdit}
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

export default Journal; 