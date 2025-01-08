import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

const CategoryTable = ({ categories, onEdit, onDelete }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {categories.map((category) => (
                    <TableRow key={category._id}>
                        <TableCell>{category._id}</TableCell>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>
                            <Button onClick={() => onEdit(category)} color="primary">Edit</Button>
                            <Button onClick={() => onDelete(category._id)} color="secondary">Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default CategoryTable;
