// Google Maps Component for use across multiple pages
import React, { useEffect } from 'react';

interface GoogleMapProps {
    center: { lat: number; lng: number };
    zoom: number;
}
  
declare const google: any;
  
const GoogleMap: React.FC<GoogleMapProps> = ({ center, zoom }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAqorFZzemzb5NTmjiIs-lecUivC9hxibs&libraries=places`;
        script.async = true;
        document.body.appendChild(script);
    
        script.onload = () => {
            const map = new google.maps.Map(document.getElementById('map'), {
                center: center,
                zoom: zoom,
            });
        };
    
        return () => {
            document.body.removeChild(script);
        };
    }, [center, zoom]);
    
    return <div id="map"> </div>;
};

export default GoogleMap;

