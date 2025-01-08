import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  DialogContent,
  DialogActions,
} from '@mui/material';

const OrderForm = ({ order = {}, onSave, onCancel }) => {
  const [date, setDate] = useState('');
  const [productIds, setProductIds] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

  // Sincronizar estados com o pedido atual
  useEffect(() => {
    if (order) {
      setDate(order.date ? new Date(order.date).toISOString().split('T')[0] : ''); // Converter data para YYYY-MM-DD
      setProductIds(order.productIds || []);
      setTotal(order.total || 0);
    }
  }, [order]);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      ...order,
      date,
      productIds,
      total: parseFloat(total),
    });
  };

  return (
      <>
        <DialogContent>
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
                              .map((id) => products.find((product) => product._id === id)?.name || id.name)
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
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </>
  );
};

export default OrderForm;
