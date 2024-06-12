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
import { database, dbRef } from '../../components/Database/FirebaseDatabase';
import { onValue } from 'firebase/database'; 

type Column = 'No.' | 'Asset' | 'Condition' | 'Location' | 'Material' | 'Last Inspection Date' | 'Last Upload Date';

interface BasicTableProps {
  columnsToShow?: Column[];
}

function BasicTable({ columnsToShow = [] }: BasicTableProps) {
  const [uploads, setUploads] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadsRef = dbRef(database, 'uploads');
    onValue(uploadsRef, (snapshot: any) => { 
      const data = snapshot.val();
      console.log(data);
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
      upload.assetInfo?.assetCondition || 'N/A',
      upload.assetInfo?.assetMaterialType || 'N/A',
      upload.dateInfo?.dateLastInspected || 'N/A',
      upload.dateInfo?.dateUploaded || 'N/A',
      location,
      upload.inspectionNotes?.inspectionNotes || 'N/A',
      upload.photoURLs || [] 
    );
    return asset;
  });

  const handleRowClick = (row: Asset) => {
    localStorage.setItem('currentAssetDetails', JSON.stringify(row));
    navigate(`/details/${row.name}`);
  };
  // realign asset headings to start from No.
  return (
    <TableContainer component={Paper} square variant="outlined">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columnsToShow.includes('No.') && <TableCell sx={{ fontWeight: 'bold' }} align="right">No.</TableCell>}
            {columnsToShow.includes('Asset') && <TableCell sx={{ fontWeight: 'bold' }}>Asset</TableCell>}
            {columnsToShow.includes('Condition') && <TableCell sx={{ fontWeight: 'bold' }} align="left">Condition</TableCell>}
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
              {columnsToShow.includes('No.') && <TableCell align="right">{row.number}</TableCell>}
              {columnsToShow.includes('Asset') && <TableCell component="th" scope="row">{row.name}</TableCell>}
              {columnsToShow.includes('Condition') && (
                <TableCell align="left" style={{ display: 'flex', alignItems: 'center' }}>
                  {row.condition.toLowerCase() === 'excellent' && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        backgroundColor: 'green',
                        marginRight: 8,
                      }}
                    ></span>
                  )}
                  {row.condition.toLowerCase() === 'good' && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        backgroundColor: 'lightgreen',
                        marginRight: 8,
                      }}
                    ></span>
                  )}
                  {row.condition.toLowerCase() === 'requires inspection' && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        backgroundColor: 'orange',
                        marginRight: 8,
                      }}
                    ></span>
                  )}
                  {row.condition.toLowerCase() === 'poor' && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        backgroundColor: 'red',
                        marginRight: 8,
                      }}
                    ></span>
                  )}
                  {row.condition.toLowerCase() === 'urgent inspection' && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: 20, // larger circle for urgent inspection
                        height: 20, // larger circle for urgent inspection
                        borderRadius: '50%',
                        backgroundColor: 'red',
                        marginRight: 8,
                      }}
                    ></span>
                  )}
                  <span
                    style={{
                      color:
                        row.condition.toLowerCase() === 'excellent'
                          ? 'green'
                          : row.condition.toLowerCase() === 'good'
                          ? 'lightgreen'
                          : row.condition.toLowerCase() === 'requires inspection'
                          ? 'orange'
                          : row.condition.toLowerCase() === 'poor'
                          ? 'red'
                          : row.condition.toLowerCase() === 'urgent inspection'
                          ? 'red'
                          : 'inherit',
                    }}
                  >
                    {row.condition}
                  </span>
                </TableCell>
              )}
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
