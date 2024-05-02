import React from 'react';
import { Card, CardActionArea, CardContent, Stack, Typography, Grid, Grow, Paper } from '@mui/material';
import Header from '../../components/Header/Header';
import BasicTable from '../../components/BasicTable/BasicTable';
import GoogleMap from '../../components/GoogleMap/GoogleMap';

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

const center = { lat: -31.953512, lng: 115.857048 }; // Perth, WA Coordinates
const zoom = 12; 

function Home() {
  return (
    <div>
      <Header />
      
      <Grid container pt={3} px={3} gap={3} justifyContent="center"> 
        <Grid item xs={5}>
          <Grow in timeout={500}>
            <Paper sx={gridItemStyles}>
            <Typography variant="h4" component="h4" textAlign="center" gutterBottom>Alerts</Typography>
            <Stack direction="column" spacing={2} sx={gridItemStyles}>
              <Card variant="outlined">
                <CardActionArea href="/zone/1">
                  <CardContent>
                    <Typography variant="h5" component="h2">Zone 1</Typography>
                    <Typography variant="body2" color="textSecondary">Details about the alert...</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card variant="outlined">
                <CardActionArea href="/zone/2">
                  <CardContent>
                    <Typography variant="h5" component="h2">Zone 2</Typography>
                    <Typography variant="body2" color="textSecondary">Details about the alert...</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card variant="outlined">
                <CardActionArea href="/zone/3">
                  <CardContent>
                    <Typography variant="h5" component="h2">Zone 3</Typography>
                    <Typography variant="body2" color="textSecondary">Details about the alert...</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card variant="outlined">
                <CardActionArea href="/zone/4">
                  <CardContent>
                    <Typography variant="h5" component="h2">Zone 4</Typography>
                    <Typography variant="body2" color="textSecondary">Details about the alert...</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card variant="outlined">
                <CardActionArea href="/zone/5">
                  <CardContent>
                    <Typography variant="h5" component="h2">Zone 5</Typography>
                    <Typography variant="body2" color="textSecondary">Details about the alert...</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Stack>
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
            <Paper sx={{ ...gridItemStyles, minHeight: '700px', overflowY: 'hidden' }}>
              <Typography variant="h4" component="h4" textAlign="center" gutterBottom>Map</Typography>
              <GoogleMap center={center} zoom={zoom} />
            </Paper>
          </Grow>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;


