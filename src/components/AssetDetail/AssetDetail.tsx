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
import { Grid, Grow, Paper, Typography } from '@mui/material';

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

  const gridItemStyles = {
    overflowX: 'hidden',
    borderRadius: '10px',
    backgroundColor: '#2F3136',
    padding: 2,
    transition: 'transform .3s ease, box-shadow .3s ease',
    '&:hover': {
      transform: 'scale(1.02)', 
      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.15)', 
    },
    '::webkit-scrollbar': { display: 'none' },
    scrollbarWidth: 'none',
    maxHeight: '500px',
    boxShadow: '0 2px 10px 0 rgba(0,0,0,0.1)'
  };

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
      
      <Grid container pt={3} px={3} gap={3} justifyContent="center"> 
        <Grid item xs={5}>
          <Grow in timeout={500}>
            <Paper sx={gridItemStyles}>
            <Typography variant="h4" component="h4" textAlign="center" gutterBottom>Alerts</Typography>
            <div>
              <div style={{height: '400px'}}>
                <Line data={lineData1} />
              </div>
            </div>
            </Paper>
          </Grow>
        </Grid>
      
        
        <Grid item xs={6}>
          <Grow in timeout={700}>
            <Paper sx={gridItemStyles}>
              <Typography variant="h4" component="h4" textAlign="center" gutterBottom>Status</Typography>
              <div style={{ maxWidth: "100%", overflowX: "auto" }}>
                <div style={{height: '400px'}}>
                  <h2>Asset Details</h2>
                  <p>Asset Number: {assetDetails ? assetDetails.number : 'No data available'}</p>
                </div>
              </div>
            </Paper>
          </Grow>
        </Grid>

        <Grid item xs={11}>
          
        </Grid>
      </Grid>
        
    </div>
  );
};

export default AssetDetail;
