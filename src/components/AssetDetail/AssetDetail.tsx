import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { Grid, Grow, Paper, Typography, Box } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Asset } from '../../models/Asset'; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const AssetDetail = () => {
  const [chartData, setChartData] = useState<{ labels: string[], datasets: { label: string, data: number[], fill: boolean, backgroundColor: string, borderColor: string }[] } | null>(null);

  const yAxisMapping: { [key: string]: number } = {
    "Urgent Inspection": 30,
    "Requires Inspection": 20,
    "Poor": 10,
    "Good": 5,
    "Excellent": 0
  };

  const fetchCondition = async (date: string): Promise<number> => {
    const response = await fetch(`https://localhost:7037/api/prediction/${date}`);
    if (!response.ok) throw new Error('Failed to fetch asset condition');
    const condition = await response.text();
    return yAxisMapping[condition] || 0; // Default to 0 if condition is not found
  };

  useEffect(() => {
    const fetchData = async () => {
      const dates = [
        new Date(),
        new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        new Date(Date.now() + 17 * 24 * 60 * 60 * 1000),
        new Date(Date.now() + 26 * 24 * 60 * 60 * 1000),
        new Date(Date.now() + 34 * 24 * 60 * 60 * 1000)
      ];

      const formattedDates = dates.map(date => date.toISOString().slice(0, 19).replace('T', ' '));

      try {
        const conditions: number[] = await Promise.all(formattedDates.map(fetchCondition));
        setChartData({
          labels: ['5 Days', '12 Days', '17 Days', '26 Days', '34 Days'],
          datasets: [{
            label: 'Asset Condition Over Time',
            data: conditions,
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
          }]
        });
      } catch (error) {
        console.error('Error fetching conditions:', error);
      }
    };

    fetchData();
  }, []);

  // Styling for the grid items
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
    boxShadow: '0 2px 10px 0 rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
  };

  // Chart options
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Asset Condition Over Time',
      },
      legend: {
        display: true,
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Expected Asset Condition',
        },
      },
    },
  };

  // Retrieve asset data from localStorage
  let assetDetails: Asset | null = null;
  const assetDetailsString = localStorage.getItem('currentAssetDetails');

  if (assetDetailsString) {
    assetDetails = JSON.parse(assetDetailsString);
  }

  // Prepare asset and location info
  const assetInfo = [
    { label: 'Asset No.', value: assetDetails ? assetDetails.number : 'No data available' },
    { label: 'Asset Name', value: assetDetails ? assetDetails.name : 'No data available' },
    { label: 'Condition', value: assetDetails ? assetDetails.condition : 'No data available' },
    { label: 'Material', value: assetDetails ? assetDetails.material : 'No data available' },
    { label: 'Last Inspected', value: assetDetails ? assetDetails.lastInspectionDate : 'No data available' },
  ];

  const locationInfo = [
    { label: 'Country', value: assetDetails?.location?.country || 'No data available' },
    { label: 'State', value: assetDetails?.location?.state || 'No data available' },
    { label: 'City', value: assetDetails?.location?.city || 'No data available' },
    { label: 'Street', value: assetDetails?.location?.street || 'No data available' },
    { label: 'Postcode', value: assetDetails?.location?.postcode || 'No data available' },
  ];

  // Function to render the asset or location details
  interface Detail {
    label: string;
    value: string | number | null;
  }

  const renderDetails = (info: Detail[]) => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
        }}
      >
        <div>
          {info.map((item, index) => (
            <Typography key={index} variant="body1">
              {item.label}:
            </Typography>
          ))}
        </div>
        <div>
          {info.map((item, index) => (
            <Typography key={index} variant="body1">
              {item.value}
            </Typography>
          ))}
        </div>
      </Box>
    </Box>
  );

  return (
    <div>
      <Header />
      <Grid container pt={3} px={3} gap={3} justifyContent="center">
        <Grid item xs={5}>
          <Grow in timeout={500}>
            <Paper sx={gridItemStyles}>
              <Typography variant="h4" component="h4" textAlign="center" pb={2} gutterBottom>
                Asset Condition
              </Typography>
              <Box sx={{ flex: 1 }}>
                {chartData ? (
                  <Line data={chartData} options={options} />
                ) : (
                  <Typography variant="body1" textAlign="center">Loading chart data...</Typography>
                )}
              </Box>
            </Paper>
          </Grow>
        </Grid>

        <Grid item xs={6} container direction="column" gap={3}>
          <Grow in timeout={700}>
            <Paper sx={{ ...gridItemStyles, flex: 1 }}>
              <Typography variant="h4" component="h4" textAlign="center" pb={2} gutterBottom>
                Asset Details
              </Typography>
              {renderDetails(assetInfo)}
            </Paper>
          </Grow>

          <Grow in timeout={900}>
            <Paper sx={{ ...gridItemStyles, flex: 1 }}>
              <Typography variant="h4" component="h4" textAlign="center" pb={2} gutterBottom>
                Location
              </Typography>
              {renderDetails(locationInfo)}
            </Paper>
          </Grow>
        </Grid>
      </Grid>
    </div>
  );
};

export default AssetDetail;
