import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import CategoryTable from '../components/CategoryTable';
import CategoryForm from '../components/CategoryForm';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories`)
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  const handleSave = (category) => {
    if (category._id) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories/${category._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      }).then(() => {
        setCategories((prev) =>
          prev.map((c) => (c.id === category._id ? category : c))
        );
        setSelectedCategory(null);
      });
    } else {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      })
        .then((res) => res.json())
        .then((newCategory) => {
          setCategories((prev) => [...prev, newCategory]);
          setSelectedCategory(null);
        });
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setSelectedCategory({})}
      >
        Add Category
      </Button>
      <CategoryTable
        categories={categories}
        onEdit={setSelectedCategory}
        onDelete={(id) =>
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories/${id}`, { method: 'DELETE' }).then(() =>
            setCategories((prev) => prev.filter((c) => c.id !== id))
          )
        }
      />
      {selectedCategory && (
        <CategoryForm
          category={selectedCategory}
          onCancel={() => setSelectedCategory(null)}
          onSave={handleSave}
        />
      )}
    </Container>
  );
};

export default CategoriesPage;