import React from 'react';
import { useParams } from 'react-router-dom';

const AssetDetail = () => {
  const { number } = useParams();
  
  let assetDetails;

  const assetDetailsString = localStorage.getItem('currentAssetDetails');

  if (assetDetailsString) {
    assetDetails = JSON.parse(assetDetailsString);
  } else {
    assetDetails = null;
  }
  
  return (
    <div>
      <h2>Asset Details</h2>
      {/* Check if assetDetails is not null before trying to access its properties */}
      <p>Asset Number: {assetDetails ? assetDetails.number : 'No data available'}</p>
      {/* Display other details conditionally or handle the null case appropriately */}
    </div>
  );
};

export default AssetDetail;
