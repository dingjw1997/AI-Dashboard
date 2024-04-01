import React, { useRef, useState } from 'react';
import Header from '../../components/Header/Header';
import ContainedButton from '../../components/ContainedButton/ContainedButton';
import './Upload.css';

function Upload() {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      // Check if the file type is .xlsx or .tiff
      if (
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'image/tiff'
      ) {
        // Handle the file upload here
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
        {/* Address fields */}
        <div>
          <label>Street:</label>
          <input type="text" name="street" value={address.street} onChange={handleAddressChange} />
        </div>
        <div>
          <label>City:</label>
          <input type="text" name="city" value={address.city} onChange={handleAddressChange} />
        </div>
        <div>
          <label>State:</label>
          <input type="text" name="state" value={address.state} onChange={handleAddressChange} />
        </div>
        <div>
          <label>Postal Code:</label>
          <input type="text" name="postalCode" value={address.postalCode} onChange={handleAddressChange} />
        </div>
        {/* Upload button */}
        <ContainedButton onClick={handleClick} label="Upload File" />
      </div>
    </div>
  );
}

export default Upload;
