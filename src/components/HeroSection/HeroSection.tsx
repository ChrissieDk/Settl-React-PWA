// HeroSection.jsx
import React from "react";
import phoneImage from "../../img/HP_Phones.png";

interface HeroSectionProps {
  dynamicText: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ dynamicText }) => {
  return (
    <section className="">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="lg:w-1/2 lg:pt-10">
          <h1 className="font-medium text-4xl lg:text-7xl text-left text-blue-700">
            Welcome to <span className="text-orange-400">Settl</span>: Where
            Health Meets <span className="text-orange-400">{dynamicText}</span>.
          </h1>
          <div className="lg:pt-10">
            <p className="pt-2 text-left text-blue-700">
              Say goodbye to medical bills and embrace a future of wellness with
              our revolutionary tokens. With Settl tokens, embrace a future
              where your health is secured without the burdens of insurance
              premiums and bills.
            </p>
          </div>
          <div className="pt-4 pb-4 lg:pt-10 lg:pb-2 flex justify-center lg:justify-start">
            <button className="w-2/3 p-4 border shadow-md rounded-xl lg:w-1/2 bg-orange-400 text-white hover:bg-transparent hover:border-black hover:text-black active:transparent active:scale-95 transition duration-200 ease-in-out">
              <h1 className="lg:text-xl font-medium">HOW IT WORKS</h1>
            </button>
          </div>
        </div>
        <div className="flex lg:w-1/2 pt-5 pb-5">
          <img
            className=" mx-auto h-[18em] w-auto lg:h-[30rem]"
            src={phoneImage}
            alt="Settl-phone-example"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
