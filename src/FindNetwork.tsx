import React from "react";
import paperPlane from "../src/img/Paper_plane.png";

const FindNetwork = () => {
  return (
    <section className=" bg-blue-500 min-h-screen">
      <div className="p-8 lg:pt-18 lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto flex flex-wrap">
        <div className="w-full lg:w-1/3 text-left">
          {/* Left column content */}
          {/* This is where you can add the content for finding a healthcare provider, search inputs, etc. */}
          <h1 className="text-xl lg:text-7xl font-bold mb-2 text-white">
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
              className="absolute h-60 w-[30rem] left-0"
            />
          </div>
        </div>
        <div className="w-full lg:w-2/3 text-left">
          {/* Right column content */}
          <div>
            <p className="pb-2">Input address:</p>
            <input
              className="w-48 rounded-md p-2"
              type="text"
              placeholder="Enter your area..."
            />
          </div>
          {/* This is where you can place the map and list of healthcare providers */}
          <div className=" mb-4">{/* Insert map here */}</div>
          <div className="">{/* Insert list of providers here */}</div>
        </div>
      </div>
    </section>
  );
};

export default FindNetwork;
