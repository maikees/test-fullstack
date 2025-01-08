import React, { useState } from 'react';
import { Button, TextField, Typography, CircularProgress } from '@mui/material';

const UploadImage = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      // Step 1: Get a presigned URL from the backend
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/upload-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name }),
      });

      const { url } = await response.json();

      // Step 2: Upload the file to S3 using the presigned URL
      await fetch(url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      // Extract the S3 public URL (example for LocalStack)
      const publicUrl = url.split('?')[0];
      setImageUrl(publicUrl);
      onUpload(publicUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Upload Product Image
      </Typography>
      <input type="file" onChange={handleFileChange} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? <CircularProgress size={20} /> : 'Upload'}
      </Button>
      {imageUrl && (
        <div>
          <Typography variant="subtitle1">Uploaded Image:</Typography>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '10px' }} />
        </div>
      )}
    </div>
  );
};

export default UploadImage;