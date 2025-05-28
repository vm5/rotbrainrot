import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Slider,
  Button,
  Chip,
  LinearProgress,
  TextField,
  Stack,
} from '@mui/material';
import {
  Memory as BrainIcon,
  BatteryCharging90 as EnergyIcon,
  Psychology as MindIcon,
  Favorite as HeartIcon,
  CloudUpload as UploadIcon,
} from '@mui/icons-material';

const moodTags = [
  { label: 'brain.exe working', color: 'var(--neon-green)' },
  { label: 'system.overload()', color: 'var(--neon-pink)' },
  { label: 'energy.low', color: 'var(--neon-purple)' },
  { label: 'vibes.optimized', color: 'var(--neon-blue)' },
  { label: 'anxiety.spike', color: '#ff71ce' },
  { label: 'mood.corrupted', color: '#01cdfe' },
  { label: 'peace.found', color: 'var(--neon-green)' },
  { label: 'thoughts.racing', color: 'var(--neon-pink)' },
];

const questions = [
  {
    id: 'mental_energy',
    label: 'system.resources.check()',
    description: 'Mental energy levels',
    icon: <BrainIcon />,
    color: 'var(--neon-green)',
  },
  {
    id: 'mood_level',
    label: 'mood.current.status',
    description: 'Overall mood state',
    icon: <HeartIcon />,
    color: 'var(--neon-pink)',
  },
  {
    id: 'anxiety_level',
    label: 'anxiety.process.monitor',
    description: 'Background process load',
    icon: <MindIcon />,
    color: 'var(--neon-blue)',
  },
  {
    id: 'motivation',
    label: 'motivation.power.level',
    description: 'System drive status',
    icon: <EnergyIcon />,
    color: 'var(--neon-purple)',
  },
];

const DailyCheck = () => {
  const [responses, setResponses] = useState({});
  const [selectedTags, setSelectedTags] = useState([]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSliderChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call to store the data
    const checkData = {
      timestamp: new Date().toISOString(),
      responses,
      tags: selectedTags,
      notes,
    };
    
    // TODO: Store in your backend/database
    console.log('Daily check data:', checkData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Share Tech Mono',
            color: 'var(--neon-green)',
            mb: 2,
          }}
        >
          vibe.check.complete()
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Fira Code',
            color: '#fff',
            mb: 3,
          }}
        >
          data successfully uploaded to the mainframe
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setSubmitted(false);
            setResponses({});
            setSelectedTags([]);
            setNotes('');
          }}
          sx={{
            fontFamily: 'Share Tech Mono',
            background: 'var(--neon-green)',
            color: '#000',
            '&:hover': {
              background: 'var(--neon-green-hover)',
            },
          }}
        >
          run.another.check()
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <div className="matrix-bg" />
      
      {/* Questions */}
      <Stack spacing={3}>
        {questions.map((question) => (
          <Card
            key={question.id}
            sx={{
              background: 'rgba(10, 10, 10, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: question.color,
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                {React.cloneElement(question.icon, { sx: { color: question.color } })}
                <Typography
                  variant="h6"
                  sx={{ fontFamily: 'Share Tech Mono', color: '#fff' }}
                >
                  {question.label}
                </Typography>
              </Box>
              
              <Typography
                sx={{
                  fontFamily: 'Fira Code',
                  color: '#888',
                  mb: 2,
                  fontSize: '0.9rem',
                }}
              >
                {question.description}
              </Typography>
              
              <Slider
                value={responses[question.id] || 50}
                onChange={(_, value) => handleSliderChange(question.id, value)}
                sx={{
                  color: question.color,
                  '& .MuiSlider-thumb': {
                    backgroundColor: question.color,
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: `${question.color}44`,
                  },
                }}
              />
              
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 1,
                  fontFamily: 'Share Tech Mono',
                  color: '#666',
                }}
              >
                <Typography>critical_error</Typography>
                <Typography>optimal</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}

        {/* Mood Tags */}
        <Card
          sx={{
            background: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--neon-blue)',
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Share Tech Mono',
                color: '#fff',
                mb: 2,
              }}
            >
              mood.tags.select
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {moodTags.map((tag) => (
                <Chip
                  key={tag.label}
                  label={tag.label}
                  onClick={() => handleTagToggle(tag.label)}
                  sx={{
                    fontFamily: 'Share Tech Mono',
                    backgroundColor: selectedTags.includes(tag.label)
                      ? tag.color
                      : 'transparent',
                    color: selectedTags.includes(tag.label)
                      ? '#000'
                      : tag.color,
                    border: `1px solid ${tag.color}`,
                    '&:hover': {
                      backgroundColor: `${tag.color}88`,
                    },
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card
          sx={{
            background: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--neon-purple)',
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Share Tech Mono',
                color: '#fff',
                mb: 2,
              }}
            >
              system.log.entry
            </Typography>
            
            <TextField
              multiline
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="// Add your thoughts here..."
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  fontFamily: 'Fira Code',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  '& fieldset': {
                    borderColor: 'var(--neon-purple)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--neon-purple)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--neon-purple)',
                  },
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          onClick={handleSubmit}
          disabled={isSubmitting}
          sx={{
            fontFamily: 'Share Tech Mono',
            background: 'linear-gradient(45deg, var(--neon-green), var(--neon-blue))',
            color: '#000',
            py: 1.5,
            '&:hover': {
              background: 'linear-gradient(45deg, var(--neon-blue), var(--neon-green))',
            },
          }}
        >
          {isSubmitting ? 'uploading...' : 'upload.vibe.data()'}
        </Button>

        {isSubmitting && (
          <LinearProgress
            sx={{
              backgroundColor: 'var(--neon-green)22',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(45deg, var(--neon-green), var(--neon-blue))',
              },
            }}
          />
        )}
      </Stack>
    </Box>
  );
};

export default DailyCheck; 