import React from 'react';
import ProductTable from './ProductTable';

export default {
  title: 'Components/ProductTable',
  component: ProductTable,
};

const Template = (args) => <ProductTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  products: [
    { id: 1, name: 'Product 1', description: 'Description 1', price: 10.0 },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 20.0 },
  ],
  onEdit: (product) => alert(`Edit ${product.name}`),
  onDelete: (id) => alert(`Delete Product with ID ${id}`),
};