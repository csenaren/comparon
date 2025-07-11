import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        backgroundColor: 'transparent',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Comparon - Product Comparison Tool
      </Typography>
    </Box>
  );
};

export default Footer;