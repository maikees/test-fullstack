import React from 'react';
import OrderForm from './OrderForm';

export default {
    title: 'Components/OrderForm',
    component: OrderForm,
};

const Template = (args) => <OrderForm {...args} />;

export const Default = Template.bind({});
Default.args = {
    order: { date: '2023-01-01', productIds: ['1', '2'], total: 150.0 },
    onSave: (order) => alert(`Saved: ${JSON.stringify(order)}`),
    onCancel: () => alert('Cancelled'),
};
