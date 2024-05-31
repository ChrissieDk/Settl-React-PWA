import React, { useState, useEffect } from "react";
import paperPlane from "../src/img/Paper_plane.png";
import Map from "./components/GoogleMaps/Map";
import { getCompanyDetails } from "./Services/data.service";
import { MapProps } from "./types/Types";
import useDebounce from "./hooks/debounce/useDebounce";
import needDoc from "../src/img/FindNetwork/needADoc.png";

const services = [
  { id: 1, service: "gp", type: "GP" },
  { id: 2, service: "dentist", type: "DT" },
  { id: 3, service: "optometrist", type: "OPT" },
  { id: 4, service: "pharmacy", type: "PHARM" },
];

const FindNetwork: React.FC = () => {
  const [activeService, setActiveService] = useState<string | null>("GP");
  const [mapCenter, setMapCenter] = useState({
    lat: -33.894272,
    lng: 18.629438,
  });
  const [companyDetails, setCompanyDetails] = useState<MapProps["markers"]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [filteredResults, setFilteredResults] = useState<MapProps["markers"]>(
    []
  );

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const data = await getCompanyDetails();
        console.log("Fetched company details:", data);
        setCompanyDetails(data);
      } catch (error) {
        console.error("Failed to fetch company details", error);
      }
    };

    fetchCompanyDetails();
  }, []);

  const filterLocations = (locations: any[], query: string) => {
    if (!query) {
      return [];
    }
    return locations.filter(
      (location) =>
        location.address.toLowerCase().includes(query.toLowerCase()) ||
        location.city.toLowerCase().includes(query.toLowerCase()) ||
        location.providerSurname.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    const results = filterLocations(companyDetails, debouncedSearchQuery);
    setFilteredResults(results);
  }, [debouncedSearchQuery, companyDetails]);

  const toggleItem = (type: string) => {
    setActiveService(type === activeService ? null : type);
  };

  const handleSelectResult = (result: MapProps["markers"][0]) => {
    setMapCenter({ lat: result.lat!, lng: result.lon! });
    setSearchQuery("");
  };

  const defaultProps = {
    zoom: 13,
    center: { lat: -33.9249, lng: 18.4241 },
  };

  const filteredMarkers = companyDetails.filter((marker) => {
    if (!marker.type) return false;
    if (activeService && marker.type !== activeService) return false;
    return true;
  });

  const searchResults = searchQuery ? filteredResults : filteredMarkers;

  return (
    <section>
      <div className="relative">
        <img src={needDoc} alt="need a doctor" className="h-auto w-full" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="absolute left-48 top-20 lg:top-[42%] lg:left-[calc(35%+8rem)] transform -translate-y-1/2">
            <span className="text-[1.8rem]  text-white font-button lg:text-7xl">
              Need a Doc?
            </span>
          </div>
          <div className="absolute left-48 top-28 lg:top-[calc(42.5%+4.5rem)] lg:left-[calc(35%+8rem)] transform -translate-y-1/2">
            <span className="text-[1.8rem] text-gray-800 lg:text-7xl font-button">
              We've got you covered!
            </span>
          </div>
        </div>
      </div>
      <div className="p-8 lg:pt-18 lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto flex flex-wrap">
        <div className="w-full text-left">
          <h1 className="text-3xl lg:text-7xl font-bold mb-2 text-white">
            Find a Healthcare Provider
          </h1>
          <p className="lg:text-2xl font-bold">
            Finding a network provider is as easy as ‘1, 2, 3’ with our online
            Healthcare Network.
          </p>
          <p className="lg:text-md font-light pt-2 text-white">
            We boast more than 2 500 network providers across the country which
            include GPs, dentists, optometrists and pharmacies.
          </p>
        </div>
        <div className="w-full lg:w-2/3 text-left pl-4 relative">
          <div className="lg:pl-2">
            <p className="pt-4 lg:pt-0 pb-2">Input address:</p>
            <input
              className="lg:w-1/2 rounded-md p-2"
              type="text"
              placeholder="Enter your area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <div className="absolute bg-white border border-gray-300 rounded-md w-full lg:w-1/2 mt-1 max-h-60 overflow-y-auto z-10">
                {filteredResults.map((result) => (
                  <div
                    key={result.id}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSelectResult(result)}
                  >
                    {result.address}, {result.city}, {result.providerSurname}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="py-2">
            {services.map((item) => (
              <button
                key={item.id}
                className={`uppercase font-bold justify-between items-center cursor-pointer rounded-md p-2 m-2 text-white min-w-24 transition-colors duration-500 ${
                  activeService === item.type
                    ? "bg-blue-800"
                    : "bg-orange-400 hover:bg-blue-800"
                }`}
                onClick={() => toggleItem(item.type)}
              >
                {item.service}
              </button>
            ))}
          </div>
          <div className="h-96 w-full mb-4">
            <Map
              center={mapCenter}
              zoom={defaultProps.zoom}
              markers={searchResults}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindNetwork;
