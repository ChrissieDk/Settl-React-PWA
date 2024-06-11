import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { MapProps } from "../../types/Types";
import marker from "../../img/Location_pin.png";

// icons
import { FaLocationDot } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa";
import { FaCity } from "react-icons/fa";
import { FaSignsPost } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

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
  const [customMarker, setCustomMarker] = useState<
    google.maps.Icon | undefined
  >();

  const handleOnLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (isLoaded) {
      setCustomMarker({
        url: marker,
        scaledSize: new google.maps.Size(30, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(20, 40),
      });
    }
  }, [isLoaded]);

  useEffect(() => {
    if (bounds) {
      const { north, south, east, west } = bounds;
      const visibleMarkers = markers.filter((marker) => {
        if (marker.lat === undefined || marker.lon === undefined) return false;
        const isWithinLat = marker.lat <= north && marker.lat >= south;
        const isWithinLng = marker.lon <= east && marker.lon >= west;
        return isWithinLat && isWithinLng;
      });
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
          position={{ lat: marker.lat!, lng: marker.lon! }}
          icon={customMarker}
          onClick={() => {
            setSelectedMarker((prev) =>
              prev && marker.id === prev.id ? null : marker
            );
          }}
        />
      ))}
      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat!, lng: selectedMarker.lon! }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div className="p-2 shadow-lg min-w-60">
            {selectedMarker.address && (
              <p className="text-sm font-button text-black flex flex-row items-center my-1">
                <FaLocationDot size={20} className="mr-2  text-orange-500" />
                {selectedMarker.address}
              </p>
            )}
            {selectedMarker.province && (
              <p className="text-sm font-button text-black flex flex-row items-center my-1">
                <FaLocationArrow size={20} className="mr-2 text-orange-500" />
                {selectedMarker.province}
              </p>
            )}
            {selectedMarker.city && (
              <p className="text-sm font-button text-black flex flex-row items-center my-1">
                <FaCity size={20} className="mr-2 text-orange-500" />
                {selectedMarker.city}
              </p>
            )}
            {selectedMarker.postcode && (
              <p className="text-sm font-button text-black flex flex-row items-center my-1">
                <FaSignsPost size={20} className="mr-2 text-orange-500" />
                {selectedMarker.postcode}
              </p>
            )}
            {selectedMarker.email && (
              <p className="text-sm font-button text-black flex flex-row items-center my-1">
                <MdEmail size={20} className="mr-2 text-orange-500" />
                {selectedMarker.email}
              </p>
            )}
            {selectedMarker.tel && (
              <p className="text-sm font-button text-black flex flex-row items-center my-1">
                <FaPhoneAlt size={20} className="mr-2 text-orange-500" /> 0
                {selectedMarker.tel}
              </p>
            )}
            {selectedMarker.providerSurname && (
              <p className="text-sm font-button text-black flex flex-row items-center my-1">
                <FaUserDoctor size={20} className="mr-2 text-orange-500" />
                {selectedMarker.providerSurname}
              </p>
            )}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default Map;
