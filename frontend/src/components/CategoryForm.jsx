import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const CategoryForm = ({ category = {}, onSave, onCancel }) => {
  const [name, setName] = useState(category.name || '');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ ...category, name });
  };

  return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
                label="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={onCancel} variant="outlined" style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
  );
};

export default CategoryForm;
