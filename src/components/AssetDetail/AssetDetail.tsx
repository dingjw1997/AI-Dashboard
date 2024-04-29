import React from 'react';
import Header from '../Header/Header';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AssetDetail = () => {

  const lineData1 = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
      label: 'Demo Line Plot',
      data: [65, 59, 80, 81, 56],
      fill: false,
      backgroundColor: 'rgb(75, 192, 192)',
      borderColor: 'rgba(75, 192, 192, 0.2)',
    }],
  };

  
  let assetDetails;

  const assetDetailsString = localStorage.getItem('currentAssetDetails');

  if (assetDetailsString) {
    assetDetails = JSON.parse(assetDetailsString);
  } else {
    assetDetails = null;
  }
  
  return (
    <div>
      <Header />
      <div>
        <div style={{height: '400px'}}>
          <Line data={lineData1} />
        </div>
        <div style={{height: '400px'}}>
          <h2>Asset Details</h2>
          <p>Asset Number: {assetDetails ? assetDetails.number : 'No data available'}</p>
        </div>
      </div>
    </div>
  );
};

export default AssetDetail;
