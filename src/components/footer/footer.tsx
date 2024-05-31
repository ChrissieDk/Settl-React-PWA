import React from "react";
import footerImage from "../../img/footer/footer.png";
import settlLogo from "../../img/Homepage/Settl logo.png";

const Footer = () => {
  return (
    <footer
      className=" bg-cover bg-center  min-h-[80vh] hidden lg:block"
      style={{ backgroundImage: `url(${footerImage})` }}
    >
      <div className="container mx-auto py-36 px-8">
        <div className="grid grid-cols-4 gap-2">
          <div>
            <img src={settlLogo} alt="settl_logo" />
            <p className="text-sm mt-2">
              Copyright © 2024 Settl (Pty) Ltd All rights reserved.
            </p>
          </div>
          <div className="">
            <h2 className="text-lg lg:text-2xl font-bold text-blue-600">
              Help Centre
            </h2>
            <ul className="mt-2 space-y-1 lg:text-xl">
              <li>
                <a
                  href="/about"
                  className="text-sm text-gray-700 hover:text-blue-600 lg:text-xl"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/faqs"
                  className="text-sm  text-gray-700 hover:text-blue-600 lg:text-xl"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg lg:text-2xl font-bold text-blue-600">
              Contact us
            </h2>
            <p className="mt-2 text-sm lg:text-lg  text-gray-700">
              chat@settl.co.za
            </p>
            <p className="text-sm lg:text-lg text-gray-700">0861 18 92 02</p>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://www.instagram.com"
                className="text-gray-700 hover:text-blue-600"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.facebook.com"
                className="text-gray-700 hover:text-blue-600"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://www.twitter.com"
                className="text-gray-700 hover:text-blue-600"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://www.linkedin.com"
                className="text-gray-700 hover:text-blue-600"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-lg lg:text-2xl font-bold text-blue-600">
              Legal
            </h2>
            <ul className="mt-2 space-y-1">
              <li>
                <a
                  href="/privacy-policy"
                  className="text-sm lg:text-lg text-gray-700 hover:text-blue-600"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-of-use"
                  className="text-sm lg:text-lg text-gray-700 hover:text-blue-600"
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  href="/social-media-terms"
                  className="text-sm lg:text-lg text-gray-700 hover:text-blue-600"
                >
                  Social Media Terms of Use
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
