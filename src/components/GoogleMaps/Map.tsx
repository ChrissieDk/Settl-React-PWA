import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { MapProps } from "../../types/Types";

const containerStyle = {
  width: "100%",
  height: "100%",
};

type MarkerType = {
  id: number;
  lat: number;
  lng: number;
  text: string;
  subText?: string;
};

const Map: React.FC<MapProps> = ({ center, zoom, markers }) => {
  const [selectedMarker, setSelectedMarker] = useState<null | MarkerType>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [bounds, setBounds] = useState<{
    north: number;
    south: number;
    east: number;
    west: number;
  } | null>(null);
  const [filteredMarkers, setFilteredMarkers] = useState<MarkerType[]>([]);

  const handleOnLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
  });

  useEffect(() => {
    if (bounds) {
      const { north, south, east, west } = bounds;
      console.log("Bounds updated:", bounds);
      const visibleMarkers = markers.filter(
        (marker: MarkerType) =>
          marker.lat <= north &&
          marker.lat >= south &&
          marker.lng <= east &&
          marker.lng >= west
      );
      console.log("Visible markers:", visibleMarkers);
      setFilteredMarkers(visibleMarkers);
    }
  }, [bounds, markers]);

  useEffect(() => {
    if (map) {
      const listener = map.addListener("bounds_changed", () => {
        const mapBounds = map.getBounds();
        if (mapBounds) {
          const newBounds = {
            north: mapBounds.getNorthEast().lat(),
            south: mapBounds.getSouthWest().lat(),
            east: mapBounds.getNorthEast().lng(),
            west: mapBounds.getSouthWest().lng(),
          };
          console.log("Map bounds changed:", newBounds);
          setBounds(newBounds);
        }
      });

      return () => {
        google.maps.event.removeListener(listener);
      };
    }
  }, [map]);

  if (!isLoaded) return null;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={handleOnLoad}
    >
      {filteredMarkers.map((marker) => (
        <Marker
          key={marker.id}
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
