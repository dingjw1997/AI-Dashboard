import React, { useRef, useState } from 'react';
import { TextField, Stack, Typography, Button } from '@mui/material';
import Header from '../../components/Header/Header';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyCmawz87VJsvhZRWZlIVqnhRdDwZ0X3yKE",
  authDomain: "reactfirebase-3e370.firebaseapp.com",
  databaseURL: "https://reactfirebase-3e370-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "reactfirebase-3e370",
  storageBucket: "reactfirebase-3e370.appspot.com",
  messagingSenderId: "1080268037849",
  appId: "1:1080268037849:web:b9befaffc08e90400c28c8"
};

firebase.initializeApp(firebaseConfig);

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
      // Save file information to the database
      const fileData = {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      };

      // Include address information
      const dataToSend = {
        address,
        file: fileData
      };

      const dbRef = firebase.database().ref('uploads');
      dbRef.push(dataToSend);
      console.log('Data Uploaded:', dataToSend);
      console.log('File Uploaded:', file);
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
          data-testid="file-input"
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
