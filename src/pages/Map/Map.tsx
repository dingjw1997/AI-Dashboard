import React from 'react';
import Header from '../../components/Header/Header';
import InteractiveMap from './InteractiveMap';

// Maybe change to Google Maps
function Map() {
  return (
    <div className="Map">
        <Header title="Local Map" activeLink="Map" />
      <InteractiveMap /> 
    </div>
  );
}

export default Map;
