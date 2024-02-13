import React from "react";
import phoneImage from "./img/HP_Phones.png";

const HomePage = () => {
  return (
    <div className="p-8 lg:pt-20 lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="lg:w-1/2 pt-4">
          {/* Content for the first half of the page */}
          <h1 className="font-medium  text-4xl lg:text-7xl text-left ">
            Welcome to Settl: Where Health Meets Freedom
          </h1>
          <div className="lg:pt-10">
            <p className="lg:p-2 text-left">
              Say goodbye to medical bills and embrace a future of wellness with
              our revolutionary tokens. With Settl tokens, embrace a future
              where your health is secured without the burdens of insurance
              premiums and bills.
            </p>
          </div>
          <div className="pt-10 pb-2 flex justify-start">
            <button className="p-4 border shadow-md rounded-xl lg:w-1/2 bg-gray-600 text-white hover:bg-transparent hover:border-black hover:text-black active:bg-gray-700 active:scale-95 transition duration-300 ease-in-out">
              <h1 className="text-xl font-medium">HOW IT WORKS</h1>
            </button>
          </div>
        </div>
        <div className="lg:w-1/2">
          {/* Content for the second half of the page */}
          <img className="h-auto" src={phoneImage} alt="Settl-phone-image" />
        </div>
      </div>
      <button className="fixed bottom-4 right-0 p-4 bg-orange-400 text-white font-bold lg:text-xl rounded-l-full rounded-r-none shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out z-50 uppercase">
        <h1 className="pl-6 pr-2">I'm interested</h1>
      </button>
    </div>
  );
};

export default HomePage;
