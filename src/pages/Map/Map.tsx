import React from 'react';
import Header from '../../components/Header/Header';
import GoogleMap from '../../components/GoogleMap/GoogleMap';
import './Map.css'
import { Grid, Grow, Paper } from '@mui/material';

const Map: React.FC = () => { // Map.tsx constant values for GoogleMap
  const center = { lat: -31.953512, lng: 115.857048 }; // Perth, WA Coordinates
  const zoom = 12; 

  return (
    <div>
      <Header />
      <Grid item xs={10} height={'100vh'}>
        <Grow in timeout={900}>
          <Paper sx={{height: '100%', overflowY: 'hidden' }}>
            <GoogleMap center={center} zoom={zoom} />
          </Paper>
        </Grow>
      </Grid>
    </div>
  );
};

export default Map;

