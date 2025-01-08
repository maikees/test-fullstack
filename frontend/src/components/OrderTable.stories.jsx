import React from 'react';
import OrderTable from './OrderTable';

export default {
    title: 'Components/OrderTable',
    component: OrderTable,
};

const Template = (args) => <OrderTable {...args} />;

export const Default = Template.bind({});
Default.args = {
    orders: [
        { _id: 1, date: '2023-01-01', total: 100.0 },
        { _id: 2, date: '2023-01-02', total: 200.0 },
    ],
    onEdit: (order) => alert(`Edit Order ID: ${order._id}`),
    onDelete: (id) => alert(`Delete Order with ID ${id}`),
};
