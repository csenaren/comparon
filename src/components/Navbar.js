import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <AppBar 
      position="static" 
      sx={{
        background: 'linear-gradient(90deg, rgba(6, 15, 84, 1) 0%, rgba(71, 7, 71, 1) 100%)',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#ffffff' }}>
          Comparon
        </Typography>
        <IconButton onClick={toggleDarkMode} color="inherit">
          {darkMode ? <Brightness7Icon sx={{ color: '#F5F5FF' }} /> : <Brightness4Icon sx={{ color: '#ffffff' }} />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;