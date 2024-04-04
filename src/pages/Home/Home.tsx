import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './Home.css'; // Import the InteractiveMap component
import InteractiveMap from '../Map/InteractiveMap';
import BasicTable from '../../components/BasicTable/BasicTable';


function Home() {
  return (
  <div>
    <Header />
    
    <div className="centered-h1">
        <h1>AI Dashboard</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="block">
            
            <h2>Alerts</h2>
            <ul>
        <li><a href="/zone/1">Zone 1</a></li>
        <li><a href="/zone/2">Zone 2</a></li>
        <li><a href="/zone/3">Zone 3</a></li>
        <li><a href="/zone/4">Zone 4</a></li>
           </ul>          
             </div>
          
          <div className="block">
            <h2>Status</h2>
            <BasicTable />

          </div>
          <div className="Map" >
          <h2 style={{textAlign: 'center'}}>Map</h2>
                  <InteractiveMap /> 
          </div>
        </div>
      </div>
  
  </div>
  
  );
}

export default Home;
