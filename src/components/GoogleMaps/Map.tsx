import React from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  markers: {
    id: number;
    lat: number;
    lng: number;
    text: string;
  }[];
}

const Map: React.FC<MapProps> = ({ center, zoom, markers }) => {
  const [selectedMarker, setSelectedMarker] = React.useState<null | {
    lat: number;
    lng: number;
    text: string;
    subText?: string;
  }>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
  });

  if (!isLoaded) return null;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => {
            setSelectedMarker((prev) =>
              prev && marker.id === marker.id ? null : marker
            );
          }}
        />
      ))}
      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
        >
          <div>
            <h1>{selectedMarker.text}</h1>
            {selectedMarker.subText && <p>{selectedMarker.subText}</p>}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default Map;
