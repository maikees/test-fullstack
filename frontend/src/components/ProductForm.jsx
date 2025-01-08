import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

const ProductForm = ({ product = {}, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    name: product.name || '',
    description: product.description || '',
    price: product.price || '',
    categoryIds: product.categoryIds || [],
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, categoryIds: e.target.value });
  };

  const handleSubmit = () => {
    // Passa os dados para o componente pai, que decidirá entre POST ou PUT
    onSave({ ...formData, _id: product._id });
  };

  return (
      <Dialog open onClose={onCancel}>
        <DialogTitle>{product._id ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <TextField
              label="Name"
              name="name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
          />
          <TextField
              label="Description"
              name="description"
              fullWidth
              margin="normal"
              value={formData.description}
              onChange={handleChange}
          />
          <TextField
              label="Price"
              name="price"
              type="number"
              fullWidth
              margin="normal"
              value={formData.price}
              onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="categories-label">Categories</InputLabel>
            <Select
                labelId="categories-label"
                multiple
                value={formData.categoryIds}
                onChange={handleCategoryChange}
                renderValue={(selected) =>
                    selected
                        .map((id) => categories.find((category) => category._id === id)?.name || id)
                        .join(', ')
                }
            >
              {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default ProductForm;
