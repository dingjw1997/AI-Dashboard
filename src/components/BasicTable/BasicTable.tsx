import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

interface RowData {
  name: string;
  number: number;
  condition: string;
  location: string;
  material: string;
  lastInspectionDate: string;
}

function createData(
  name: string,
  number: number,
  condition: string,
  location: string,
  material: string,
  lastInspectionDate: string,
): RowData { 
  return { name, number, condition, location, material, lastInspectionDate };
}

const rows: RowData[] = [
  createData('Matagarup Bridge', 101, 'Good', 'East Perth', 'Steel', '2023-08-15'),
  createData('Perth Railway Station', 202, 'Requires Inspection', 'Perth CBD', 'Brick and Steel', '2023-06-22'),
  createData('Kwinana Freeway Overpass', 303, 'Poor', 'South Perth', 'Concrete', '2023-04-30'),
  createData('Elizabeth Quay Waterfront', 404, 'Good', 'Elizabeth Quay', 'Concrete and Steel', '2023-09-01'),
  createData('Jandakot Airport Runway', 505, 'Poor', 'Jandakot', 'Asphalt', '2022-12-05'),
  createData('', 0, '', '', '', ''),
  createData('', 0, '', '', '', ''),
  createData('', 0, '', '', '', ''),
  createData('', 0, '', '', '', ''),
  createData('', 0, '', '', '', ''),
  createData('', 0, '', '', '', ''),
  createData('', 0, '', '', '', ''),
  createData('', 0, '', '', '', ''),
  createData('', 0, '', '', '', ''),
  createData('', 0, '', '', '', ''),
  createData('', 0, '', '', '', ''),
];

function BasicTable() {
  const navigate = useNavigate();

  const handleRowClick = (row: RowData) => {
    navigate(`/details/${row.number}`);
  };

  return (
    <div className="w-100 d-flex justify-content-center">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell sx={{fontWeight: "bold"}}>Asset</TableCell>
              <TableCell sx={{fontWeight: "bold"}} align="right">No.</TableCell>
              <TableCell sx={{fontWeight: "bold"}} align="right">Condition</TableCell>
              <TableCell sx={{fontWeight: "bold"}} align="right">Location</TableCell>
              <TableCell sx={{fontWeight: "bold"}} align="right">Material</TableCell>
              <TableCell sx={{fontWeight: "bold"}} align="right">Last Inspection Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }, 
                  cursor: 'pointer', 
                }}
                onClick={() => handleRowClick(row)} 
              >
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="right">{row.number}</TableCell>
                <TableCell align="right">{row.condition}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">{row.material}</TableCell>
                <TableCell align="right">{row.lastInspectionDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default BasicTable;
