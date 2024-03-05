// Map.tsx
import React from "react";
import GoogleMapReact from "google-map-react";

interface MapComponentProps {
  text: string;
  lat: number;
  lng: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ text, lat, lng }) => (
  <div>{text}</div>
);

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

const Map: React.FC<MapProps> = ({ center, zoom }) => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY!;

  return (
    <div className="h-full w-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <MapComponent lat={center.lat} lng={center.lng} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
