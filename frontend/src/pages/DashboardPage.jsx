import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, TextField, MenuItem } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ category: '', product: '' });
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
  });

  useEffect(() => {
    // Buscar pedidos, categorias e produtos da API
    const fetchData = async () => {
      try {
        const ordersResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders`);
        const ordersData = await ordersResponse.json();

        const categoriesResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories`);
        const categoriesData = await categoriesResponse.json();

        const productsResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
        const productsData = await productsResponse.json();

        setOrders(ordersData);
        setCategories(categoriesData);
        setProducts(productsData);

        calculateMetrics(ordersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateMetrics = (filteredOrders) => {
    const totalOrders = filteredOrders.length;
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + (order.total || 0), 0);
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    setMetrics({ totalOrders, totalRevenue, avgOrderValue });
  };

  // Filtrar pedidos com base nos filtros selecionados
  const getFilteredOrders = () => {
    return orders.filter((order) => {
      const categoryMatch =
          !filters.category || order.categoryIds?.includes(filters.category);
      const productMatch =
          !filters.product || order.productIds?.includes(filters.product);
      return categoryMatch && productMatch;
    });
  };

  // Atualizar métricas sempre que os filtros mudarem
  useEffect(() => {
    const filteredOrders = getFilteredOrders();
    calculateMetrics(filteredOrders);
  }, [filters]);

  const orderDataByMonth = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Orders',
        data: Array(12)
            .fill(0)
            .map((_, i) =>
                getFilteredOrders().filter((order) => new Date(order.date).getMonth() === i).length
            ),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        {/* Filtros */}
        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
          <Grid item xs={12} md={6}>
            <TextField
                select
                label="Filter by Category"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                fullWidth
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
                select
                label="Filter by Product"
                value={filters.product}
                onChange={(e) => setFilters({ ...filters, product: e.target.value })}
                fullWidth
            >
              <MenuItem value="">All Products</MenuItem>
              {products.map((product) => (
                  <MenuItem key={product._id} value={product._id}>
                    {product.name}
                  </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Métricas */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Orders</Typography>
                <Typography variant="h4">{metrics.totalOrders}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Revenue</Typography>
                <Typography variant="h4">${metrics.totalRevenue.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Avg Order Value</Typography>
                <Typography variant="h4">${metrics.avgOrderValue.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Gráfico */}
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Orders by Month
            </Typography>
            <Bar data={orderDataByMonth} />
          </Grid>
        </Grid>
      </Container>
  );
};

export default DashboardPage;