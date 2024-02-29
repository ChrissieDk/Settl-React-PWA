import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useTypingEffect from "./hooks/useTypingEffect/UseTypingEffect";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

//images and icons
import chip1 from "./img/1.png";
import chip2 from "./img/2.png";
import chip3 from "./img/3.png";
import chip4 from "./img/4.png";
import chip5 from "./img/5.png";
import chip6 from "./img/6.png";
import { FaSliders } from "react-icons/fa6";
import { GrUserSettings } from "react-icons/gr";
import { LuHeartHandshake } from "react-icons/lu";
import { FaUserDoctor } from "react-icons/fa6";
import { LiaToothSolid } from "react-icons/lia";
import { PiEyeThin } from "react-icons/pi";
import { GiMedicinePills } from "react-icons/gi";
import HeroSection from "./components/HomePageComponents.tsx/HeroSection/HeroSection";
import phoneImage from "./img/HP_Phones.png";
import planBg from "./img/image3.png";
import BlocksContainer from "./components/Block/BlockContainer";

const blockText = [
  {
    description:
      "Build your customised healthcare package. Lorem ipsum dolor sit amet, consectetur adipiscing.",
    IconComponent: FaSliders,
    id: "1",
  },
  {
    description:
      "Access, manage and view total cover. Lorem ipsum dolor sit amet, consectetur adipiscing.",
    IconComponent: GrUserSettings,
    id: "2",
  },
  {
    description:
      "Feel empowered by tailoring your own healthcare coverage. Lorem ipsum dolor sit amet, consectetur adipiscing.",
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

const sliderHeaders = ["GP", "Dentistry", "Optometry", "OTC"];

const HomePage = () => {
  const [iconSize, setIconSize] = useState(100);
  const dynamicWords = ["Freedom", "Flexibility", "Choice"];
  const dynamicText = useTypingEffect(dynamicWords);
  const [sliderValues, setSliderValues] = useState<number[]>([0, 0, 0, 0]);
  const suggestedUnitPrice = [600, 750, 1500, 0];

  const onChangeEventTriggered = (
    index: number,
    newValue: number | number[]
  ): void => {
    // Ensure only a number is processed
    const valueToProcess = Array.isArray(newValue) ? newValue[0] : newValue; // Taking the first value if it's an array

    const updatedSliderValues = sliderValues.map((value, i) =>
      i === index ? valueToProcess : value
    );
    setSliderValues(updatedSliderValues);
  };

  const calculatedCosts = sliderValues.map(
    (visits, index) => visits * suggestedUnitPrice[index]
  );

  const calculateDisplayValues = () =>
    sliderValues.map((value, index) => value * suggestedUnitPrice[index]);

  const totalValue = calculatedCosts.reduce((acc, current) => acc + current, 0);

  const displayValues = calculateDisplayValues();

  useEffect(() => {
    console.log("Component updated, current values:", sliderValues);
  }, [sliderValues]);

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
          <HeroSection dynamicText={dynamicText} />
        </div>
        {/* Interested button - always visible */}
        <button className="fixed bottom-10 right-0 p-4 bg-orange-400 text-white font-bold lg:text-xl rounded-l-full rounded-r-none shadow-lg hover:bg-blue-700 active:scale-95 transition duration-300 ease-in-out z-50 uppercase">
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
                <span className="text-orange-400 ">Take control</span> of your
                money and health.
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
                      <p className="text-blue-700 break-words text-sm lg:text-xl text-left font-medium lg:pb-0">
                        {block.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          {/* Placeholder image on the right side */}
          <div className="lg:w-1/2 flex justify-center items-center pt-5 pb-5">
            <img
              src={phoneImage}
              alt="Description"
              className="max-w-full mx-auto h-[18em] w-auto lg:h-[30rem]"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="p-8 lg:pt-18 lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto">
        <h1 className="font-medium text-4xl lg:text-7xl text-blue-700 lg:pb-4">
          How it works<span className="text-orange-400"> :</span>
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

        {/* First Group of Three Blocks */}
        <div className="pt-10">
          <div className="grid lg:grid-cols-1 grid-cols-1 gap-4 w-full">
            <BlocksContainer />
          </div>
        </div>
      </section>

      {/* Its as easy as... */}
      <section className="p-8 lg:pt-18 lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto">
        <h1 className="text-blue-700 font-medium text-4xl lg:text-7xl text-left">
          It's as <span className="text-orange-400">easy</span> as..
        </h1>
        <div className="lg:pt-10">
          <p className="pt-2 text-left text-blue-700">
            Effortlessly customize your choices with the slider. Just slide to
            set the desired payment amount, then click for instant results!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
          <div className="lg:w-1/2 p-10">
            {sliderValues.map((value, index) => (
              <div key={index} className="mb-8">
                <div className="mb-2 text-xl text-black text-left">
                  {sliderHeaders[index]}
                </div>
                <div className="relative flex items-center">
                  <Slider
                    trackStyle={{ backgroundColor: "blue", height: 7 }}
                    railStyle={{ backgroundColor: "lightblue", height: 7 }}
                    handleStyle={{
                      borderColor: "blue",
                      height: 15,
                      width: 15,
                      marginLeft: -7,
                      marginTop: -4,
                      backgroundColor: "blue",
                    }}
                    value={value}
                    min={0}
                    max={5}
                    step={1}
                    onChange={(newValue) =>
                      onChangeEventTriggered(index, newValue)
                    }
                    className="flex-grow"
                  />
                  <input
                    type="text"
                    value={displayValues[index]}
                    className="ml-4 w-20 h-10 flex justify-center items-center border-2 border-orange-400 text-sm rounded-xl text-center"
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              backgroundImage: `url(${planBg})`,
              backgroundSize: "120%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="w-full lg:w-1/2 flex justify-center mt-10"
          >
            <div className="relative h-96 w-3/4 lg:w-[45%] lg:h-[92%] mx-auto my-auto rounded-2xl shadow-2xl flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-orange-400 opacity-70 rounded-2xl"></div>
              <div className="px-4 py-4 w-full text-center relative z-10">
                <h1 className="pb-6 lg:text-2xl font-bold text-white">
                  Your Plan Value Is
                </h1>
                <div className="mx-auto flex items-center justify-center">
                  <svg
                    height="140"
                    width="140"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle r="45" cx="50" cy="50" fill="lightblue" />
                    <text
                      x="50%"
                      y="50%"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      fill="white"
                    >
                      R {totalValue}
                    </text>
                  </svg>
                </div>
                <ul className="text-left w-full pt-4 text-lg">
                  <h1 className="lg:text-xl font-bold text-white">Benefits</h1>
                  <div className="pl-2">
                    <li className="flex items-center">
                      <FaUserDoctor className="mr-2 text-white" />{" "}
                      <span className="text-white">R {displayValues[0]}</span>
                    </li>
                    <li className="flex items-center">
                      <LiaToothSolid className="mr-2 text-white" />{" "}
                      <span className="text-white">R {displayValues[1]}</span>
                    </li>
                    <li className="flex items-center">
                      <PiEyeThin className="mr-2 text-white" />{" "}
                      <span className="text-white">R {displayValues[2]}</span>
                    </li>
                    <li className="flex items-center">
                      <GiMedicinePills className="mr-2 text-white" />{" "}
                      <span className="text-white">R {displayValues[3]}</span>
                    </li>
                  </div>
                </ul>
              </div>
              <button className="w-auto p-2 ml-2 mr-2 border shadow-md rounded-xl lg:w-auto bg-gray-600 text-white hover:bg-transparent hover:border-black hover:text-black active:transparent active:scale-95 transition duration-200 ease-in-out relative z-10">
                <h1 className="lg:text-lg font-medium">I'M INTERESTED</h1>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
