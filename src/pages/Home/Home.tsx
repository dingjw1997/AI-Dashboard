import React, { useEffect, useState } from 'react';
import { Card, CardActionArea, CardContent, Stack, Typography, Grid, Grow, Paper } from '@mui/material';
import Header from '../../components/Header/Header';
import BasicTable from '../../components/BasicTable/BasicTable';
import GoogleMap from '../../components/GoogleMap/GoogleMap';
import { database, dbRef } from '../../components/Database/FirebaseDatabase';
import { onValue } from 'firebase/database'; 
import { Asset, Upload, Address } from '../../models/Asset';
import { useNavigate } from 'react-router-dom';

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

const conditionOrder = ["Urgent Inspection", "Requires Inspection", "Poor", "Good", "Excellent"];

const getCriticalAssets = (uploads: Upload[]): Asset[] => {
  const rows: Asset[] = uploads.map((upload, index) => {
    const location: Address = {
      country: upload.address.country,
      state: upload.address.state,
      city: upload.address.city,
      street: upload.address.street,
      postcode: upload.address.postcode,
    };

    const asset: Asset = {
      name: upload.assetInfo?.assetName || 'N/A',
      number: index + 1,
      condition: upload.assetInfo?.assetCondition || 'N/A', 
      material: upload.assetInfo?.assetMaterialType || 'N/A',
      lastInspectionDate: upload.dateInfo?.dateLastInspected || 'N/A',
      lastUploadDate: upload.dateInfo?.dateUploaded || 'N/A',
      location: location,
      inspectionNotes: upload.inspectionNotes?.inspectionNotes || 'N/A',
      photoURLs: upload.photoURLs || [], 
    };

    return asset;
  });

  return rows
    .sort((a, b) => conditionOrder.indexOf(a.condition) - conditionOrder.indexOf(b.condition))
    .slice(0, 5);
};

function Home() {
  const [criticalAssets, setCriticalAssets] = useState<Asset[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadsRef = dbRef(database, 'uploads');
    onValue(uploadsRef, (snapshot: any) => {
      const data = snapshot.val();
      const uploadsArray: Upload[] = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      const criticalAssets = getCriticalAssets(uploadsArray);
      setCriticalAssets(criticalAssets);
    });
  }, []);

  const handleCardClick = (asset: Asset) => {
    localStorage.setItem('currentAssetDetails', JSON.stringify(asset));
    navigate(`/details/${asset.name}`);
  };

  return (
    <div>
      <Header />
      
      <Grid container pt={3} px={3} gap={3} justifyContent="center"> 
        <Grid item xs={5}>
          <Grow in timeout={500}>
            <Paper sx={gridItemStyles}>
              <Typography variant="h4" component="h4" textAlign="center" gutterBottom>Alerts</Typography>
              <Stack direction="column" spacing={2} sx={gridItemStyles}>
                {criticalAssets.length > 0 ? (
                  criticalAssets.map((asset, index) => (
                    <Card key={index} variant="outlined">
                      <CardActionArea onClick={() => handleCardClick(asset)}>
                        <CardContent>
                          <Grid container alignItems="center">
                            <Grid item xs={8}>
                              <Typography variant="h5" component="h2">{asset.name}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography
                                variant="body2"
                                color={
                                  asset.condition === "Excellent" || asset.condition === "Good"
                                    ? "green"
                                    : asset.condition === "Poor" || asset.condition === "Urgent Inspection"
                                    ? "red"
                                    : asset.condition === "Requires Inspection"
                                    ? "orange"
                                    : "textSecondary"
                                }
                                style={{ textAlign: 'right' }}
                              >
                                Condition: {asset.condition}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Typography variant="body2" color="textSecondary" style={{ textAlign: 'right', marginTop: '8px' }}>
                            Last Inspection: {asset.lastInspectionDate}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary" textAlign="center">No critical assets found.</Typography>
                )}
              </Stack>
            </Paper>
          </Grow>
        </Grid>
        
        <Grid item xs={6}>
          <Grow in timeout={700}>
            <Paper sx={gridItemStyles}>
              <Typography variant="h4" component="h4" textAlign="center" gutterBottom>Recent Uploads</Typography>
              <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
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
