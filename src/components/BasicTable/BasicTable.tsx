import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { Location, Asset } from  '../../models/Asset';
import firebase from '../Database/FirebaseDatabase'; 


type Column = 'Asset' | 'No.' | 'Condition' | 'Location' | 'Material' | 'Last Inspection Date' | 'Last Upload Date' | 'Inspection Notes';

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
      console.log(data); // Log the fetched data to see its structure
      const uploadsArray = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setUploads(uploadsArray);
    });
  }, []);

  const rows: Asset[] = uploads.map((upload, index) => {
    const location = new Location(
      upload.address.country,
      upload.address.state,
      upload.address.city,
      upload.address.street,
      upload.address.postcode
    );
    const asset = new Asset(
      upload.assetInfo?.assetName || 'N/A',
      index + 1, 
      upload.condition || 'Good', 
      upload.assetInfo?.assetMaterialType || 'N/A',
      upload.dateInfo?.dateLastInspected || 'N/A',
      upload.dateInfo?.dateUploaded || 'N/A',
      location,
      upload.inspectionNotes?.inspectionNotes || 'N/A'
    );
    return asset;
  });

  const handleRowClick = (row: Asset) => {
    localStorage.setItem('currentAssetDetails', JSON.stringify(row));
    navigate(`/details/${row.name}`);
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
            {columnsToShow.includes('Inspection Notes') && <TableCell sx={{ fontWeight: 'bold' }} align="right">Inspection Notes</TableCell>}
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
              {columnsToShow.includes('Inspection Notes') && <TableCell align="right">{row.inspectionNotes}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTable;
