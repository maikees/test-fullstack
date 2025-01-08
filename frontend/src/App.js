import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';
import OrdersPage from './pages/OrdersPage';
import DashboardPage from './pages/DashboardPage';
import NavigationMenu from './components/NavigationMenu'; // Importa o novo componente

const App = () => {
    return (
        <Router>
            {/* Menu de navegação usando Material-UI */}
            <NavigationMenu />

            {/* Configuração de rotas */}
            <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
        </Router>
    );
};

export default App;