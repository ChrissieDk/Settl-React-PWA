import phoneImage from "../../../img/Homepage/phones_updated.png";
import { HeroSectionProps } from "../../../types/Types";
import settlLogo from "../../../img/Homepage/Settl logo.png";
import React from "react";

const HeroSection: React.FC<HeroSectionProps> = ({ dynamicText }) => {
  return (
    <section className="w-full">
      <div className="flex flex-col lg:flex-row items-center w-full">
        {/* Text Section */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <img
            className="h-[3.5em]  max-w-[50%] lg:h-[7rem] pb-2 lg:mb-10"
            src={settlLogo}
            alt="Settl-logo"
          />
          <h1 className="font-header text-4xl lg:text-6xl text-left text-blue-500 lg:pb-2">
            Welcome to{" "}
            <span className="text-orange-400 font-header">Settl</span>: Where
            Health Meets <br />
            <span className="text-orange-400 font-header">{dynamicText}</span>.
          </h1>
          <p className="pt-2 text-left lg:text-lg text-blue-500 font-paragraph">
            Access simplified healthcare with flexible payment options across
            our extensive network of trusted providers.
          </p>
          <div className="pt-4 pb-4 lg:pt-5 flex text-left gap-2 lg:gap-6 lg:pb-10">
            <button className="w-2/3 p-3 border shadow-md rounded-xl lg:w-52 bg-[#838383] text-white hover:bg-transparent hover:border-black hover:text-black active:scale-95 transition duration-200 ease-in-out">
              <h1 className="lg:text-xl font-button">HOW IT WORKS</h1>
            </button>
            <button className="w-2/3 p-3 border shadow-md rounded-xl lg:w-52 bg-[#838383] text-white hover:bg-transparent hover:border-black hover:text-black active:scale-95 transition duration-200 ease-in-out">
              <h1 className="lg:text-xl font-button">SIGN UP</h1>
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            className="mx-auto px-8 lg:pt-0"
            src={phoneImage}
            alt="Settl-phone-example"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
