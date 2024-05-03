// HeroSection.jsx
import React from "react";
import phoneImage from "../../../img/Homepage/phones_updated.png";
import { HeroSectionProps } from "../../../types/Types";
import settlLogo from "../../../img/Homepage/Settl logo.png";
import blurredBird from "../../../img/Homepage/settl bird_blur.png";

const HeroSection: React.FC<HeroSectionProps> = ({ dynamicText }) => {
  return (
    <section className="">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="lg:w-1/2 ">
          <img
            className=" h-[3.5em] w-auto lg:h-[7rem] pb-2 lg:mb-10"
            src={settlLogo}
            alt="Settl-logo"
          />
          <h1 className="font-header text-4xl lg:text-6xl text-left text-blue-500 lg:pb-2">
            Welcome to {""}
            <span className="text-orange-400 font-header">Settl</span>: Where
            Health Meets {""}
            <br></br>
            <span className="text-orange-400 font-header">{dynamicText}</span>.
          </h1>
          <div className="lg:pt-2">
            <p className="pt-2 text-left lg:text-lg text-blue-700 font-paragraph">
              We’re all about healthcare made easy. Our goal is to give you the
              freedom to pick the healthcare options that fit you best, make
              managing payments easy with our flexible payment alternatives, and
              give you the choice of an extensive array of options when
              selecting your network provider.
            </p>
          </div>
          <div className="pt-4 pb-4 lg:pt-5 flex text-left gap-2 lg:gap-6 lg:pb-10">
            <button className=" w-2/3 p-3 border shadow-md rounded-xl lg:w-52 bg-gray-500 text-white hover:bg-transparent hover:border-black hover:text-black active:transparent active:scale-95 transition duration-200 ease-in-out">
              <h1 className="lg:text-xl font-button">HOW IT WORKS</h1>
            </button>
            <button className="w-2/3 p-3 border shadow-md rounded-xl lg:w-52 bg-gray-500 text-white hover:bg-transparent hover:border-black hover:text-black active:transparent active:scale-95 transition duration-200 ease-in-out">
              <h1 className="lg:text-xl font-button">HOW IT WORKS</h1>
            </button>
          </div>
        </div>
        <div className="relative lg:w-1/2 mx-auto">
          {/* Background dove */}
          <div className="absolute inset-0 z-0">
            {/* Your dove image/svg */}
            <img
              src={blurredBird}
              alt="Dove Behind"
              className="h-16 ml-5 lg:h-36 w-auto object-cover blur-[2px] scale-x-[-1] lg:ml-10"
            />
          </div>

          {/* Phone image */}
          <div className="relative z-10">
            <img
              className="mx-auto pt-8 h-[18em] w-auto lg:h-[33rem] lg:w-[35rem] justify-center text-center"
              src={phoneImage}
              alt="Settl-phone-example"
            />
          </div>

          {/* Foreground dove */}
          <div className="absolute inset-0 z-20 flex items-end justify-start">
            {/* Your dove image/svg */}
            <img
              src={blurredBird}
              alt="Dove Front"
              className="h-16 ml-8 lg:h-48 w-auto object-cover blur-[2px] lg:ml-16"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
