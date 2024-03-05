import React from "react";
import GoogleMapReact from "google-map-react";

// Interface for props expected by MapComponent
interface MapComponentProps {
  lat: number;
  lng: number;
  // Additional props like a label or custom styles can be added here
  text?: string; // Optional text property for future customization
}

// Updated MapComponent to render a marker
const MapComponent: React.FC<MapComponentProps> = (props) => {
  // Custom marker style
  const markerStyle = {
    height: "15px",
    width: "15px",
    backgroundColor: "#007bff",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  };

  return (
    <div style={markerStyle}>
      {props.text} {/* Optional text inside the marker */}
    </div>
  );
};

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
        {/* Example usage of MapComponent with an optional text prop */}
        <MapComponent lat={center.lat} lng={center.lng} text="A" />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
