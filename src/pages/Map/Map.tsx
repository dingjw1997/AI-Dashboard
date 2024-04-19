import React from 'react';
import Header from '../../components/Header/Header';
import GoogleMap from '../../components/GoogleMap/GoogleMap';
import './InteractiveMap.css'

const Map: React.FC = () => { // Map.tsx constant values for GoogleMap
  const center = { lat: -31.953512, lng: 115.857048 }; // Perth, WA Coordinates
  const zoom = 12; 

  return (
    <div>
      <Header />
      <GoogleMap center={center} zoom={zoom} />
    </div>
  );
};

export default Map;

