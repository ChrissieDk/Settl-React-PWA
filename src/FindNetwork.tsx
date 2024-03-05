import React, { useState } from "react";
import paperPlane from "../src/img/Paper_plane.png";
import Map from "./components/GoogleMaps/Map";

const services = [
  {
    id: 1,
    service: "gp",
  },
  {
    id: 2,
    service: "dentist",
  },
  {
    id: 3,
    service: "optometrist",
  },
  {
    id: 4,
    service: "pharmacy",
  },
];

const FindNetwork = () => {
  const [activeItem, setActiveItem] = useState(null);

  const toggleItem = (id: any) => {
    setActiveItem(activeItem === id ? null : id);
  };

  const defaultProps = {
    center: {
      lat: -33.894272,
      lng: 18.629438,
    },
    zoom: 11,
  };

  return (
    <section className=" bg-blue-500 min-h-screen">
      <div className="p-8 lg:pt-18 lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto flex flex-wrap">
        <div className="w-full lg:w-1/3 text-left">
          {/* Left column content */}
          {/* This is where you can add the content for finding a healthcare provider, search inputs, etc. */}
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
          <div className="bg-blue-500">
            <img
              src={paperPlane}
              alt="paper plane illustration"
              className="absolute h-auto w-auto bottom-0 lg:bottom-auto lg:h-60 lg:w-[30rem] left-0"
            />
          </div>
        </div>
        <div className="w-full lg:w-2/3 text-left pl-4">
          {/* Right column content */}
          <div className="lg:pl-2">
            <p className="pt-4 lg:pt-0 pb-2">Input address:</p>
            <input
              className="lg:w-1/2 rounded-md p-2"
              type="text"
              placeholder="Enter your area..."
            />
          </div>
          <div className="py-2">
            {services.map((item) => (
              <button
                key={item.id}
                className={`uppercase font-bold justify-between items-center cursor-pointer rounded-md p-2 m-2 text-white min-w-24 transition-colors duration-500  ${
                  activeItem === item.id
                    ? "bg-blue-800"
                    : "bg-orange-400 hover:bg-blue-800"
                }`}
                onClick={() => toggleItem(item.id)}
              >
                {item.service}
              </button>
            ))}
          </div>

          <div className="h-96 w-full mb-4">
            {" "}
            {/* Set the desired height for the map */}
            <Map center={defaultProps.center} zoom={defaultProps.zoom} />
          </div>
          <div className="">{/* Insert list of providers here */}</div>
        </div>
      </div>
    </section>
  );
};

export default FindNetwork;
