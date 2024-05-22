import React, { useRef, useState } from 'react';
import { TextField, MenuItem, FormControl, InputLabel, Stack, Typography, Button, Slide, Select, SelectChangeEvent } from '@mui/material';
import Header from '../../components/Header/Header';
import firebase from '../../components/Database/FirebaseDatabase';

function Upload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const measurementInputRef = useRef<HTMLInputElement>(null);
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
    country: '',
    street: '',
    city: '',
    state: '',
    postcode: ''
  });

  const [inspectionNotes, setInspectionNotes] = useState({
    inspectionNotes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // Type definition for event parameter
  type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>;

  // Generic handleChange function for input fields
  const handleChange = (setState: React.Dispatch<React.SetStateAction<any>>) => (e: ChangeEvent) => {
    const { name, value } = e.target;
    setState((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const handleConfirm = async () => {
    try {
      // API call to get the asset condition
      const response = await fetch(`https://localhost:7037/api/prediction/2024-05-23 12:00:00`);
      if (!response.ok) throw new Error('Failed to fetch asset condition');
      const condition = await response.text(); // Assuming the response is plain text

      const dataToSend = {
        inspectionNotes,
        assetInfo: {
          ...assetInfo,
          assetCondition: condition, // Update the condition from the API
        },
        dateInfo,
        address,
      };

      const dbRef = firebase.database().ref('uploads');
      dbRef.push(dataToSend);
      console.log('Data Submitted:', dataToSend);
      setSubmitted(true);
      setTimeout(() => resetForm(), 1000);
    } catch (error) {
      console.error('Error:', error);
      alert(error);
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Photo Uploaded:', event.target.files && event.target.files[0]);
  };

  const handleMeasurementUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Measurement Uploaded:', event.target.files && event.target.files[0]);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File Uploaded:', event.target.files && event.target.files[0]);
  };

  const resetForm = () => {
    setInspectionNotes({ inspectionNotes: '' });
    setDateInfo({ dateUploaded: '', dateLastInspected: '' });
    setAssetInfo({
      assetName: '',
      assetNumber: '',
      assetCondition: '',
      assetMaterialType: ''
    });
    setAddress({
      country: '',
      street: '',
      city: '',
      state: '',
      postcode: ''
    });
    setSubmitted(false);
  };

  return (
    <div>
      <Header />
      <Stack spacing={2} py={2} px={3} alignItems="center" sx={{ height: "100vh" }}>
        <Typography variant="h4" component="h4">Asset Details</Typography>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <TextField 
            id="asset-name-field" 
            label="Asset Name" 
            variant="outlined" 
            name="assetName" 
            value={assetInfo.assetName} 
            onChange={handleChange(setAssetInfo)} 
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
              onChange={handleChange(setAssetInfo)}
              label="Asset Material Type"
            >
              <MenuItem value="Concrete">Concrete</MenuItem>
              <MenuItem value="Timber">Timber</MenuItem>
              <MenuItem value="Steel">Steel</MenuItem>
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
            onChange={handleChange(setDateInfo)}
            sx={{ minWidth: "45%" }}
            InputLabelProps={{
              shrink: true, 
            }}
          />
        </Slide>

        <Button 
          variant="contained" 
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          sx={{ height: "2.7rem", minWidth: "45%" }}
        >
          Upload Files
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.tiff"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />

        <Button 
          variant="contained" 
          onClick={() => photoInputRef.current && photoInputRef.current.click()}
          sx={{ height: "2.7rem", minWidth: "45%" }}
        >
          Upload Site Photos
        </Button>
        <input
          ref={photoInputRef}
          type="file"
          accept=".png,.jpg,.jpeg"
          onChange={handlePhotoUpload}
          style={{ display: 'none' }}
          multiple
        />

        <Button 
          variant="contained" 
          onClick={() => measurementInputRef.current && measurementInputRef.current.click()}
          sx={{ height: "2.7rem", minWidth: "45%" }}
        >
          Upload Instrumental Measurements
        </Button>
        <input
          ref={measurementInputRef}
          type="file"
          accept=".png,.jpg,.jpeg"
          onChange={handleMeasurementUpload}
          style={{ display: 'none' }}
          multiple
        />

        <Typography variant="h4" component="h4">Location</Typography>

        <TextField 
          id="country-field" 
          label="Country" 
          variant="outlined" 
          name="country" 
          value={address.country} 
          onChange={handleChange(setAddress)} 
          sx={{ minWidth: "45%" }}
        />
        <TextField 
          id="street-field" 
          label="Street" 
          variant="outlined" 
          name="street" 
          value={address.street} 
          onChange={handleChange(setAddress)} 
          sx={{ minWidth: "45%" }}
        />
        <TextField 
          id="city-field" 
          label="City" 
          variant="outlined" 
          name="city" 
          value={address.city} 
          onChange={handleChange(setAddress)} 
          sx={{ minWidth: "45%" }}
        />
        <TextField 
          id="state-field" 
          label="State" 
          variant="outlined" 
          name="state" 
          value={address.state} 
          onChange={handleChange(setAddress)} 
          sx={{ minWidth: "45%" }}
        />
        <TextField 
          id="postcode-field" 
          label="Postcode" 
          variant="outlined" 
          name="postcode" 
          value={address.postcode} 
          onChange={handleChange(setAddress)} 
          sx={{ minWidth: "45%" }}
        />
        
        <Typography variant="h4" component="h4">Inspection Notes</Typography>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <TextField 
            id="inspectionNotes-field" 
            label="Notes" 
            variant="outlined" 
            name="inspectionNotes" 
            multiline
            rows={7}  
            value={inspectionNotes.inspectionNotes} 
            onChange={handleChange(setInspectionNotes)} 
            sx={{ minWidth: "45%" }} 
          />
        </Slide>

        <Button 
          variant="contained" 
          onClick={handleConfirm}
          sx={{ height: "2.7rem", minWidth: "45%", marginBottom: "10px", backgroundColor: "#5865F2" }}
        >
          Confirm
        </Button>

        {submitted && <Typography variant="h6">Submitted</Typography>}
      </Stack>
    </div>
  );
}

export default Upload;
