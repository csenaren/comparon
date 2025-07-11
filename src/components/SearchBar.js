import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: searchTerm && (
          <InputAdornment position="end">
            <IconButton 
              onClick={() => onSearchChange('')}
              edge="end"
              aria-label="clear search"
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{ 
        mb: 3,
        backgroundColor: 'background.paper',
        borderRadius: 1
      }}
    />
  );
};

export default SearchBar;