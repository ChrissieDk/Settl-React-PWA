import React from "react";
import phoneImage from "./img/HP_Phones.png";

const HomePage = () => {
  return (
    <div className="p-8 lg:pt-20 lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto">
      <div className="flex w-full">
        <div className="w-1/2 pt-4">
          {/* Content for the first half of the page */}
          <h1 className="font-medium  text-xl lg:text-7xl text-left ">
            Welcome to Settl: Where Health Meets Freedom
          </h1>
          <div className="pt-10">
            <p className="p-2 text-left">
              Say goodbye to medical bills and embrace a future of wellness with
              our revolutionary tokens. With Settl tokens, embrace a future
              where your health is secured without the burdens of insurance
              premiums and bills.
            </p>
          </div>
          <div className="pt-10 pb-2 flex justify-start">
            <button className="p-4 border border-black shadow-md rounded-xl w-1/2">
              <h1 className="text-xl">How it works</h1>
            </button>
          </div>
        </div>
        <div className="w-1/2">
          {/* Content for the second half of the page */}
          <img src={phoneImage} alt="Settl-phone-image" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
