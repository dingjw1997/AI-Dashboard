import React from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import InteractiveMap from '../Map/InteractiveMap';
import BasicTable from '../../components/BasicTable/BasicTable';
import { Typography, Grid } from '@mui/material';

function Home() {
  const gridItemStyles = {
    overflow: 'auto',
    borderRadius: '10px',
    border: '1px solid #7289DA', 
    backgroundColor: '#2F3136', 
    padding: 2,
    '::webkit-scrollbar': { display: 'none' },
    scrollbarWidth: 'none'
  };

  return (
    <div>
      <Header />
      
      <Grid container pt={3} px={3} gap={3} justifyContent="center"> 
        <Grid item xs={5} maxHeight="500px" sx={gridItemStyles}>
          <Typography variant="h4" component="h4" textAlign="center" gutterBottom>Alerts</Typography>
          <ul>
            <li><a href="/zone/1">Zone 1</a></li>
            <li><a href="/zone/2">Zone 2</a></li>
            <li><a href="/zone/3">Zone 3</a></li>
            <li><a href="/zone/4">Zone 4</a></li>
          </ul>  
        </Grid>
        
        <Grid item xs={6} maxHeight="500px" sx={gridItemStyles}>
          <Typography variant="h4" component="h4" textAlign="center" gutterBottom>Status</Typography>
          <div style={{maxWidth: "100%", overflowX: "auto"}}>
            <BasicTable columnsToShow={['Asset', 'No.', 'Condition', 'Location']} />
          </div>
        </Grid>
        
        <Grid item xs={10} mt={5} maxHeight="700px" sx={gridItemStyles}>
          <Typography variant="h4" component="h4" textAlign="center" gutterBottom>Map</Typography>
          <InteractiveMap /> 
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
