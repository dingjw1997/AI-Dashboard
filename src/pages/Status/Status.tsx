import React from 'react';
import Header from '../../components/Header/Header';
import BasicTable from '../../components/BasicTable/BasicTable';

function Status() {

  return (
    <div>
      <Header />
      <BasicTable columnsToShow={['Asset', 'No.', 'Condition', 'Location', 'Material', 'Last Inspection Date']} />
    </div> 
  );
}

export default Status;
