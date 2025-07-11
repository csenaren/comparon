import React from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button, 
  Chip,
  CardActions,
  Box,
  useTheme
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ProductCard = ({ product, isSelected, onCompareToggle }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  // Function to dynamically import images
  const getProductImage = (imageName) => {
    try {
      // This webpack context will include all files in src/images
      const imageContext = require.context('../images', false, /\.(png|jpe?g|svg)$/);
      return imageContext(`./${imageName}`);
    } catch (error) {
      console.error(`Error loading image: ${imageName}`, error);
      // Fallback to a placeholder if image doesn't exist
      try {
        return require('../images/placeholder.jpg');
      } catch {
        return ''; // Empty string as last resort
      }
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: isSelected 
          ? (isDarkMode ? theme.palette.primary.light : theme.palette.primary.main)
          : 'transparent',
        transition: 'all 0.3s ease',
        backgroundColor: isDarkMode ? theme.palette.grey[800] : '#ffffff',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 3,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={getProductImage(product.image)}
        alt={product.name}
        sx={{ 
          objectFit: 'contain', 
          p: 2,
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.00)'
        }}
        onError={(e) => {
          e.target.src = ''; // Clear broken image
          try {
            e.target.src = require('../images/placeholder.jpg');
          } catch {
            // If placeholder doesn't exist, just leave it empty
          }
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600 }}>
          {product.name}
        </Typography>
        <Chip 
          label={product.brand} 
          size="small" 
          color={isDarkMode ? "secondary" : "primary"}
          sx={{ mb: 1.5 }}
        />
        <Box sx={{ mb: 2 }}>
          {Object.entries(product.features).map(([key, value]) => (
            <Typography 
              key={key} 
              variant="body2" 
              sx={{ 
                color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                mb: 0.5
              }}
            >
              <strong style={{ color: isDarkMode ? '#BB86FC' : '#3f51b5' }}>{key}:</strong> {value}
            </Typography>
          ))}
        </Box>
        <Typography 
          variant="h6" 
          sx={{ 
            color: isDarkMode ? theme.palette.secondary.light : theme.palette.primary.main,
            fontWeight: 700
          }}
        >
          ₹{product.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant={isSelected ? "contained" : "outlined"}
          color={isDarkMode ? "secondary" : "primary"}
          startIcon={isSelected ? <CheckCircleIcon /> : null}
          onClick={() => onCompareToggle(product.id)}
          size="medium"
          sx={{
            fontWeight: 600,
            letterSpacing: 0.5,
            background: isSelected
              ? (isDarkMode
                  ? 'linear-gradient(135deg, rgba(187, 134, 252, 0.2) 0%, rgba(3, 218, 198, 0.2) 100%)'
                  : 'linear-gradient(135deg, rgba(63, 81, 181, 0.1) 0%, rgba(156, 39, 176, 0.1) 100%)')
              : 'transparent',
            color: isSelected
              ? (isDarkMode ? '#BB86FC' : theme.palette.primary.main)
              : 'inherit',
            borderColor: isDarkMode ? '#BB86FC' : theme.palette.primary.main,
            '&:hover': {
              color: '#f5f5f5',
              background: isDarkMode
                ? 'linear-gradient(135deg, rgba(187, 134, 252, 0.6) 0%, rgba(3, 218, 198, 0.6) 100%)'
                : 'linear-gradient(135deg, rgba(12, 12, 122, 0.8) 0%, rgba(61, 5, 87, 0.8) 100%)',
              borderColor: isDarkMode ? '#BB86FC' : theme.palette.primary.dark,
            },
          }}
        >
          {isSelected ? 'Selected' : 'Compare'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;