import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Slider,
  Paper,
} from '@mui/material';
import {
  Psychology as PsychologyIcon,
  Memory as MemoryIcon,
  BugReport as BugReportIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const moodEmojis = {
  1: '💀 dead inside',
  2: '😭 not slaying',
  3: '😐 mid vibes',
  4: '✨ lowkey slaying',
  5: '🔥 no cap bussin',
};

const moodColors = {
  1: '#ff0055', // dead inside red
  2: '#ff71ce', // not slaying pink
  3: '#01ffc3', // mid vibes cyan
  4: '#45caff', // lowkey slaying blue
  5: '#b967ff', // bussin purple
};

function MoodTracker() {
  const [moodData] = useState({
    labels: ['rizz -7', 'rizz -6', 'rizz -5', 'rizz -4', 'rizz -3', 'rizz -2', 'rizz -1'],
    datasets: [
      {
        label: 'brain damage stats',
        data: [3, 4, 2, 5, 3, 4, 5],
        borderColor: '#00ff9d',
        backgroundColor: 'rgba(0, 255, 157, 0.2)',
        tension: 0.4,
        pointBackgroundColor: '#00ff9d',
        pointBorderColor: '#000',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  });

  const [currentMood, setCurrentMood] = useState(3);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Neural Network Status Monitor',
        color: '#fff',
        font: {
          family: 'Share Tech Mono',
          size: 16,
        },
      },
    },
    scales: {
      y: {
        min: 1,
        max: 5,
        grid: {
          color: 'rgba(0, 255, 157, 0.1)',
        },
        ticks: {
          color: '#fff',
          font: {
            family: 'Share Tech Mono',
          },
          callback: (value) => moodEmojis[value],
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 255, 157, 0.1)',
        },
        ticks: {
          color: '#fff',
          font: {
            family: 'Share Tech Mono',
          },
        },
      },
    },
  };

  const handleMoodChange = (event, newValue) => {
    setCurrentMood(newValue);
  };

  return (
    <Box>
      <div className="matrix-bg" />
      <Typography 
        variant="h4" 
        gutterBottom 
        className="neon-text"
        sx={{
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          fontFamily: 'Share Tech Mono, monospace',
        }}
      >
        <MemoryIcon /> brainrot analytics (real)
      </Typography>

      <Grid container spacing={3}>
        {/* Current Mood Input */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background: 'linear-gradient(45deg, rgba(0, 255, 157, 0.1), rgba(255, 113, 206, 0.1))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 255, 157, 0.2)',
              boxShadow: '0 0 15px rgba(0, 255, 157, 0.1)',
            }}
          >
            <CardContent>
              <Typography 
                variant="h6" 
                gutterBottom
                className="terminal-text"
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontFamily: 'Share Tech Mono, monospace',
                }}
              >
                <BugReportIcon /> vibe check status
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Typography 
                  variant="body1"
                  className="gradient-text"
                  sx={{ 
                    mb: 2,
                    fontFamily: 'Share Tech Mono, monospace',
                  }}
                >
                  current mental state: {moodEmojis[currentMood]}
                </Typography>
                <Slider
                  value={currentMood}
                  onChange={handleMoodChange}
                  min={1}
                  max={5}
                  step={1}
                  marks
                  sx={{
                    color: moodColors[currentMood],
                    '& .MuiSlider-thumb': {
                      bgcolor: moodColors[currentMood],
                      border: '2px solid #000',
                      '&:hover, &.Mui-focusVisible': {
                        boxShadow: `0 0 0 8px ${moodColors[currentMood]}33`,
                      },
                    },
                    '& .MuiSlider-rail': {
                      background: 'linear-gradient(90deg, #ff0055, #ff71ce, #01ffc3, #45caff, #b967ff)',
                      opacity: 0.3,
                    },
                  }}
                />
              </Box>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  background: 'linear-gradient(45deg, #00ff9d 30%, #00bf8f 90%)',
                  boxShadow: '0 3px 5px 2px rgba(0, 255, 157, .3)',
                  color: '#000',
                  fontFamily: 'Share Tech Mono, monospace',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #00bf8f 30%, #006d4f 90%)',
                  },
                }}
              >
                log the damage bestie
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Stats Cards */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {[
              { title: 'average vibe', value: '4.2/10', icon: <StorageIcon /> },
              { title: 'peak slay', value: '98.7%', icon: <PsychologyIcon /> },
              { title: 'therapy sessions', value: '42', icon: <BugReportIcon /> },
              { title: 'days without crying', value: '0', icon: <MemoryIcon /> },
            ].map((stat, index) => (
              <Grid item xs={6} key={index}>
                <Paper
                  sx={{
                    p: 2,
                    height: '100%',
                    background: 'linear-gradient(45deg, rgba(0, 255, 157, 0.1), rgba(255, 113, 206, 0.1))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 255, 157, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box 
                    sx={{ 
                      color: '#00ff9d',
                      mb: 1,
                      animation: 'float 6s ease-in-out infinite',
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography 
                    variant="body2"
                    className="terminal-text"
                    sx={{
                      fontFamily: 'Share Tech Mono, monospace',
                    }}
                  >
                    {stat.title}
                  </Typography>
                  <Typography 
                    variant="h6"
                    className="gradient-text"
                    sx={{
                      fontFamily: 'Share Tech Mono, monospace',
                      mt: 1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Mood Chart */}
        <Grid item xs={12}>
          <Card
            sx={{
              background: 'linear-gradient(45deg, rgba(0, 255, 157, 0.1), rgba(255, 113, 206, 0.1))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 255, 157, 0.2)',
              boxShadow: '0 0 15px rgba(0, 255, 157, 0.1)',
            }}
          >
            <CardContent>
              <Typography 
                variant="h6" 
                gutterBottom
                className="terminal-text"
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontFamily: 'Share Tech Mono, monospace',
                }}
              >
                <StorageIcon /> mental damage timeline
              </Typography>
              <Box sx={{ p: 2, height: 300 }}>
                <Line data={moodData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MoodTracker; 