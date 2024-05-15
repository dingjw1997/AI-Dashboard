import React from 'react';
import { Grow } from '@mui/material';
import Header from '../../components/Header/Header';
import BasicTable from '../../components/BasicTable/BasicTable';

function Status() {
  return (
    <div>
      <Header />
      <Grow in timeout={600}>
        <div style={{overflowX: "hidden"}}>
          <BasicTable columnsToShow={['Asset', 'No.', 'Condition', 'Location', 'Material', 'Last Inspection Date', 'Last Upload Date']} />
        </div>
      </Grow>
    </div>
  );
}

export default Status;
