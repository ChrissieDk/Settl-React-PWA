import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import phoneImage from "./img/HP_Phones.png";
import chip1 from "./img/1.png";
import chip2 from "./img/2.png";
import chip3 from "./img/3.png";
import chip4 from "./img/4.png";
import chip5 from "./img/5.png";
import chip6 from "./img/6.png";
import { FaSliders } from "react-icons/fa6";
import { GrUserSettings } from "react-icons/gr";
import { LuHeartHandshake } from "react-icons/lu";

const blockText = [
  {
    description: "Build your customised healthcare package.",
    IconComponent: FaSliders,
    id: "1",
  },
  {
    description: "Access, manage and view total cover.",
    IconComponent: GrUserSettings,
    id: "2",
  },
  {
    description: "Feel empowered by tailoring your own healthcare coverage.",
    IconComponent: LuHeartHandshake,
    id: "3",
  },
];

const chips = [
  { src: chip1, alt: "Step 1" },
  { src: chip2, alt: "Step 2" },
  { src: chip3, alt: "Step 3" },
  { src: chip4, alt: "Step 4" },
  { src: chip5, alt: "Step 5" },
  { src: chip6, alt: "Step 6" },
];

// interface Block {
//   description: string;
//   IconComponent: React.ElementType;
//   id: string;
// }

const HomePage = () => {
  const [iconSize, setIconSize] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      // Adjust this logic based on your specific responsive breakpoints
      setIconSize(window.innerWidth < 768 ? 40 : 100);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Hero section */}
      <section className="p-8 lg:pt-18 lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row w-full">
          <div className="lg:w-1/2 lg:pt-10">
            {/* Content for the first half of the page */}
            <h1 className="font-medium  text-4xl lg:text-7xl text-left  text-blue-700">
              Welcome to <span className="text-orange-400">Settl</span>: Where
              Health Meets <span className="text-orange-400">Freedom</span>.
            </h1>
            <div className="lg:pt-10">
              <p className="pt-2 text-left text-blue-700">
                Say goodbye to medical bills and embrace a future of wellness
                with our revolutionary tokens. With Settl tokens, embrace a
                future where your health is secured without the burdens of
                insurance premiums and bills.
              </p>
            </div>
            <div className="pt-4 pb-4 lg:pt-10 lg:pb-2 flex justify-center lg:justify-start">
              <button className="w-2/3 p-4 border shadow-md rounded-xl lg:w-1/2 bg-orange-400 text-white hover:bg-transparent hover:border-black hover:text-black active:transparent active:scale-95 transition duration-200 ease-in-out">
                <h1 className="lg:text-xl font-medium">HOW IT WORKS</h1>
              </button>
            </div>
          </div>
          <div className="flex lg:w-1/2">
            {/* Content for the second half of the page */}
            <img
              className="pt-10 mx-auto h-[18em] w-auto lg:h-auto"
              src={phoneImage}
              alt="Settl-phone-example"
            />
          </div>
        </div>
        {/* Interested button - always visible */}
        <button className="fixed bottom-4 right-0 p-4 bg-orange-400 text-white font-bold lg:text-xl rounded-l-full rounded-r-none shadow-lg hover:bg-blue-700 active:scale-95 transition duration-300 ease-in-out z-50 uppercase">
          <h1 className="pl-6 pr-2">I'm interested</h1>
        </button>
      </section>

      {/* Take control section */}
      <section className="p-8 lg:pt-18 lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row w-full">
          <div className="lg:w-1/2 flex flex-col">
            {/* Adjusted for vertical layout */}
            <div>
              <h1 className="font-medium text-4xl lg:text-7xl text-left text-blue-700">
                <span className="text-orange-400 ">Take control</span> <br /> of
                your money and health.
              </h1>
            </div>
            {/* Blocks Container - Directly below the text, still within the left side */}
            <div className="flex flex-col space-y-4 mt-10">
              <AnimatePresence>
                {blockText.map((block) => (
                  <motion.div
                    key={block.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex lg:flex-row items-center lg:space-x-4 space-y-4 lg:space-y-0"
                  >
                    <div className="w-16 h-16 lg:w-36 lg:h-36 lg:p-10 bg-orange-400 flex justify-center items-center text-2xl text-gray-800 rounded-xl mr-2 lg:mr-0">
                      {/* Dynamically render icon with adjusted size */}
                      {React.createElement(block.IconComponent, {
                        color: "white",
                        size: iconSize,
                      })}
                    </div>
                    <div className="p-2 flex-1 min-w-0">
                      <p className="text-blue-700 break-words text-sm lg:text-2xl text-left font-medium pb-4 lg:pb-0">
                        {block.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          {/* Placeholder image on the right side */}
          <div className="lg:w-1/2 flex justify-center items-center">
            <img
              src={phoneImage}
              alt="Description"
              className="max-w-full pt-10 mx-auto h-[18em] w-auto lg:h-auto"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="p-8 lg:pt-18 lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto">
        <h1 className="font-medium text-4xl lg:text-7xl text-blue-700 lg:pb-4">
          How it works:
        </h1>

        <div className="hidden lg:grid grid-cols-6 gap-4 mt-8">
          {chips.map((chip, index) => (
            <img
              key={index}
              src={chip.src}
              alt={chip.alt}
              className="w-44 h-auto rounded-full"
            />
          ))}
        </div>
        <div></div>
      </section>
    </>
  );
};

export default HomePage;
