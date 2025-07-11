import React, { useState, useEffect } from 'react';
import { 
  Box, 
  CssBaseline, 
  ThemeProvider, 
  createTheme,
  useMediaQuery,
  Container
} from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import ComparisonView from './components/ComparisonView';
import ProductCard from './components/ProductCard';
import products from './data/products';

function App() {
  // State management
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false); // Default to light mode

  // Create theme based on dark mode preference
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#3f51b5',
        light: '#757de8',
        dark: '#002984',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#f50057',
        light: '#ff4081',
        dark: '#c51162',
        contrastText: '#ffffff',
      },
      background: {
        default: 'linear-gradient(90deg, rgba(235, 240, 250, 1) 0%, rgba(242, 245, 255, 1) 27%, rgba(246, 253, 254, 1) 55%, rgba(255, 245, 255, 1) 100%)',
        paper: '#ffffff',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            fontWeight: 500,
            '&:hover': {
              color: '#f5f5f5',
              background: 'linear-gradient(90deg, rgba(12, 12, 122, 1) 0%, rgba(61, 5, 87, 1) 88%)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: '10px solid transparent',
            '&.selected': {
              borderColor: '#3f51b5',
            },
          },
        },
      },
    },
  });

  // Dark mode theme overrides
  const darkTheme = createTheme({
    ...theme,
    palette: {
      mode: 'dark',
      primary: {
        main: '#BB86FC',
        light: '#cf9efd',
        dark: '#8a56d4',
        contrastText: '#000000',
      },
      secondary: {
        main: '#03DAC6',
        light: '#66fff9',
        dark: '#00a895',
        contrastText: '#000000',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
    },
    components: {
      ...theme.components,
      MuiButton: {
        styleOverrides: {
          root: {
            ...theme.components.MuiButton.styleOverrides.root,
            '&:hover': {
              color: '#f5f5f5',
              background: 'linear-gradient(90deg, rgba(100, 100, 255, 0.4) 0%, rgba(150, 50, 150, 0.4) 100%)',
            },
          },
        },
      },
    },
  });

  // Load saved comparison items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('comparon_selected');
    if (saved) setSelectedIds(JSON.parse(saved));
  }, []);

  // Update selected products and save to localStorage
  useEffect(() => {
    setSelectedProducts(products.filter(p => selectedIds.includes(p.id)));
    localStorage.setItem('comparon_selected', JSON.stringify(selectedIds));
  }, [selectedIds]);

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle product selection for comparison
  const handleCompareToggle = (productId) => {
    setSelectedIds(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return prev.length < 3 ? [...prev, productId] : prev;
      }
    });
  };

  // Remove single product from comparison
  const handleRemove = (productId) => {
    setSelectedIds(prev => prev.filter(id => id !== productId));
  };

  // Clear all products from comparison
  const handleClear = () => {
    setSelectedIds([]);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          background: darkMode 
            ? '#121212'
            : 'linear-gradient(90deg, rgba(235, 240, 250, 1) 0%, rgba(242, 245, 255, 1) 27%, rgba(246, 253, 254, 1) 55%, rgba(255, 245, 255, 1) 100%)',
        }}
      >
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
        
        <Container 
          component="main" 
          maxWidth="xl"
          sx={{ 
            flex: 1, 
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 4
          }}
        >
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
          
          {/* Product Cards Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: { xs: 2, sm: 3 },
            }}
          >
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isSelected={selectedIds.includes(product.id)}
                onCompareToggle={handleCompareToggle}
              />
            ))}
          </Box>

          {/* Comparison View - Appears below product cards */}
          <ComparisonView 
            products={selectedProducts} 
            onRemove={handleRemove} 
            onClear={handleClear} 
          />
        </Container>
        
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;