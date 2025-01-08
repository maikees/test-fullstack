import React from 'react';
import ProductForm from './ProductForm';

export default {
  title: 'Components/ProductForm',
  component: ProductForm,
  argTypes: { onSave: { action: 'onSave' }, onCancel: { action: 'onCancel' } },
};

const Template = (args) => <ProductForm {...args} />;

export const AddProduct = Template.bind({});
AddProduct.args = {
  product: {},
  onSave: (data) => {
    console.log('Saved Product:', data);
  },
  onCancel: () => {
    console.log('Canceled');
  },
};

export const EditProduct = Template.bind({});
EditProduct.args = {
  product: {
    _id: '64b1fbb8e2a49c1e8c7f3b03',
    name: 'Product A',
    description: 'A description of Product A',
    price: 100,
    categoryIds: ['64b1fbb8e2a49c1e8c7f3b01', '64b1fbb8e2a49c1e8c7f3b02'],
  },
  onSave: (data) => {
    console.log('Updated Product:', data);
  },
  onCancel: () => {
    console.log('Canceled');
  },
};

export const WithCategories = Template.bind({});
WithCategories.args = {
  product: {
    name: '',
    description: '',
    price: '',
    categoryIds: [],
  },
  onSave: (data) => {
    console.log('Saved Product with Categories:', data);
  },
  onCancel: () => {
    console.log('Canceled');
  },
};

WithCategories.decorators = [
  (Story) => {
    const mockCategories = [
      { _id: '64b1fbb8e2a49c1e8c7f3b01', name: 'Category 1' },
      { _id: '64b1fbb8e2a49c1e8c7f3b02', name: 'Category 2' },
      { _id: '64b1fbb8e2a49c1e8c7f3b03', name: 'Category 3' },
    ];

    // Mocking fetch
    global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockCategories),
        })
    );

    return <Story />;
  },
];