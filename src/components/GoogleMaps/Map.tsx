import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { MapProps } from "../../types/Types"; // Adjust the path as needed

const containerStyle = {
  width: "100%",
  height: "100%",
};

const Map: React.FC<MapProps> = ({ center, zoom, markers }) => {
  const [selectedMarker, setSelectedMarker] = useState<
    null | MapProps["markers"][0]
  >(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [bounds, setBounds] = useState<{
    north: number;
    south: number;
    east: number;
    west: number;
  } | null>(null);
  const [filteredMarkers, setFilteredMarkers] = useState<MapProps["markers"]>(
    []
  );
  console.log("Filtered markers:", filteredMarkers);

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
      const visibleMarkers = markers.filter((marker) => {
        if (marker.lat === undefined || marker.lng === undefined) return false;
        const isWithinLat = marker.lat <= north && marker.lat >= south;
        const isWithinLng = marker.lng <= east && marker.lng >= west;
        console.log(
          `Marker ${marker.id} - Lat: ${marker.lat}, Lng: ${marker.lng}, WithinLat: ${isWithinLat}, WithinLng: ${isWithinLng}`
        );
        return isWithinLat && isWithinLng;
      });
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
          position={{ lat: marker.lat!, lng: marker.lng! }}
          onClick={() => {
            setSelectedMarker((prev) =>
              prev && marker.id === prev.id ? null : marker
            );
          }}
        />
      ))}
      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat!, lng: selectedMarker.lng! }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div>
            <h1>{selectedMarker.text}</h1>
            {selectedMarker.address && <p>Address: {selectedMarker.address}</p>}
            {selectedMarker.province && (
              <p>Province: {selectedMarker.province}</p>
            )}
            {selectedMarker.city && <p>City: {selectedMarker.city}</p>}
            {selectedMarker.postcode && (
              <p>Postcode: {selectedMarker.postcode}</p>
            )}
            {selectedMarker.email && <p>Email: {selectedMarker.email}</p>}
            {selectedMarker.tel && <p>Telephone: {selectedMarker.tel}</p>}
            {selectedMarker.providerSurname && (
              <p>Provider Surname: {selectedMarker.providerSurname}</p>
            )}
            {/* {selectedMarker.type && <p>Type: {selectedMarker.type}</p>} */}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default Map;
