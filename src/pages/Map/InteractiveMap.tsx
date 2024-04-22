import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression, LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './InteractiveMap.css';

function InteractiveMap() {
  const [position, setPosition] = useState<LatLngTuple>([51.505, -0.09]); // Default position (London)

  useEffect(() => {
    // Fetch user's location using navigator.geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude] as LatLngTuple);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  // Custom marker icon
  const customIcon = new L.Icon({
    iconUrl: 'path/to/custom/icon.png', // Replace with your custom icon URL
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <MapContainer center={position} zoom={13} style={{ height: '600px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon}>
        <Popup>Your location</Popup>
      </Marker>
    </MapContainer>
  );
}

export default InteractiveMap;
