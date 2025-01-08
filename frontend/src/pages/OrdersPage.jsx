import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Dialog } from '@mui/material';
import OrderTable from '../components/OrderTable';
import OrderForm from '../components/OrderForm';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders`)
            .then((res) => res.json())
            .then(setOrders);
    }, []);

    const handleSave = (order) => {
        if (order._id) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/${order._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order),
            }).then(() => {
                setOrders((prev) =>
                    prev.map((o) => (o._id === order._id ? order : o))
                );
                setSelectedOrder(null);
            });
        } else {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order),
            })
                .then((res) => res.json())
                .then((newOrder) => {
                    setOrders((prev) => [...prev, newOrder]);
                    setSelectedOrder(null);
                });
        }
    };

    const handleAddOrder = () => {
        setSelectedOrder({ date: '', productIds: [], total: 0 });
    };

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Orders
            </Typography>
            <Button variant="contained" color="primary" onClick={handleAddOrder}>
                Add Order
            </Button>
            <OrderTable
                orders={orders}
                onEdit={handleEditOrder}
                onDelete={(id) =>
                    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/${id}`, { method: 'DELETE' }).then(() =>
                        setOrders((prev) => prev.filter((o) => o._id !== id))
                    )
                }
            />
            <Dialog open={Boolean(selectedOrder)} onClose={() => setSelectedOrder(null)} fullWidth maxWidth="sm">
                <OrderForm
                    order={selectedOrder}
                    onCancel={() => setSelectedOrder(null)}
                    onSave={handleSave}
                />
            </Dialog>
        </Container>
    );
};

export default OrdersPage;
