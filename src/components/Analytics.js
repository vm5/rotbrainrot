import React from 'react';
import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  Tooltip,
  Fade,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Psychology as BrainIcon,
  Notifications as ActivityIcon,
  Timeline as TrendIcon,
  Update as LatestIcon,
} from '@mui/icons-material';
import { useData } from '../context/DataContext';

const Analytics = () => {
  const { moodTrends, reminderCompletion, activityDistribution, latestActivities } = useData();

  // Custom colors for different data types
  const colors = {
    mood: '#00FF9D',
    hydration: '#00E5FF',
    mindfulness: '#FF79FF',
    exercise: '#FFD600',
    sleep: '#2979FF',
    chat: '#FF1744',
    journal: '#00FF9D',
    reminders: '#FF79FF',
    resources: '#00E5FF',
  };

  // Custom styles for charts
  const chartStyle = {
    background: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(0, 255, 157, 0.1)',
    borderRadius: '8px',
    backdropFilter: 'blur(4px)',
    padding: '20px',
    '&:hover': {
      boxShadow: '0 0 20px rgba(0, 255, 157, 0.2)',
      transform: 'translateY(-2px)',
    },
    transition: 'all 0.3s ease',
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            background: 'rgba(0, 0, 0, 0.9)',
            border: '1px solid var(--neon-green)',
            p: 1.5,
            borderRadius: 1,
            fontFamily: 'Share Tech Mono',
          }}
        >
          <Typography sx={{ color: 'var(--neon-green)' }}>
            {`${label}: ${payload[0].value}`}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  const CustomizedAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="middle"
          fill="#666"
          fontFamily="Share Tech Mono"
          fontSize="12px"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2 }, height: '100%' }}>
      <Typography
        variant="h5"
        sx={{
          color: 'var(--neon-green)',
          fontFamily: 'Share Tech Mono',
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <BrainIcon />
        system.analytics
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 3,
        }}
      >
        {/* Mood Trends Chart */}
        <Paper
          sx={{
            ...chartStyle,
            gridColumn: { xs: '1', md: '1 / -1' },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: colors.mood,
              fontFamily: 'Share Tech Mono',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <TrendIcon />
            mood.trends
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={moodTrends}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.1)"
              />
              <XAxis
                dataKey="name"
                tick={<CustomizedAxisTick />}
                stroke="#666"
              />
              <YAxis
                tick={<CustomizedAxisTick />}
                stroke="#666"
                domain={[0, 10]}
              />
              <Bar
                dataKey="value"
                fill={colors.mood}
                radius={[4, 4, 0, 0]}
              >
                {moodTrends.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={colors.mood}
                    fillOpacity={0.8}
                    strokeWidth={1}
                    stroke={colors.mood}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* Reminder Completion */}
        <Paper sx={chartStyle}>
          <Typography
            variant="h6"
            sx={{
              color: colors.mindfulness,
              fontFamily: 'Share Tech Mono',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <ActivityIcon />
            reminder.completion
          </Typography>
          <Box sx={{ mt: 2 }}>
            {reminderCompletion.map((reminder) => (
              <Box key={reminder.name} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography
                    sx={{
                      color: colors[reminder.name.toLowerCase()],
                      fontFamily: 'Share Tech Mono',
                      fontSize: '0.9rem',
                    }}
                  >
                    {reminder.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#666',
                      fontFamily: 'Share Tech Mono',
                      fontSize: '0.9rem',
                    }}
                  >
                    {reminder.value}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={reminder.value}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: colors[reminder.name.toLowerCase()],
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Activity Distribution */}
        <Paper sx={chartStyle}>
          <Typography
            variant="h6"
            sx={{
              color: colors.journal,
              fontFamily: 'Share Tech Mono',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <TrendIcon />
            activity.distribution
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={activityDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={50}
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={false}
              >
                {activityDistribution.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={colors[entry.name.toLowerCase()]}
                    strokeWidth={1}
                    stroke={colors[entry.name.toLowerCase()]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Paper>

        {/* Latest Activities */}
        <Paper sx={chartStyle}>
          <Typography
            variant="h6"
            sx={{
              color: colors.chat,
              fontFamily: 'Share Tech Mono',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <LatestIcon />
            latest.activities
          </Typography>
          <Box
            sx={{
              maxHeight: '200px',
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
            }}
          >
            {latestActivities.map((activity, index) => (
              <Fade in={true} key={activity.id} timeout={300 + index * 100}>
                <Box
                  sx={{
                    p: 1.5,
                    mb: 1,
                    borderRadius: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(0, 255, 157, 0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#fff',
                      fontFamily: 'Share Tech Mono',
                      fontSize: '0.9rem',
                    }}
                  >
                    {activity.message}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#666',
                      fontFamily: 'Share Tech Mono',
                      fontSize: '0.8rem',
                    }}
                  >
                    {new Date(activity.time).toLocaleTimeString()}
                  </Typography>
                </Box>
              </Fade>
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Analytics; 