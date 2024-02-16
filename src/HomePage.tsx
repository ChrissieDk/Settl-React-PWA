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
import HeroSection from "./components/HeroSection/HeroSection";
import phoneImage from "./img/HP_Phones.png";
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

const sliderHeaders = ["GP", "Optometry", "Dentistry", "OTC"];

// interface Block {
//   description: string;
//   IconComponent: React.ElementType;
//   id: string;
// }

const HomePage = () => {
  const [iconSize, setIconSize] = useState(100);
  const dynamicWords = ["Freedom", "Flexibility", "Choice"];
  const dynamicText = useTypingEffect(dynamicWords);
  const [value, setValue] = useState(0);
  const [values, setValues] = useState<number[]>([0, 0, 0, 0]); // values for slider

  const onChangeEventTriggered = (
    index: number,
    newValue: number | number[]
  ) => {
    // Check if newValue is an array and handle accordingly
    if (Array.isArray(newValue)) {
      // Handle the case where newValue is an array (e.g., for range sliders)
      // This might involve updating your state differently
      console.log("Received an array of values", newValue);
    } else {
      // Handle the case where newValue is a single number
      const updatedValues = values.map((value, i) =>
        i === index ? newValue : value
      );
      setValues(updatedValues);
    }
  };

  const sliderWidth = 450; // Assume you've dynamically determined this
  const handleWidth = 20; // The width of your handle

  const calculateLeftPosition = (value: number, maxValue: number) => {
    const trackWidth = sliderWidth - handleWidth;
    const positionRatio = value / maxValue;
    return trackWidth * positionRatio - handleWidth / 2; // Adjust based on handle's alignment
  };

  useEffect(() => {
    console.log("Component updated, current values:", values);
  }, [values]);

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
        <div className="lg:w-1/2 p-10 gap-32">
          <div className="mb-2">
            {values.map((value, index) => (
              <div key={index} className="mb-8">
                {/* Header above the Slider */}
                <div className="mb-2 text-xl text-black text-left">
                  {sliderHeaders[index]}
                </div>
                {/* Slider and value display container */}
                <div className="relative flex items-center">
                  <Slider
                    trackStyle={{ backgroundColor: "blue", height: 7 }}
                    railStyle={{ backgroundColor: "lightblue", height: 7 }}
                    handleStyle={{
                      borderColor: "blue",
                      height: 15,
                      width: 15,
                      marginLeft: 5,
                      marginTop: -5,
                      backgroundColor: "blue",
                    }}
                    value={value}
                    min={0}
                    max={1500}
                    step={0.5}
                    onChange={(newValue) =>
                      onChangeEventTriggered(index, newValue)
                    }
                    className="flex-grow"
                  />
                  {/* Tooltip for displaying the current value */}
                  <div
                    style={{
                      position: "absolute",
                      left: `${calculateLeftPosition(value, 1500)}px`,
                      bottom: "30px", // Adjust based on your slider's handle size
                      zIndex: 2, // Ensure it's above the slider
                    }}
                    className="w-20 h-10 flex justify-center items-center border-2 border-orange-400 text-sm rounded-xl "
                  >
                    R {value}
                  </div>
                  {/* Value display box to the right of the slider */}
                  <div className="ml-4 w-20 h-10 flex justify-center items-center border-2 border-orange-400 text-sm rounded-xl">
                    R {value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2">
          {/* <Slider defaultValue={60} min={0} max={500} /> */}
        </div>
      </section>
      {/* Effortlessly customize your choices with the slider.
Just slide to set the desired payment amount, then click for
instant results! */}
    </>
  );
};

export default HomePage;
