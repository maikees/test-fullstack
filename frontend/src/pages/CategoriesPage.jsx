import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Dialog } from '@mui/material';
import CategoryTable from '../components/CategoryTable';
import CategoryForm from '../components/CategoryForm';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Fetch categories
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories`)
            .then((res) => res.json())
            .then(setCategories);
    }, []);

    // Handle saving categories (create or update)
    const handleSave = (category) => {
        if (category._id) {
            // Update category
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories/${category._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(category),
            }).then(() => {
                setCategories((prev) =>
                    prev.map((c) => (c._id === category._id ? category : c))
                );
                setSelectedCategory(null); // Fechar o modal
            });
        } else {
            // Create new category
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(category),
            })
                .then((res) => res.json())
                .then((newCategory) => {
                    setCategories((prev) => [...prev, newCategory]);
                    setSelectedCategory(null); // Fechar o modal
                });
        }
    };

    // Handle deleting categories
    const handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories/${id}`, { method: 'DELETE' }).then(() =>
            setCategories((prev) => prev.filter((c) => c._id !== id))
        );
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Categories
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setSelectedCategory({ name: '' })} // Abre o modal com um formulário vazio
            >
                Add Category
            </Button>
            <CategoryTable
                categories={categories}
                onEdit={setSelectedCategory} // Abre o modal para editar a categoria selecionada
                onDelete={handleDelete}
            />
            <Dialog
                open={Boolean(selectedCategory)}
                onClose={() => setSelectedCategory(null)}
                fullWidth
                maxWidth="sm"
            >
                <CategoryForm
                    category={selectedCategory}
                    onCancel={() => setSelectedCategory(null)} // Fecha o modal
                    onSave={handleSave} // Salva os dados
                />
            </Dialog>
        </Container>
    );
};

export default CategoriesPage;
