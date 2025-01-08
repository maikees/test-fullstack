import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, DialogContent, DialogActions } from '@mui/material';

const CategoryForm = ({ category = {}, onSave, onCancel }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(category?.name || ''); // Garante que não haverá erro caso category seja null
  }, [category]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ ...category, name }); // Envia os dados do formulário
  };

  return (
      <>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                    label="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </>
  );
};

export default CategoryForm;
