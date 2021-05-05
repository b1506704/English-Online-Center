import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import './GoogleMap.css';

const GoogleMap = ({lat, lng}) => {
    const [location, setLocation] = useState({
        lat: lat,
        lng: lng,
    });
    const [zoomLevel, setZoomLevel] = useState(15);

    return(
        <div className="map_container shadow">
            <GoogleMapReact
                bootstrapURLKeys= {{key: 'AIzaSyBi33ikA-UNokHaz0abercTBz2bOjjdh38'}}
                defaultCenter={location}
                defaultZoom={zoomLevel}
            >
            </GoogleMapReact>
        </div>
    );
}
export default GoogleMap;