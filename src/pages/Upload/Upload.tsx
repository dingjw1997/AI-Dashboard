import React, { useRef, useState } from 'react';
import Header from '../../components/Header/Header';
import ContainedButton from '../../components/ContainedButton/ContainedButton';
import './Upload.css';

function Upload() {
  const [address, setAddress] = useState({
    country:'',
    street: '',
    city: '',
    state: '',
    postcode: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div>
      <Header />
      <div>
        <input
          type="file"
          accept=".xlsx,.tiff"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <h3> Location: </h3>
        {/* Address Fields (Country/Address/City/State/Postcode) */}
        <div className="address-field">
          <label className="address-label">Country/Region: </label>
          <input className="address-input" type="text" name="country" value={address.country} onChange={handleAddressChange} />
        </div>
        <div className="address-field">
          <label className="address-label">Street: </label>
          <input className="address-input" type="text" name="street" value={address.street} onChange={handleAddressChange} />
        </div>
        <div className="address-field">
          <label className="address-label">City: </label>
          <input className="address-input" type="text" name="city" value={address.city} onChange={handleAddressChange} />
        </div>
        <div className="address-field">
          <label className="address-label">State/Territory: </label>
          <input className="address-input" type="text" name="state" value={address.state} onChange={handleAddressChange} />
        </div>
        <div className="address-field">
          <label className="address-label">Postcode: </label>
          <input className="address-input" type="text" name="postcode" value={address.postcode} onChange={handleAddressChange} />
        </div>
        
        {/* Upload button */}
        <ContainedButton onClick={handleClick} label="Upload File" />
      </div>
    </div>
  );
}

export default Upload;
