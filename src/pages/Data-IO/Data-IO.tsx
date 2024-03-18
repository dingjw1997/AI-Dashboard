import React from 'react';
import Header from '../../components/Header/Header';
import './Data-IO.css';


function DataIO() {
  return (
    <div className="App">
      <Header title="ML Data and I/O" activeLink="I/O" />
      <div className="content">
        <div className="left-column">
          <div className="info-item">
            <h4>Status:</h4>
            <p> Red / Yellow / Green </p>
          </div>
          <div className="info-item">
             <h4>Type:</h4>
             <p>Concrete / Wood / etc. </p>
           </div>
           <div className="info-item">
             <h4>Location:</h4>
             <p>Perth, WA, 6100</p>
           </div>
           <div className="info-item">
             <h4>Last Serviced:</h4>
             <p>13/10/2023</p>
           </div>
        </div>
      </div>
    </div>
  );
}

export default DataIO;
