import React from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Button,
  Typography,
  Box,
  Chip
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ClearAllIcon from '@mui/icons-material/ClearAll';

const ComparisonView = ({ products, onRemove, onClear }) => {
  if (products.length < 2) return null;

  const features = Object.keys(products[0].features);

  return (
    <Paper elevation={3} sx={{ mb: 4, p: 2 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2
        }}
      >
        <Typography variant="h5" component="h2">
          Product Comparison
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<ClearAllIcon />}
          onClick={onClear}
          size="small"
        >
          Clear All
        </Button>
      </Box>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              {products.map(product => (
                <TableCell key={product.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ flexGrow: 1 }}>{product.name}</Typography>
                    <Button 
                      size="small" 
                      onClick={() => onRemove(product.id)}
                      color="error"
                    >
                      <HighlightOffIcon fontSize="small" />
                    </Button>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {features.map(feature => (
              <TableRow key={feature}>
                <TableCell component="th" scope="row">
                  <strong>{feature}</strong>
                </TableCell>
                {products.map(product => (
                  <TableCell key={`${product.id}-${feature}`}>
                    {product.features[feature]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow sx={{ '&:last-child td': { borderBottom: 0 } }}>
              <TableCell component="th" scope="row">
                <strong>Price ₹</strong>
              </TableCell>
              {products.map(product => (
                <TableCell key={`${product.id}-price`}>
                  <Chip 
                    label={`${product.price}`} 
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ComparisonView;