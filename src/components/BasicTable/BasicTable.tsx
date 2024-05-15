import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { Asset, Location } from '../../models/Asset';

const defaultColumns = [
  'Asset',
  'No.',
  'Condition',
  'Location',
  'Material',
  'Last Inspection Date',
  'Last Upload Date',
];

const rows: Asset[] = [
  new Asset(
    'Matagarup Bridge',
    101,
    'Good',
    'Steel',
    '2023-08-15',
    '2024-01-04',
    new Location('Australia', 'WA', 'East Perth', 'Nile Street', '6004')
  ),
  new Asset(
    'Perth Railway Station',
    202,
    'Requires Inspection',
    'Brick and Steel',
    '2023-06-22',
    '2023-08-01',
    new Location('Australia', 'WA', 'Perth CBD', 'Railway Street', '6005')
  ),
];

function BasicTable({ columnsToShow = defaultColumns }) {
  const navigate = useNavigate();

  const handleRowClick = (row: Asset) => {
    localStorage.setItem('currentAssetDetails', JSON.stringify(row));
    navigate(`/details/${row.number}`);
  };

  return (
    <TableContainer component={Paper} square variant="outlined">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columnsToShow.includes('Asset') && <TableCell sx={{ fontWeight: 'bold' }}>Asset</TableCell>}
            {columnsToShow.includes('No.') && <TableCell sx={{ fontWeight: 'bold' }} align="right">No.</TableCell>}
            {columnsToShow.includes('Condition') && <TableCell sx={{ fontWeight: 'bold' }} align="right">Condition</TableCell>}
            {columnsToShow.includes('Location') && <TableCell sx={{ fontWeight: 'bold' }} align="right">Location</TableCell>}
            {columnsToShow.includes('Material') && <TableCell sx={{ fontWeight: 'bold' }} align="right">Material</TableCell>}
            {columnsToShow.includes('Last Inspection Date') && <TableCell sx={{ fontWeight: 'bold' }} align="right">Last Inspection Date</TableCell>}
            {columnsToShow.includes('Last Upload Date') && <TableCell sx={{ fontWeight: 'bold' }} align="right">Last Upload Date</TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.name || index}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                cursor: 'pointer',
              }}
              hover
              onClick={() => handleRowClick(row)}
            >
              {columnsToShow.includes('Asset') && <TableCell component="th" scope="row">{row.name}</TableCell>}
              {columnsToShow.includes('No.') && <TableCell align="right">{row.number}</TableCell>}
              {columnsToShow.includes('Condition') && <TableCell align="right">{row.condition}</TableCell>}
              {columnsToShow.includes('Location') && <TableCell align="right">{`${row.location.city}, ${row.location.state}`}</TableCell>}
              {columnsToShow.includes('Material') && <TableCell align="right">{row.material}</TableCell>}
              {columnsToShow.includes('Last Inspection Date') && <TableCell align="right">{row.lastInspectionDate}</TableCell>}
              {columnsToShow.includes('Last Upload Date') && <TableCell align="right">{row.lastUploadDate}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTable;
