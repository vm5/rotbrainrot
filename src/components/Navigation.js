import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
  Fade,
  SwipeableDrawer,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Chat as ChatIcon,
  Analytics as AnalyticsIcon,
  Book as JournalIcon,
  Notifications as RemindersIcon,
  LibraryBooks as ResourcesIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 240;

const menuItems = [
  { text: 'AI Chat', icon: <ChatIcon />, path: '/chat' },
  { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
  { text: 'Journal', icon: <JournalIcon />, path: '/journal' },
  { text: 'Reminders', icon: <RemindersIcon />, path: '/reminders' },
  { text: 'Resources', icon: <ResourcesIcon />, path: '/resources' },
];

const Navigation = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const getPageTitle = () => {
    const menuItem = menuItems.find(item => item.path === location.pathname);
    return menuItem?.text || (isMobile ? 'rot.exe' : 'rotBRAINrot.exe');
  };

  const drawer = (
    <Box className="glass-morphism" sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* User Profile Section */}
      <Fade in timeout={500}>
        <Box sx={{ 
          p: { xs: 2, sm: 3 }, 
          textAlign: 'center',
          borderBottom: '1px solid rgba(0, 255, 157, 0.1)',
        }}>
          <Avatar 
            src={user?.picture}
            sx={{ 
              width: { xs: 56, sm: 64 }, 
              height: { xs: 56, sm: 64 }, 
              margin: '0 auto',
              mb: 1,
              border: '2px solid var(--neon-green)',
              boxShadow: '0 0 10px rgba(0, 255, 157, 0.3)',
            }}
          />
          <Typography
            className="terminal-text"
            sx={{
              fontSize: { xs: '1rem', sm: '1.1rem' },
              mb: 0.5,
            }}
          >
            {user?.name || 'user.anon'}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'Fira Code',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: { xs: '0.75rem', sm: '0.8rem' },
            }}
          >
            {user?.email || 'anonymous@system'}
          </Typography>
        </Box>
      </Fade>

      {/* Navigation Items */}
      <List sx={{ 
        p: { xs: 1.5, sm: 2 },
        flex: 1,
        overflowY: 'auto',
      }}>
        {menuItems.map((item, index) => (
          <Fade in timeout={500 + (index * 100)}>
            <ListItem
              button
              key={item.text}
              onClick={() => handleNavigation(item.path)}
              sx={{
                mb: 1,
                borderRadius: 1,
                backgroundColor: location.pathname === item.path ? 'rgba(0, 255, 157, 0.1)' : 'transparent',
                border: location.pathname === item.path ? '1px solid var(--neon-green)' : '1px solid transparent',
                '&:hover': {
                  backgroundColor: 'rgba(0, 255, 157, 0.1)',
                  border: '1px solid var(--neon-green)',
                  transform: 'translateX(4px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <ListItemIcon sx={{ 
                color: location.pathname === item.path ? 'var(--neon-green)' : 'rgba(255, 255, 255, 0.6)',
                minWidth: { xs: 36, sm: 40 },
                transition: 'color 0.3s ease',
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{
                  '& .MuiListItemText-primary': {
                    fontFamily: 'Share Tech Mono',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    color: location.pathname === item.path ? 'var(--neon-green)' : '#fff',
                    transition: 'color 0.3s ease',
                  },
                }}
              />
            </ListItem>
          </Fade>
        ))}
      </List>

      {/* Logout Button */}
      <Fade in timeout={1000}>
        <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
          <ListItem
            button
            onClick={logout}
            sx={{
              borderRadius: 1,
              border: '1px solid var(--neon-pink)',
              '&:hover': {
                backgroundColor: 'rgba(255, 113, 206, 0.1)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ListItemIcon sx={{ 
              color: 'var(--neon-pink)', 
              minWidth: { xs: 36, sm: 40 },
            }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Logout" 
              sx={{
                '& .MuiListItemText-primary': {
                  fontFamily: 'Share Tech Mono',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  color: 'var(--neon-pink)',
                },
              }}
            />
          </ListItem>
        </Box>
      </Fade>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        className={`glass-morphism ${scrolled ? 'scrolled' : ''}`}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
          borderBottom: '1px solid rgba(0, 255, 157, 0.1)',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ 
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 1.5, sm: 3 },
        }}>
          <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: 'none' },
              color: 'var(--neon-green)',
              '&:hover': {
                backgroundColor: 'rgba(0, 255, 157, 0.1)',
                transform: 'rotate(180deg)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            className="terminal-text"
            sx={{ 
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              letterSpacing: '0.5px',
            }}
          >
            {getPageTitle()}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile Drawer */}
        {isMobile ? (
          <SwipeableDrawer
            variant="temporary"
            open={mobileOpen}
            onOpen={handleDrawerToggle}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { 
                width: drawerWidth,
                background: 'transparent',
              },
            }}
          >
            {drawer}
          </SwipeableDrawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { 
                width: drawerWidth,
                background: 'transparent',
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>
    </>
  );
};

export default Navigation; 