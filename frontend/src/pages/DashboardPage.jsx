import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
  });

  useEffect(() => {
    // Buscar pedidos e categorias da API
    const fetchData = async () => {
      try {
        const ordersResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders`);
        const ordersData = await ordersResponse.json();

        const categoriesResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories`);
        const categoriesData = await categoriesResponse.json();

        setOrders(ordersData);
        setCategories(categoriesData);

        calculateMetrics(ordersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateMetrics = (orders) => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    setMetrics({ totalOrders, totalRevenue, avgOrderValue });
  };

  const orderDataByMonth = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Orders',
        data: Array(12)
            .fill(0)
            .map((_, i) =>
                orders.filter((order) => new Date(order.date).getMonth() === i).length
            ),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const categoryDistribution = {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        data: categories.map(
            (category) =>
                orders.filter((order) => order.categoryIds?.includes(category._id)).length
        ),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };

  return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
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

        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Orders by Month
            </Typography>
            <Bar data={orderDataByMonth} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Orders by Category
            </Typography>
            <Pie data={categoryDistribution} />
          </Grid>
        </Grid>
      </Container>
  );
};

export default DashboardPage;