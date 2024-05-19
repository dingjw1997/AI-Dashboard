import React, { useRef, useState } from 'react';
import { TextField, MenuItem, FormControl, InputLabel, Stack, Typography, Button, Slide, Select, SelectChangeEvent } from '@mui/material';
import Header from '../../components/Header/Header';
import firebase from '../../components/Database/FirebaseDatabase'; 

function Upload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const today = new Date().toISOString().slice(0, 10);

  const [assetInfo, setAssetInfo] = useState({
    assetName: '',
    assetNumber: '',
    assetCondition: '',
    assetMaterialType: ''
  });

  const [dateInfo, setDateInfo] = useState({
    dateUploaded: today,
    dateLastInspected: ''
  });

  const [address, setAddress] = useState({
    country:'',
    street: '',
    city: '',
    state: '',
    postcode: ''
  });

  const [inspectionNotes, setInspectionNotes] = useState({
    inspectionNotes: ''
  });

  const [submitted, setSubmitted] = useState(false);


  const handleAssetInfoChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const name = event.target.name;
    const value = event.target.value;
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

  const handleInspectionNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInspectionNotes(prevState => ({
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
        inspectionNotes,
        assetInfo,
        dateInfo,
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
        setInspectionNotes({
          inspectionNotes: ''
        }) 

        setDateInfo({
          dateUploaded: '',
          dateLastInspected: ''
        })

        setAssetInfo({
          assetName: '',
          assetNumber: '',
          assetCondition: '',
          assetMaterialType: ''
        })
      
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
       
      <Typography variant="h4" component="h4">Asset Details</Typography>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
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
          <FormControl variant="outlined" sx={{ minWidth: "45%" }}>
            <InputLabel id="asset-material-type-label">Asset Material Type</InputLabel>
            <Select
              labelId="asset-material-type-label"
              id="asset-material-type-select"
              name="assetMaterialType"  
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
       
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <TextField
            id="last-inspection-date-field"
            label="Last Inspection Date"
            type="date"
            name="dateLastInspected"
            value={dateInfo.dateLastInspected}
            onChange={(e) => setDateInfo({ ...dateInfo, dateLastInspected: e.target.value })}
            sx={{ minWidth: "45%" }}
            InputLabelProps={{
              shrink: true, 
            }}
          />
        </Slide>

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
        
        <Typography variant="h4" component="h4">Optional</Typography>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <TextField 
            id="inspectionNotes-field" 
            label="Inspection Notes" 
            variant="outlined" 
            name="inspectionNotes" 
            multiline
            rows={7}  
            value={inspectionNotes.inspectionNotes} 
            onChange={handleInspectionNotesChange} 
            sx={{ minWidth: "45%" }} 
          />
        </Slide>

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
