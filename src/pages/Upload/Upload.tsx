import React, { useRef, useState } from 'react';
import { TextField, Stack, Typography, Button, Slide, Zoom } from '@mui/material';
import Header from '../../components/Header/Header';

function Upload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Asset Info 
  const [assetInfo, setAssetInfo] = useState({
    assetName: '',
    assetMaterialType: '' // ADD MORE IN FUTURE
  });
  // Address Info
  const [address, setAddress] = useState({
    country: '',
    street: '',
    city: '',
    state: '',
    postcode: ''
  });

  const handleAssetInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
          file.type === 'image/tiff') {
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
          <TextField 
            id="asset-material-type-field" 
            label="Asset Material Type" 
            variant="outlined" 
            name="assetMaterialType" 
            value={assetInfo.assetMaterialType} 
            onChange={handleAssetInfoChange} 
            sx={{ minWidth: "45%" }}
          />
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
