import React, { useRef, useState } from 'react';
import { TextField, MenuItem, FormControl, InputLabel, Stack, Typography, Button, Slide, Zoom, Select, SelectChangeEvent } from '@mui/material';
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
  // Asset Info 
  const [assetInfo, setAssetInfo] = useState({
    assetName: '',
    assetMaterialType: ''
  });
  // Address Info
  const [address, setAddress] = useState({
    country: '',
    street: '',
    city: '',
    state: '',
    postcode: ''
  });

  const handleAssetInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target as HTMLInputElement; // Use type assertion to ensure it's an input element
    setAssetInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  

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
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          file.type === 'image/tif') {
        console.log('File Uploaded:', file);
      } else {
        alert('Please upload only .xlsx or .tif files.');
      }
    }
  };

  return (
    <div>
      <Header />
      <Stack spacing={2} pt={2} px={3} alignItems="center" sx={{ height: "100vh" }}>
        
        <Typography variant="h4" component="h4">Asset Information</Typography>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          {/* Asset Name */}
          <TextField 
            id="asset-name-field" 
            label="Asset Name" 
            variant="outlined" 
            name="assetName" 
            value={assetInfo.assetName} 
            onChange={handleAssetInfoChange} 
            sx={{ minWidth: "45%" }}
          />
        </Slide>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          {/* Asset Material Type */}
          <FormControl variant="outlined" sx={{ minWidth: "45%" }}>
            <InputLabel id="asset-material-type-label">Asset Material Type</InputLabel>
            <Select
              labelId="asset-material-type-label"
              id="asset-material-type-select"
              value={assetInfo.assetMaterialType}
              onChange={handleAssetInfoChange}
              label="Asset Material Type"
            >
              <MenuItem value="Concrete">Concrete</MenuItem>
              <MenuItem value="Wood">Wood</MenuItem>
              <MenuItem value="Asphalt">Asphalt</MenuItem>
            </Select>
          </FormControl>
        </Slide>

        <Typography variant="h4" component="h4">Location</Typography>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <TextField 
            id="country-field" 
            label="Country" 
            variant="outlined" 
            name="country" 
            value={address.country} 
            onChange={handleAddressChange} 
            sx={{ minWidth: "45%" }}
          />
        </Slide>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <TextField 
            id="street-field" 
            label="Street" 
            variant="outlined" 
            name="street" 
            value={address.street} 
            onChange={handleAddressChange} 
            sx={{ minWidth: "45%" }}
          />
        </Slide>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <TextField 
            id="city-field" 
            label="City" 
            variant="outlined" 
            name="city" 
            value={address.city} 
            onChange={handleAddressChange} 
            sx={{ minWidth: "45%" }}
          />
        </Slide>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <TextField 
            id="state-field" 
            label="State" 
            variant="outlined" 
            name="state" 
            value={address.state} 
            onChange={handleAddressChange} 
            sx={{ minWidth: "45%" }}
          />
        </Slide>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <TextField 
            id="postcode-field" 
            label="Postcode" 
            variant="outlined" 
            name="postcode" 
            value={address.postcode} 
            onChange={handleAddressChange} 
            sx={{ minWidth: "45%" }}
          />
        </Slide>

        <input
          type="file"
          accept=".xlsx,.tif"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />

        <Zoom in={true}>
          <Button 
            variant="contained" 
            onClick={handleClick}
            sx={{ height: "2.7rem", minWidth: "45%" }}
          >
            Upload Files
          </Button>
        </Zoom>
      </Stack>
    </div>
  );
}

export default Upload;
