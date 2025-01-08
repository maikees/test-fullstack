import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const OrderForm = ({ order = {}, onSave, onCancel }) => {
  const [date, setDate] = useState(order.date || '');
  const [productIds, setProductIds] = useState(order.productIds || []);
  const [total, setTotal] = useState(order.total || 0);
  const [products, setProducts] = useState([]);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
        const data = await response.json();
        setProducts(data); // Assuming API returns an array of products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ ...order, date, productIds, total: parseFloat(total) });
  };

  return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="product-ids-label">Products</InputLabel>
              <Select
                  labelId="product-ids-label"
                  multiple
                  value={productIds}
                  onChange={(e) => setProductIds(e.target.value)}
                  renderValue={(selected) =>
                      selected
                          .map((id) => products.find((product) => product._id === id)?.name || id)
                          .join(', ')
                  }
              >
                {products.map((product) => (
                    <MenuItem key={product._id} value={product._id}>
                      {product.name}
                    </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
                label="Total"
                type="number"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={onCancel} variant="outlined" style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
  );
};

export default OrderForm;