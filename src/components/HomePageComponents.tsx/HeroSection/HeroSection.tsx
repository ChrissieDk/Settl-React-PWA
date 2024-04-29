// HeroSection.jsx
import React from "react";
import phoneImage from "../../../img/Homepage/phones_updated.png";
import { HeroSectionProps } from "../../../types/Types";
import settlLogo from "../../../img/Homepage/Settl logo.png";

const HeroSection: React.FC<HeroSectionProps> = ({ dynamicText }) => {
  return (
    <section className="">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="lg:w-1/2 ">
          <img
            className=" h-[3.5em] w-auto lg:h-[6rem] mb-8"
            src={settlLogo}
            alt="Settl-logo"
          />
          <h1 className="font-headerFont text-4xl lg:text-7xl text-left text-blue-700">
            Welcome to
            <span className="text-orange-400 font-headerFont">Settl</span>:
            Where Health Meets
            <span className="text-orange-400 font-headerFont">
              {dynamicText}
            </span>
            .
          </h1>
          <div className="lg:pt-5">
            <p className="pt-2 text-left text-lg text-blue-700 font-paragraphFont">
              We’re all about healthcare made easy. Our goal is to give you the
              freedom to pick the healthcare options that fit you best, make
              managing payments easy with our flexible payment alternatives, and
              give you the choice of an extensive array of options when
              selecting your network provider.
            </p>
          </div>
          <div className="pt-4 pb-4 lg:pt-10 lg:pb-2 flex justify-center mx-1 gap-3">
            <button className=" w-2/3 p-4 border shadow-md rounded-xl lg:w-1/2 bg-orange-400 text-white hover:bg-transparent hover:border-black hover:text-black active:transparent active:scale-95 transition duration-200 ease-in-out">
              <h1 className="lg:text-xl font-buttonFont">HOW IT WORKS</h1>
            </button>
            <button className="w-2/3 p-4 border shadow-md rounded-xl lg:w-1/2 bg-orange-400 text-white hover:bg-transparent hover:border-black hover:text-black active:transparent active:scale-95 transition duration-200 ease-in-out">
              <h1 className="lg:text-xl font-buttonFont">HOW IT WORKS</h1>
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
