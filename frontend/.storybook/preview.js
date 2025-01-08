import { CssBaseline } from '@mui/material';
import React from 'react';

export const decorators = [
  (Story) => (
    <>
      <CssBaseline />
      <Story />
    </>
  ),
];