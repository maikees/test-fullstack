import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';
import UploadImage from '../components/UploadImage';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`)
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const handleSave = (product) => {
    if (product._id) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      }).then(() => {
        setProducts((prev) =>
          prev.map((p) => (p.id === product._id ? product : p))
        );
        setSelectedProduct(null);
      });
    } else {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((newProduct) => {
          setProducts((prev) => [...prev, newProduct]);
          setSelectedProduct(null);
        });
    }
  };

  const handleImageUpload = (imageUrl) => {
    if (selectedProduct) {
      setSelectedProduct({ ...selectedProduct, imageUrl });
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setSelectedProduct({})}
      >
        Add Product
      </Button>
      <ProductTable
        products={products}
        onEdit={setSelectedProduct}
        onDelete={(id) =>
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`, { method: 'DELETE' }).then(() =>
            setProducts((prev) => prev.filter((p) => p.id !== id))
          )
        }
      />
      {selectedProduct && (
        <>
          <UploadImage onUpload={handleImageUpload} />
          <ProductForm
            product={selectedProduct}
            onCancel={() => setSelectedProduct(null)}
            onSave={handleSave}
          />
        </>
      )}
    </Container>
  );
};

export default ProductsPage;