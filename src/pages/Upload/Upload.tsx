/* eslint-disable no-lone-blocks */
import React, { useRef, useState } from 'react';
import { TextField, Stack, Typography, Button } from '@mui/material';
import Header from '../../components/Header/Header';

function Upload() {

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState({
    country:'',
    street: '',
    city: '',
    state: '',
    postcode: ''
  });
  
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      // Check file type is .xlsx or .tiff
      if (
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'image/tiff'
      ) {
        // Handle file upload here
        console.log('File Uploaded:', file);
      } else {
        alert('Please upload only .xlsx or .tiff files.');
      }
    }
  };

  return (
    <div>
      <Header />
      <Stack spacing={2} pt={2} px={3} alignItems="center" sx={{ height: "100vh" }}>
        <Typography variant="h4" component="h4">Location</Typography>

        <TextField 
          id="country-field" 
          label="Country" 
          variant="outlined" 
          name="country" 
          value={address.country} 
          onChange={handleAddressChange} 
          sx={{ minWidth: "45%" }}
        />
        <TextField 
          id="street-field" 
          label="Street" 
          variant="outlined" 
          name="street" 
          value={address.street} 
          onChange={handleAddressChange} 
          sx={{ minWidth: "45%" }}
        />
        <TextField 
          id="city-field" 
          label="City" 
          variant="outlined" 
          name="city" 
          value={address.city} 
          onChange={handleAddressChange} 
          sx={{ minWidth: "45%" }}
        />
        <TextField 
          id="state-field" 
          label="State" 
          variant="outlined" 
          name="state" 
          value={address.state} 
          onChange={handleAddressChange} 
          sx={{ minWidth: "45%" }}
        />
        <TextField 
          id="postcode-field" 
          label="Postcode" 
          variant="outlined" 
          name="postcode" 
          value={address.postcode} 
          onChange={handleAddressChange} 
          sx={{ minWidth: "45%" }}
        />

        <input
          type="file"
          accept=".xlsx,.tiff"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />

        <Button 
          variant="contained" 
          onClick={handleClick}
          sx={{ height: "2.7rem", minWidth: "45%" }}
        >
          Upload Files
        </Button>
      </Stack>
    </div>
  );
}

export default Upload;

