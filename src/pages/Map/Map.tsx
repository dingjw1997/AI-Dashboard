import React from 'react';
import Header from '../../components/Header/Header';
import InteractiveMap from './InteractiveMap';

// Maybe change to Google Maps
function Map() {
  return (
    <div className="Map">
        <Header />
      <InteractiveMap /> 
    </div>
  );
}

export default Map;
