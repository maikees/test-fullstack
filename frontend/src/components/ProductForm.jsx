import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const ProductForm = ({ product, onCancel, onSave }) => {
  const [formData, setFormData] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
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
          value={formData.name || ''}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          margin="normal"
          value={formData.description || ''}
          onChange={handleChange}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          fullWidth
          margin="normal"
          value={formData.price || ''}
          onChange={handleChange}
        />
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
