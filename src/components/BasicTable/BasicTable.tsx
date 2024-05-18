import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyDgyKfqT6QDWL96WVQ2J14vT44V599yl04",
  authDomain: "reactfire-fe0d2.firebaseapp.com",
  projectId: "reactfire-fe0d2",
  storageBucket: "reactfire-fe0d2.appspot.com",
  messagingSenderId: "121446039497",
  appId: "1:121446039497:web:02bd838be5b1fc57edf218"
};

firebase.initializeApp(firebaseConfig);

export class Location {
  constructor(
    public country: string,
    public state: string,
    public city: string,
    public street: string,
    public postcode: string
  ) {}
}

export class Asset {
  constructor(
      public name: string,
      public number: number,
      public condition: string,
      public material: string,
      public lastInspectionDate: string,
      public lastUploadDate: string,
      public location: Location
  ) {}
}


type Column = 'Asset' | 'No.' | 'Condition' | 'Location' | 'Material' | 'Last Inspection Date' | 'Last Upload Date';

interface BasicTableProps {
  columnsToShow?: Column[];
}

function BasicTable({ columnsToShow = [] }: BasicTableProps) {
  const [uploads, setUploads] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dbRef = firebase.database().ref('uploads');
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const uploadsArray = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setUploads(uploadsArray);
    });
  }, []);

  // Calculate newLocations and rows inside the component
  const newLocations = uploads.map(upload => new Location(
    upload.address.country,
    upload.address.state,
    upload.address.city,
    upload.address.street,
    upload.address.postcode
  ));

  


  const rows: Asset[] = newLocations.map(newLocation => new Asset(
    'Matagarup Bridge', // Hard-coded value for name
    101, // Hard-coded value for number
    'Good', // Hard-coded value for condition
    'Steel', // Hard-coded value for material
    '2023-08-15', // Hard-coded value for lastInspectionDate
    '2024-01-04', // Hard-coded value for lastUploadDate
    newLocation // Fetched location object
  ));

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


