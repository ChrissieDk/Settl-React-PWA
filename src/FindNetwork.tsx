import React, { useState, useEffect, useMemo } from "react";
import Map from "./components/GoogleMaps/Map";
import { getCompanyDetails } from "./Services/data.service";
import { MapProps } from "./types/Types";
import useDebounce from "./hooks/debounce/useDebounce";
import needDoc from "../src/img/FindNetwork/needADoc.png";
import Footer from "./components/Footer/Footer";
import FadeIn from "./components/FadeIn/FadeIn";

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

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const data = await getCompanyDetails();
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

  const filteredResults = useMemo(() => {
    return filterLocations(companyDetails, debouncedSearchQuery);
  }, [debouncedSearchQuery, companyDetails]);

  const toggleItem = (type: string) => {
    setActiveService(type === activeService ? null : type);
  };

  const handleSelectResult = (result: MapProps["markers"][0]) => {
    setMapCenter({ lat: result.lat!, lng: result.lon! });
    setSearchQuery("");
  };

  const defaultProps = {
    zoom: 10,
    center: { lat: -33.9249, lng: 18.4241 },
  };

  const filteredMarkers = useMemo(() => {
    return companyDetails.filter((marker) => {
      if (!marker.type) return false;
      if (activeService && marker.type !== activeService) return false;
      return true;
    });
  }, [companyDetails, activeService]);

  const searchResults = searchQuery ? filteredResults : filteredMarkers;

  return (
    <section>
      <FadeIn>
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
      </FadeIn>
      <FadeIn>
        <div className="p-8 lg:pt-18 lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto flex flex-wrap">
          <div className="w-full text-left">
            <h1 className="text-3xl lg:text-6xl font-header mb-4 text-blue-500">
              Finding a Settl provider is a breeze.
              <br />{" "}
              <span className="text-orange-500 font-header">
                Just like that!
              </span>
            </h1>
            <p className="lg:text-xl font-paragraph text-blue-500">
              <strong>Massive Network:</strong> Over 7 500 GPs, dentists,
              optometrists and pharmacies nationwide.
            </p>
            <p className="lg:text-xl font-paragraph  text-blue-500 mb-4">
              <strong>Easy Search:</strong> Find the perfect fit for your needs
              in seconds.
            </p>
          </div>
          <div className="w-full text-left relative">
            <div className="mb-2">
              <p className="pt-4 lg:pt-0 pb-2 font-paragraph">Input address:</p>
              <input
                className="w-full lg:w-1/2 rounded-md p-3 bg-gray-200"
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
            <div className="py-2 mb-2">
              {services.map((item) => (
                <button
                  key={item.id}
                  className={`uppercase font-bold mx-1 justify-between items-center cursor-pointer rounded-md p-2 text-white min-w-24 transition-colors duration-500 ${
                    activeService === item.type
                      ? "bg-orange-400"
                      : "bg-blue-500 hover:bg-orange-500"
                  }`}
                  onClick={() => toggleItem(item.type)}
                >
                  {item.service}
                </button>
              ))}
            </div>
            <div className="h-[35rem] w-full mb-4">
              <Map
                center={mapCenter}
                zoom={defaultProps.zoom}
                markers={searchResults}
              />
            </div>
          </div>
        </div>
      </FadeIn>
      <FadeIn>
        <div className="bg-[#f8f5ef] py-12 mt-6 px-8 md:px-8 lg:px-0">
          <div className="px-6 lg:px-24">
            <h2 className="text-3xl lg:text-5xl font-header text-left text-blue-500">
              <span className="text-orange-500 font-header">Go</span>{" "}
              <span className="text-blue-500 font-header">and</span>
              <span className="text-orange-500 font-header"> Show!</span>
            </h2>
          </div>
          <div className="flex flex-col md:flex-row justify-start md:justify-center items-start md:items-center gap-6 md:gap-8 mt-6">
            {[
              {
                number: "1",
                title: "Go:",
                description: "Visit your chosen Settl network provider.",
              },
              {
                number: "2",
                title: "Show:",
                description:
                  "Show your OTP code and have the merchant enter it to redeem!",
              },
              {
                number: "3",
                title: "Settl Up Simply:",
                description:
                  "Pay before or after your consultation, it’s your choice!",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center md:items-start gap-3 max-w-md w-full md:w-auto"
              >
                <div className="bg-orange-400 text-white font-header text-lg md:text-3xl w-10 h-10 md:w-16 md:h-16 flex items-center justify-center rounded-md">
                  {item.number}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-orange-500 text-left">
                    {item.title}
                  </h3>
                  <p className="text-blue-500 text-left">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
      <Footer />
    </section>
  );
};

export default FindNetwork;
