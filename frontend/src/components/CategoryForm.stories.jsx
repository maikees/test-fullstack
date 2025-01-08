import React from 'react';
import CategoryForm from './CategoryForm';

export default {
    title: 'Components/CategoryForm',
    component: CategoryForm,
};

const Template = (args) => <CategoryForm {...args} />;

export const Default = Template.bind({});
Default.args = {
    category: { name: 'Sample Category' },
    onSave: (category) => alert(`Saved: ${JSON.stringify(category)}`),
    onCancel: () => alert('Cancelled'),
};
