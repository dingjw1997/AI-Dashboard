import React from 'react';
import Header from '../../components/Header/Header';
import './Home.css';
import InteractiveMap from '../Map/InteractiveMap'; // Import the InteractiveMap component


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
          </div>
          <div className="block">
            <h2>Map</h2>
          </div>
        </div>
        <div className="row">
          <div className="block">
            <h2>Status</h2>
          </div>
          <div className="block">
            <h2>Block 4</h2>
          </div>
        </div>
      </div>
  
  </div>
  
  );
}

export default Home;
