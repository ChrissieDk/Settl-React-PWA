import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import logo from "./img/Homepage/settl icon.png";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

export function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      setIsUserSignedIn(!!user);
    });

    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      unregisterAuthObserver();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log("Error signing out: ", error);
      });
  };

  const navigateToSignUp = () => {
    navigate("/signup");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li className="p-1">
        <a
          href="/Settl-React-PWA/FindNetwork"
          className="flex items-center hover:text-blue-500"
        >
          <h1 className="font-navbar">Find a network provider</h1>
        </a>
      </li>
      <li className="p-1">
        <a
          href="/Settl-React-PWA/AboutUs"
          className="flex items-center hover:text-blue-500"
        >
          <h1 className="font-navbar">About Us</h1>
        </a>
      </li>
      <li className="p-1">
        <a
          href="/Settl-React-PWA/"
          className="flex items-center hover:text-blue-500"
        >
          <h1 className="font-navbar">Contact us</h1>
        </a>
      </li>

      {isUserSignedIn ? (
        <li className="p-1">
          <button
            className="lg:hidden bg-transparent hover:bg-blue-500 text-blue-700 font-navbar hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </li>
      ) : (
        <>
          <li className="p-1">
            <button
              className="lg:hidden bg-transparent hover:bg-blue-500 text-blue-700 font-navbar hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={navigateToLogin}
            >
              Sign In
            </button>
          </li>
          <li className="p-1">
            <button
              className="lg:hidden bg-blue-500 hover:bg-blue-700 text-white font-navbar py-2 px-4 border border-blue-700 rounded"
              onClick={navigateToSignUp}
            >
              Sign Up
            </button>
          </li>
        </>
      )}
    </ul>
  );

  return (
    <div className="sticky top-0 z-10 bg-white shadow max-h-[768px]">
      <div className="max-w-full px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between">
          <div className="flex">
            <a href="/Settl-React-PWA">
              <img className="h-10 w-auto" src={logo} alt="Settl Logo" />
            </a>
            <div className="flex ml-4 my-auto">
              <a href="YOUR_FACEBOOK_URL" className="ml-4">
                <FaInstagram className="text-blue-500 h-6 w-6" />
              </a>
              <a href="YOUR_TWITTER_URL" className="ml-4">
                <FaFacebookF className="text-blue-500 h-6 w-6" />
              </a>
              <a href="YOUR_INSTAGRAM_URL" className="ml-4">
                <FaXTwitter className="text-blue-500 h-6 w-6" />
              </a>
              <a href="YOUR_INSTAGRAM_URL" className="ml-4">
                <FaLinkedinIn className="text-blue-500 h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              {isUserSignedIn ? (
                <button
                  className="hidden lg:block bg-transparent hover:bg-blue-500 text-blue-700 font-navbar hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <button
                    className="hidden lg:block bg-transparent hover:bg-blue-500 text-blue-700 font-navbar hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={navigateToLogin}
                  >
                    Sign In
                  </button>
                  <button
                    className="hidden lg:block bg-blue-500 hover:bg-blue-700 text-white font-navbar py-2 px-4 border border-blue-700 rounded"
                    onClick={navigateToSignUp}
                  >
                    Sign Up
                  </button>
                </>
              )}
              <button
                className="lg:hidden"
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {openNav && <div className="lg:hidden">{navList}</div>}
      </div>
    </div>
  );
}
