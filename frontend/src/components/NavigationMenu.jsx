import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Tabs, Tab, Typography } from '@mui/material';

const NavigationMenu = () => {
    const location = useLocation();

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    My Test
                </Typography>
                <Tabs
                    value={location.pathname} // Define a aba ativa com base na rota
                    textColor="inherit"
                    indicatorColor="secondary"
                >
                    <Tab
                        label="Products"
                        value="/products"
                        component={Link}
                        to="/products"
                    />
                    <Tab
                        label="Categories"
                        value="/categories"
                        component={Link}
                        to="/categories"
                    />
                    <Tab
                        label="Orders"
                        value="/orders"
                        component={Link}
                        to="/orders"
                    />
                    <Tab
                        label="Dashboard"
                        value="/dashboard"
                        component={Link}
                        to="/dashboard"
                    />
                </Tabs>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationMenu;