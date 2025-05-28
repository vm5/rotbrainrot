import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Link,
  Button,
  Chip,
  Stack,
  TextField,
  IconButton,
  Collapse,
  Rating,
} from '@mui/material';
import {
  Link as LinkIcon,
  Search as SearchIcon,
  Favorite as HeartIcon,
  FavoriteBorder as HeartEmptyIcon,
  ExpandMore as ExpandMoreIcon,
  Star as StarIcon,
  LocalHospital as EmergencyIcon,
  Psychology as TherapyIcon,
  SelfImprovement as WellnessIcon,
} from '@mui/icons-material';
import { useData } from '../context/DataContext';

const Resources = () => {
  const { updateActivity, addActivity } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteResources');
    return saved ? JSON.parse(saved) : [];
  });

  const resources = [
    {
      id: 'crisis',
      title: 'Crisis Support',
      icon: <EmergencyIcon />,
      color: 'var(--neon-pink)',
      description: 'immediate support when ur going through it bestie',
      links: [
        { 
          name: '988 Suicide & Crisis Lifeline',
          url: 'https://988lifeline.org/',
          description: '24/7 support line for anyone in crisis',
          tags: ['emergency', 'crisis', 'support'],
          rating: 5
        },
        { 
          name: 'Crisis Text Line',
          url: 'https://www.crisistextline.org/',
          description: 'text HOME to 741741 for crisis support',
          tags: ['texting', 'crisis', 'support'],
          rating: 5
        },
        { 
          name: 'SAMHSA National Helpline',
          url: 'https://www.samhsa.gov/find-help/national-helpline',
          description: '24/7 treatment referral and information',
          tags: ['referral', 'treatment', 'support'],
          rating: 4
        },
      ],
    },
    {
      id: 'mental-health',
      title: 'Mental Health Resources',
      icon: <TherapyIcon />,
      color: 'var(--neon-green)',
      description: 'level up ur mental health game fr fr',
      links: [
        { 
          name: 'National Alliance on Mental Illness',
          url: 'https://www.nami.org/',
          description: 'largest mental health organization spitting facts',
          tags: ['education', 'support', 'community'],
          rating: 5
        },
        { 
          name: 'Mental Health America',
          url: 'https://www.mhanational.org/',
          description: 'mental health resources and screening tools',
          tags: ['screening', 'resources', 'education'],
          rating: 4
        },
        { 
          name: 'Psychology Today',
          url: 'https://www.psychologytoday.com/',
          description: 'find therapists and mental health info',
          tags: ['therapy', 'articles', 'directory'],
          rating: 4
        },
      ],
    },
    {
      id: 'self-care',
      title: 'Self-Care Tools',
      icon: <WellnessIcon />,
      color: 'var(--neon-blue)',
      description: 'take care of urself bestie, no cap',
      links: [
        { 
          name: 'Headspace',
          url: 'https://www.headspace.com/',
          description: 'meditation and mindfulness app thats actually good',
          tags: ['meditation', 'mindfulness', 'sleep'],
          rating: 5
        },
        { 
          name: 'Calm',
          url: 'https://www.calm.com/',
          description: 'sleep stories and meditation vibes',
          tags: ['meditation', 'sleep', 'relaxation'],
          rating: 5
        },
        { 
          name: 'Insight Timer',
          url: 'https://insighttimer.com/',
          description: 'free meditation app with lots of options',
          tags: ['meditation', 'free', 'community'],
          rating: 4
        },
      ],
    },
  ];

  const handleToggleFavorite = (resourceName) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(resourceName)
        ? prev.filter(name => name !== resourceName)
        : [...prev, resourceName];
      localStorage.setItem('favoriteResources', JSON.stringify(newFavorites));
      return newFavorites;
    });

    addActivity({
      type: 'resource',
      message: `${favorites.includes(resourceName) ? 'Removed' : 'Added'} ${resourceName} ${favorites.includes(resourceName) ? 'from' : 'to'} favorites`,
      time: new Date().toISOString(),
    });
  };

  const handleExpandCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    updateActivity('Resources');
  };

  const handleResourceClick = (link) => {
    addActivity({
      type: 'resource',
      message: `Accessed ${link.name}`,
      time: new Date().toISOString(),
    });
  };

  const filteredResources = resources.map(category => ({
    ...category,
    links: category.links.filter(link =>
      link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(category => category.links.length > 0);

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
        resources.cfg
      </Typography>

      {/* Search Bar */}
      <Card
        sx={{
          mb: 4,
          background: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--neon-green)',
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              placeholder="search resources bestie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'var(--neon-green)', mr: 1 }} />,
                sx: {
                  fontFamily: 'Share Tech Mono',
                  color: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--neon-green)',
                  },
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <Card
          sx={{
            mb: 4,
            background: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--neon-pink)',
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <HeartIcon sx={{ color: 'var(--neon-pink)' }} />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Share Tech Mono',
                  color: 'var(--neon-pink)',
                }}
              >
                favorite.resources
              </Typography>
            </Box>
            <Stack spacing={1}>
              {resources.flatMap(category =>
                category.links.filter(link => favorites.includes(link.name))
              ).map(link => (
                <Box
                  key={link.name}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <LinkIcon sx={{ color: 'var(--neon-pink)' }} />
                  <Box sx={{ flex: 1 }}>
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleResourceClick(link)}
                      sx={{
                        color: '#fff',
                        textDecoration: 'none',
                        fontFamily: 'Share Tech Mono',
                        '&:hover': {
                          color: 'var(--neon-pink)',
                        },
                      }}
                    >
                      {link.name}
                    </Link>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        fontFamily: 'Fira Code',
                        fontSize: '0.8rem',
                      }}
                    >
                      {link.description}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => handleToggleFavorite(link.name)}
                    sx={{ color: 'var(--neon-pink)' }}
                  >
                    <HeartIcon />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Resource Categories */}
      <Grid container spacing={3}>
        {filteredResources.map((category) => (
          <Grid item xs={12} key={category.id}>
            <Card
              sx={{
                background: 'rgba(10, 10, 10, 0.95)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${category.color}`,
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ color: category.color }}>
                      {category.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: 'Share Tech Mono',
                        color: category.color,
                      }}
                    >
                      {category.title}
                    </Typography>
                  </Box>
                  <Button
                    onClick={() => handleExpandCategory(category.id)}
                    endIcon={
                      <ExpandMoreIcon
                        sx={{
                          transform: expandedCategory === category.id ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.2s',
                        }}
                      />
                    }
                    sx={{
                      color: category.color,
                      fontFamily: 'Share Tech Mono',
                    }}
                  >
                    {expandedCategory === category.id ? 'show less' : 'show more'}
                  </Button>
                </Box>

                <Typography
                  sx={{
                    fontFamily: 'Fira Code',
                    color: '#666',
                    mb: 2,
                  }}
                >
                  {category.description}
                </Typography>

                <Collapse in={expandedCategory === category.id}>
                  <Stack spacing={2}>
                    {category.links.map((link) => (
                      <Box
                        key={link.name}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 2,
                          p: 2,
                          borderRadius: 1,
                          backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        <LinkIcon sx={{ color: category.color, mt: 0.5 }} />
                        <Box sx={{ flex: 1 }}>
                          <Link
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleResourceClick(link)}
                            sx={{
                              color: '#fff',
                              textDecoration: 'none',
                              fontFamily: 'Share Tech Mono',
                              '&:hover': {
                                color: category.color,
                              },
                            }}
                          >
                            {link.name}
                          </Link>
                          <Typography
                            sx={{
                              color: '#666',
                              fontFamily: 'Fira Code',
                              fontSize: '0.9rem',
                              my: 1,
                            }}
                          >
                            {link.description}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              {link.tags.map((tag) => (
                                <Chip
                                  key={tag}
                                  label={tag}
                                  size="small"
                                  sx={{
                                    fontFamily: 'Share Tech Mono',
                                    backgroundColor: `${category.color}22`,
                                    color: category.color,
                                    border: `1px solid ${category.color}`,
                                  }}
                                />
                              ))}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Rating
                                value={link.rating}
                                readOnly
                                icon={<StarIcon sx={{ color: category.color }} />}
                                emptyIcon={<StarIcon sx={{ color: 'rgba(255, 255, 255, 0.2)' }} />}
                              />
                              <IconButton
                                onClick={() => handleToggleFavorite(link.name)}
                                sx={{ color: favorites.includes(link.name) ? 'var(--neon-pink)' : '#666' }}
                              >
                                {favorites.includes(link.name) ? <HeartIcon /> : <HeartEmptyIcon />}
                              </IconButton>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Resources; 