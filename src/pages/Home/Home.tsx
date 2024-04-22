import React from 'react';
import { Typography, Grid, Grow, Paper } from '@mui/material';
import Header from '../../components/Header/Header';
import InteractiveMap from '../Map/InteractiveMap';
import BasicTable from '../../components/BasicTable/BasicTable';

function Home() {
  const gridItemStyles = {
    overflow: 'auto',
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

  return (
    <div>
      <Header />
      
      <Grid container pt={3} px={3} gap={3} justifyContent="center"> 
        <Grid item xs={5}>
          <Grow in timeout={500}>
            <Paper sx={gridItemStyles}>
              <Typography variant="h4" component="h4" textAlign="center" gutterBottom>Alerts</Typography>
              <ul>
                <li><a href="/zone/1">Zone 1</a></li>
                <li><a href="/zone/2">Zone 2</a></li>
                <li><a href="/zone/3">Zone 3</a></li>
                <li><a href="/zone/4">Zone 4</a></li>
              </ul>
            </Paper>
          </Grow>
        </Grid>
        
        <Grid item xs={6}>
          <Grow in timeout={700}>
            <Paper sx={gridItemStyles}>
              <Typography variant="h4" component="h4" textAlign="center" gutterBottom>Status</Typography>
              <div style={{ maxWidth: "100%", overflowX: "auto" }}>
                <BasicTable columnsToShow={['Asset', 'No.', 'Condition', 'Location']} />
              </div>
            </Paper>
          </Grow>
        </Grid>
        
        <Grid item xs={10} mt={5}>
          <Grow in timeout={900}>
            <Paper sx={{ ...gridItemStyles, maxHeight: '700px' }}>
              <Typography variant="h4" component="h4" textAlign="center" gutterBottom>Map</Typography>
              <InteractiveMap />
            </Paper>
          </Grow>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
