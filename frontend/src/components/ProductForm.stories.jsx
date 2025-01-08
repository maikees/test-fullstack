import React from 'react';
import ProductForm from './ProductForm';

export default {
  title: 'Components/ProductForm',
  component: ProductForm,
};

const Template = (args) => <ProductForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  product: { name: 'Sample Product', description: 'Sample Description', price: 50 },
  onSave: (product) => alert(`Saved: ${JSON.stringify(product)}`),
  onCancel: () => alert('Cancelled'),
};
