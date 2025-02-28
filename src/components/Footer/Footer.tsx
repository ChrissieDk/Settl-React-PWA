import React from "react";
import FooterImg from "../../img/footer/footer.png";
import settlLogo from "../../img/Homepage/Settl logo.png";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative min-h-[500px] w-full px-6  pb-12">
      {/* Background image with absolute positioning */}
      <div
        className="absolute bottom-0 left-0 right-0 h-full bg-no-repeat bg-contain bg-bottom z-0"
        style={{ backgroundImage: `url(${FooterImg})` }}
      />

      {/* Content with relative positioning to appear above the background */}
      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0 pt-4 md:pt-[100px] mx-auto md:mx-0 md:ml-[-20]">
        {/* Logo and Copyright */}
        <div>
          <img
            className="w-32 h-12 md:w-40 md:h-16 justify-center mx-auto my-auto"
            src={settlLogo}
            alt="settl logo"
          />
          <p className="text-gray-600 mt-2 text-xs">
            Copyright &copy; 2024 Settl (Pty) Ltd <br />
            All rights reserved.
          </p>
        </div>

        {/* Help Centre */}
        <div>
          <h3 className="text-base md:text-xl font-header text-[#0075c9] mb-4">
            Help Centre
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>About Us</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-base md:text-xl font-header text-[#0075c9] mb-4">
            Contact us
          </h3>
          <div className="space-y-2 text-gray-600 text-sm">
            <p>chat@settl.co.za</p>
            <p>0861 18 92 02</p>
            <div className="flex justify-center items-center gap-3 pt-2">
              <a href="#" aria-label="Instagram">
                <FaInstagram className="text-lg hover:text-[#0075c9]" />
              </a>
              <a href="#" aria-label="Facebook">
                <FaFacebookF className="text-lg hover:text-[#0075c9]" />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter className="text-lg hover:text-[#0075c9]" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin className="text-lg hover:text-[#0075c9]" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-base md:text-xl font-header text-[#0075c9] mb-4">
            Legal
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Social Media Terms of Use</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
