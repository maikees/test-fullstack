import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

const OrderTable = ({ orders, onEdit, onDelete }) => {
  return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Button onClick={() => onEdit(order)} color="primary">Edit</Button>
                  <Button onClick={() => onDelete(order._id)} color="secondary">Delete</Button>
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
  );
};

export default OrderTable;