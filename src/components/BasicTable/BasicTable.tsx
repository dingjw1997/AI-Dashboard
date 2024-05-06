import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

const defaultColumns = ['Asset', 'No.', 'Condition', 'Location', 'Material', 'Last Inspection Date', 'Last Upload Date'];

interface RowData {
  name: string;
  number: number;
  condition: string;
  location: string;
  material: string;
  lastInspectionDate: string;
  lastUploadDate: string;
}

function createData(
  name: string,
  number: number,
  condition: string,
  location: string,
  material: string,
  lastInspectionDate: string,
  lastUploadDate: string,
): RowData { 
  return { name, number, condition, location, material, lastInspectionDate, lastUploadDate };
}

const rows: RowData[] = [
  createData('Matagarup Bridge', 101, 'Good', 'East Perth', 'Steel', '2023-08-15', '2024-01-04'),
  createData('Perth Railway Station', 202, 'Requires Inspection', 'Perth CBD', 'Brick and Steel', '2023-06-22', '2023-08-01'),
  createData('Kwinana Freeway Overpass', 303, 'Poor', 'South Perth', 'Concrete', '2023-04-30', '2024-02-15'),
  createData('Elizabeth Quay Waterfront', 404, 'Good', 'Elizabeth Quay', 'Concrete and Steel', '2022-07-01', '2023-03-27'),
  createData('Jandakot Airport Runway', 505, 'Poor', 'Jandakot', 'Asphalt', '2022-12-05', '2023-01-13'),
  createData('', 0, '', '', '', '', ''),
  createData('', 0, '', '', '', '', ''),
  createData('', 0, '', '', '', '', ''),
  createData('', 0, '', '', '', '', ''),
  createData('', 0, '', '', '', '', ''),
  createData('', 0, '', '', '', '', ''),
  createData('', 0, '', '', '', '', ''),
  createData('', 0, '', '', '', '', ''),
];

function BasicTable({ columnsToShow = defaultColumns }) {
  const navigate = useNavigate();

  const handleRowClick = (row: RowData) => {
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
                cursor: 'pointer'
              }}
              hover
              onClick={() => handleRowClick(row)}
            >
              {columnsToShow.includes('Asset') && <TableCell component="th" scope="row">{row.name}</TableCell>}
              {columnsToShow.includes('No.') && <TableCell align="right">{row.number}</TableCell>}
              {columnsToShow.includes('Condition') && <TableCell align="right">{row.condition}</TableCell>}
              {columnsToShow.includes('Location') && <TableCell align="right">{row.location}</TableCell>}
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
