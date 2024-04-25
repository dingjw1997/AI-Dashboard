import React, { useRef, useState } from 'react';
import { TextField, Stack, Typography, Button } from '@mui/material';
import Header from '../../components/Header/Header';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyCAsD-i96MvX_5hYspEVP4j3TczFdCHMYE",
  authDomain: "interactive-dashboard-66abf.firebaseapp.com",
  databaseURL: "https://interactive-dashboard-66abf-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "interactive-dashboard-66abf",
  storageBucket: "interactive-dashboard-66abf.appspot.com",
  messagingSenderId: "540835068994",
  appId: "1:540835068994:web:bf6848691b4c238c48c1db"
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
  const [submitted, setSubmitted] = useState(false);

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

      // Set submitted to true
      setSubmitted(true);

      // Clear the form after 3 seconds
      setTimeout(() => {
        setAddress({
          country:'',
          street: '',
          city: '',
          state: '',
          postcode: ''
        });
        setSubmitted(false);
      }, 3000);
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

        {submitted && <Typography variant="h6">Submitted</Typography>}

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
