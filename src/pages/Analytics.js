import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import {
  WaterDrop as WaterIcon,
  Psychology as BrainIcon,
  Edit as JournalIcon,
} from '@mui/icons-material';
import { useData } from '../context/DataContext';

const Analytics = () => {
  const {
    moodTrends,
    reminderCompletion,
    activityDistribution,
    latestActivities,
  } = useData();

  const COLORS = ['#00ff9d', '#ff71ce', '#01cdfe', '#b967ff'];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'chat':
        return <BrainIcon sx={{ color: 'var(--neon-green)' }} />;
      case 'reminder':
        return <WaterIcon sx={{ color: 'var(--neon-blue)' }} />;
      case 'journal':
        return <JournalIcon sx={{ color: 'var(--neon-pink)' }} />;
      default:
        return <BrainIcon sx={{ color: 'var(--neon-green)' }} />;
    }
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffMinutes < 1) return 'just now';
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} hours ago`;
    return `${Math.floor(diffMinutes / 1440)} days ago`;
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 3 } }}>
      <div className="matrix-bg" />
      
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Share Tech Mono',
          color: 'var(--neon-green)',
          mb: 3,
          textAlign: 'center',
          fontSize: { xs: '1.5rem', sm: '2.5rem' }
        }}
      >
        analytics.sys
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {/* Mood Trends */}
        <Grid item xs={12} lg={6}>
          <Card
            sx={{
              background: 'rgba(10, 10, 10, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--neon-green)',
            }}
          >
            <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Share Tech Mono',
                  color: 'var(--neon-green)',
                  mb: 2,
                  fontSize: { xs: '1rem', sm: '1.25rem' }
                }}
              >
                mood.trends
              </Typography>
              <Box sx={{ width: '100%', height: { xs: 200, sm: 300 } }}>
                <ResponsiveContainer>
                  <BarChart data={moodTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(10, 10, 10, 0.95)',
                        border: '1px solid var(--neon-green)',
                        borderRadius: '4px',
                        fontFamily: 'Share Tech Mono',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="value" fill="var(--neon-green)" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Reminder Completion */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Share Tech Mono',
                  color: 'var(--neon-pink)',
                  mb: 2,
                  fontSize: { xs: '1rem', sm: '1.25rem' }
                }}
              >
                reminder.completion
              </Typography>
              <Box sx={{ width: '100%', height: { xs: 200, sm: 300 } }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={reminderCompletion}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {reminderCompletion.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(10, 10, 10, 0.95)',
                        border: '1px solid var(--neon-pink)',
                        borderRadius: '4px',
                        fontFamily: 'Share Tech Mono',
                      }}
                    />
                    <Legend
                      formatter={(value) => (
                        <span style={{ color: '#fff', fontFamily: 'Share Tech Mono' }}>
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Activity Distribution */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Share Tech Mono',
                  color: 'var(--neon-blue)',
                  mb: 2,
                  fontSize: { xs: '1rem', sm: '1.25rem' }
                }}
              >
                activity.distribution
              </Typography>
              <Box sx={{ width: '100%', height: { xs: 200, sm: 300 } }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={activityDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {activityDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(10, 10, 10, 0.95)',
                        border: '1px solid var(--neon-blue)',
                        borderRadius: '4px',
                        fontFamily: 'Share Tech Mono',
                      }}
                    />
                    <Legend
                      formatter={(value) => (
                        <span style={{ color: '#fff', fontFamily: 'Share Tech Mono' }}>
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Latest Activities */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Share Tech Mono',
                  color: 'var(--neon-purple)',
                  mb: 2,
                  fontSize: { xs: '1rem', sm: '1.25rem' }
                }}
              >
                latest.activities
              </Typography>
              {latestActivities.map((activity) => (
                <Box
                  key={activity.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 2,
                    p: 2,
                    borderRadius: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {getActivityIcon(activity.type)}
                  <Box>
                    <Typography
                      sx={{
                        color: '#fff',
                        fontFamily: 'Share Tech Mono',
                      }}
                    >
                      {activity.message}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#666',
                        fontFamily: 'Share Tech Mono',
                      }}
                    >
                      {formatTime(activity.time)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics; 