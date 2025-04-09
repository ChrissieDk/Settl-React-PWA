import React from "react";
import backgroundImage from "../img/AdobeStock_471841623.png";
import logo from "../img/Homepage/Settl logo.png";
import birdBg from "../img/birds.png";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import FadeIn from "./FadeIn/FadeIn";

const ContactUs: React.FC = () => {
  return (
    <div
      className="relative w-full h-screen bg-[#E5E5E5] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${birdBg})` }}
    >
      {/* Background Elements */}
      <FadeIn>
        <img
          src={logo}
          alt="Settl Logo"
          className="absolute top-6 left-6 w-28"
        />
      </FadeIn>

      <div className="relative flex flex-col md:flex-col lg:flex-row items-center w-4/5 max-w-6xl">
        {/* Contact Us Text (Visible on small screens) */}
        <FadeIn>
          <h1 className="block lg:hidden text-7xl font-header text-blue-500 text-center mb-4">
            Contact <br />
            <span className="text-orange-500 text-7xl font-header">Us</span>
          </h1>
        </FadeIn>

        {/* Text Section */}

        <div className="flex-1 z-10 order-2 lg:order-1">
          {/* Contact Details */}
          <div className="flex flex-col items-center mt-6 lg:mt-[18rem]">
            {/* Call Us (Moved to Bottom on Small Screens) */}
            <p className="text-3xl text-gray-800 font-header text-center">
              <span className="text-blue-500 font-header">
                Call <span className="text-orange-500 font-header">Us</span>
              </span>
            </p>
            <div className="p-4 text-xl w-full md:w-3/4 bg-orange-400 font-header text-white rounded-xl mt-2 text-center">
              0861 18 92 02
            </div>

            {/* Email Us */}
            <p className="text-3xl text-gray-800 font-header text-center mt-6">
              <span className="text-blue-500 font-header">
                Email <span className="text-orange-500 font-header">Us</span>
              </span>
            </p>
            <div className="p-4 text-xl w-full md:w-3/4 bg-orange-400 font-header text-white rounded-xl mt-2 text-center">
              chat@settl.co.za
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-blue-600 text-4xl hover:text-blue-800"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-blue-700 text-4xl hover:text-blue-900"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Image Section (Hidden on Small Screens) */}

        <div className="relative flex-1 hidden lg:block order-1 lg:order-2">
          <img
            src={backgroundImage}
            alt="Woman with Phone"
            className="w-full max-h-lg max-w-lg object-contain absolute right-0 top-1/2 transform -translate-y-[40%] z-10"
          />
          <h1 className="text-17xl leading-[0.7em] font-header text-blue-500 top-1/2 transform -translate-y-[30%] -z-30">
            Contact <br />
            <h1 className="text-orange-500 text-15xl font-header">Us</h1>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
