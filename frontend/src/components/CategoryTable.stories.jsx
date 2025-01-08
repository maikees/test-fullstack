import React from 'react';
import CategoryTable from './CategoryTable';

export default {
    title: 'Components/CategoryTable',
    component: CategoryTable,
};

const Template = (args) => <CategoryTable {...args} />;

export const Default = Template.bind({});
Default.args = {
    categories: [
        { _id: 1, name: 'Category 1' },
        { _id: 2, name: 'Category 2' },
    ],
    onEdit: (category) => alert(`Edit ${category.name}`),
    onDelete: (id) => alert(`Delete Category with ID ${id}`),
};