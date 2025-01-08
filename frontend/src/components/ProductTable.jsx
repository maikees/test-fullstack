import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const ProductTable = ({ products, onEdit, onDelete }) => {
  const [categories, setCategories] = useState([]);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories`);
        const data = await response.json();
        setCategories(data); // Assuming the API returns an array of categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Helper function to get category names from categoryIds
  const getCategoryNames = (categoryIds) => {
    return categoryIds
        .map((category) => category?.name || 'Unknown Category')
        .join(', ');
  };

  return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Categories</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{getCategoryNames(product.categoryIds)}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" onClick={() => onEdit(product)}>
                      Edit
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => onDelete(product._id)}
                        style={{ marginLeft: '10px' }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default ProductTable;
