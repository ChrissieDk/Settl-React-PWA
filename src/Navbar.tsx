import React, { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import logo from "./img/settl_logo1.png";

export function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      setIsUserSignedIn(!!user);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    });

    // Cleanup subscriptions and event listeners
    return () => {
      unregisterAuthObserver();
      window.removeEventListener("resize", () => {
        if (window.innerWidth >= 960) {
          setOpenNav(false);
        }
      });
    };
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Sign Out Error", error);
      });
  };

  // Placeholder function for sign-up navigation or modal
  const navigateToSignUp = () => {
    console.log("Navigate to sign-up page or open sign-up modal");
    navigate("/signup");
  };

  // Placeholder function for sign-in navigation or modal
  const navigateToSignIn = () => {
    console.log("Navigate to sign-in page or open sign-in modal");
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
        placeholder={undefined}
      >
        <a href="/AboutUs" className="flex items-center">
          <span className="hover:text-blue-500">About Us</span>
        </a>
      </Typography>
      {/* You can add more nav items here */}
    </ul>
  );

  return (
    <div className="max-h-[768px]">
      <Navbar
        className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4"
        placeholder={undefined}
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <a href="/">
            <img className="h-10 w-6" src={logo} />
          </a>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              {isUserSignedIn ? (
                <Button
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block"
                  onClick={handleSignOut}
                  placeholder={undefined}
                >
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block"
                    onClick={navigateToSignIn}
                    placeholder={undefined}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block"
                    onClick={navigateToSignUp}
                    placeholder={undefined}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              onClick={() => setOpenNav(!openNav)}
              placeholder={undefined}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
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
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>{navList}</Collapse>
      </Navbar>
    </div>
  );
}
