import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useTypingEffect from "./hooks/useTypingEffect/UseTypingEffect";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import { HealthCalculator } from "./components/HomePageComponents/HealthCalculator/HealthCalculator";
import { IconList } from "./components/HomePageComponents/HealthCalculator/SliderIcons";
import Footer from "./components/Footer/Footer";
//images and icons
import HeroSection from "./components/HomePageComponents/HeroSection/HeroSection";
import planBg from "./img/image3.png";
import smilingPeople from "./img/Homepage/smiling_people.png";
import takeControl1 from "./img/Homepage/slider icon.png";
import takeControl2 from "./img/Homepage/pay icon.png";
import takeControl3 from "./img/Homepage/support icon.png";
import blurredBird from "../src/img/Homepage/settl bird_blur.png";
import step1 from "../src/img/Homepage/1.png";
import step2 from "../src/img/Homepage/2.png";
import step3 from "../src/img/Homepage/3.png";
import penIcon from "../src/img/Homepage/pen-icon.png";
import stethoscope from "../src/img/Homepage/stethoscope.png";
import slider from "../src/img/Homepage/slider.png";
import FadeIn from "./components/FadeIn/FadeIn";

const blockText = [
  {
    description: "Use our health calculator to find your perfect fit! ",
    imgSrc: takeControl1,
    id: "1",
  },
  {
    description:
      "Load your vault – your vault is where you spend and take control of your health. ",
    imgSrc: takeControl2,
    id: "2",
  },
  {
    description:
      "Pay merchants quickly and easily – no cash needed when you’ve planned ahead. ",
    imgSrc: takeControl3,
    id: "3",
  },
];

const HomePage = () => {
  const [iconSize, setIconSize] = useState(100);
  const dynamicWords = ["Freedom", "Flexibility", "Choice"];
  const dynamicText = useTypingEffect({
    words: dynamicWords,
  });
  const [otcMeds, setOtcMeds] = useState(0);
  const [gpVisits, setGpVisits] = useState<Record<string, number>>({});
  const [dentalVisits, setDentalVisits] = useState<Record<string, number>>({});
  const [optometryVisits, setOptometryVisits] = useState<
    Record<string, number>
  >({});

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
      <section className="p-8 lg:p-0  lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row w-full">
          <FadeIn>
            <HeroSection dynamicText={dynamicText} />
          </FadeIn>
        </div>
        {/* Interested button - always visible */}
        <button className="fixed bottom-10 right-0 p-4 bg-orange-400 text-white font-bold lg:text-xl rounded-l-full rounded-r-none shadow-lg hover:bg-blue-500 active:scale-95 transition duration-300 ease-in-out z-50 uppercase">
          <h1 className="pl-6 pr-2 font-button">I'm interested</h1>
        </button>
      </section>

      {/* Take control section */}
      <FadeIn>
        <section className="w-full bg-gray-200">
          <div className="p-8 lg:pt-18 lg:px-20 pb-0 2xl:px-0 2xl:max-w-7xl mx-auto bg-gray-200">
            <div className="flex flex-col lg:flex-row items-center lg:justify-center w-full">
              {/* Left Section - Centered Text */}
              <div className="lg:w-1/2 flex flex-col justify-center h-full">
                <h1 className="font-header text-4xl lg:text-6xl text-left text-blue-500">
                  <span className="text-orange-400 font-header">
                    Take control
                  </span>{" "}
                  of your money and health.
                </h1>

                <div className="flex flex-col space-y-6 mt-10">
                  <AnimatePresence mode="wait">
                    {blockText.map((block) => {
                      const learnMoreUrl = "/Settl-React-PWA";

                      return (
                        <motion.div
                          key={block.id}
                          initial={{ opacity: 0, y: 30, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -30, scale: 0.95 }}
                          transition={{
                            duration: 0.4,
                            ease: "easeOut",
                          }}
                          className="flex items-center space-x-4"
                        >
                          {/* Icon Wrapper */}
                          <div className="w-14 h-14 lg:w-24 lg:h-24 flex justify-center items-center bg-orange-400 rounded-lg">
                            <img
                              src={block.imgSrc}
                              alt="Icon"
                              className="w-8 h-8 lg:w-14 lg:h-14 object-contain"
                            />
                          </div>

                          {/* Text */}
                          <div className="flex-1">
                            <p className="text-blue-500 text-sm lg:text-lg font-paragraph text-left">
                              {block.description}{" "}
                              <a
                                href={learnMoreUrl}
                                className="text-orange-400 hover:text-blue-500 underline"
                              >
                                <br />
                                Learn more
                              </a>
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Section - Image Centered */}
              <div className="lg:w-1/2 flex justify-center items-center pt-5">
                <motion.img
                  src={smilingPeople}
                  alt="People smiling"
                  className="hidden lg:block max-w-full h-auto w-full object-contain"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* How it works */}
      <FadeIn>
        <section className="p-8 lg:pt-18 lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto relative">
          <h1 className="font-header text-4xl lg:text-7xl text-blue-500 pb-6 lg:pb-4">
            How it works<span className="text-orange-400"> :</span>
          </h1>
          <div className="absolute inset-0 z-0">
            <img
              src={blurredBird}
              alt="Dove Behind"
              className="h-20 lg:h-40 w-auto object-cover blur-[2px] lg:ml-24"
            />
          </div>
          <div className="absolute top-8 right-0 lg:-right-8 z-0">
            <img
              src={blurredBird}
              alt="Dove Behind"
              className="h-16 lg:h-72 w-auto object-cover blur-[2px] lg:ml-10 scale-x-[-1]"
            />
          </div>
          <div className="relative lg:h-[60vh] flex justify-center items-center">
            <div className="flex flex-col lg:flex-row lg:justify-between space-y-4 md:mx-40 lg:space-y-0 mx-auto w-full">
              {[
                {
                  title: "JOIN SETTL",
                  text: "It's free, takes seconds!",
                  icon: penIcon,
                },
                {
                  title: "CRAFT YOUR PLAN",
                  text: "Use our calculator to customise how much you allocate for doctors, dentists, optometrists and meds.",
                  icon: slider,
                },
                {
                  title: "SEE YOUR DOC",
                  text: "Pay seamlessly with your Settl token at checkout!",
                  icon: stethoscope,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="w-full lg:w-[32%] md:h-[18rem] px-4  relative flex flex-col items-center text-center bg-[#4d4d4d] text-white rounded-xl p-6 min-h-[180px] shadow-lg"
                >
                  {/* Icon */}
                  <div>
                    <img
                      className="w-12 h-12 object-contain"
                      src={item.icon}
                    ></img>
                  </div>
                  {/* Title */}
                  <h2 className="text-lg lg:text-2xl font-semibold text-orange-400 mt-3">
                    {item.title}
                  </h2>
                  {/* Divider */}
                  <hr className="w-[80%] border-[3px] border-white my-2 rounded-xl" />
                  {/* Text */}
                  <p className="text-sm lg:text-lg font-light">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Health Calculator */}
      <FadeIn>
        <section className="bg-gray-200">
          <div className="p-8 pt-2 lg:pt-12 lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto">
            <h1 className="text-4xl lg:text-7xl text-left text-blue-500 font-header">
              Health{" "}
              <span className="text-orange-400 font-header">Calculator</span>
            </h1>
            <p className="text-blue-500 pl-1 text-left font-paragraph mt-4">
              Ready to personalise your health cover? Follow these simple steps!
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 text-left">
              {/* Block 1 */}
              <div className="flex items-center space-x-4">
                <img className="h-20 w-20" src={step1} alt="first step" />
                <div className="flex-1">
                  <p className="text-sm text-blue-500 font-paragraph lg:mr-8">
                    <span className="text-orange-400 font-paragraph">
                      Slide and Select:
                    </span>{" "}
                    Our health calculator features easy-to-use sliders. Slide
                    each dial to the level of cover you want for GP visits,
                    dental consultations, optometry appointments, and even OTC
                    medication.
                  </p>
                </div>
              </div>
              {/* Block 2 */}
              <div className="flex items-center space-x-4">
                <img className="h-20 w-20" src={step2} alt="second step" />
                <div className="flex-1">
                  <p className="text-sm text-blue-500 font-paragraph lg:mr-8">
                    <span className="text-orange-400 font-paragraph">
                      Instant Update:
                    </span>{" "}
                    As you adjust each slider, watch the recommended cover
                    amount for your health vault update in real time!
                  </p>
                </div>
              </div>
            </div>
            {/* Block 3 - Placed under the first step */}
            <div className="flex items-center space-x-4 mt-4 text-left lg:w-1/2 lg:pt-6">
              <img className="h-20 w-20" src={step3} alt="third step" />
              <div className="flex-1">
                <p className="text-sm text-blue-500 font-paragraph lg:mr-8">
                  <span className="text-orange-400 font-paragraph">
                    Your Cover Defined: Slide, See, Save!
                  </span>{" "}
                  The calculator shows your personalised cover for each
                  selection. Simply load your Settl health vault with this
                  amount to unlock quality private healthcare at
                  lower-than-market rates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Health Calculator - slider */}
        <section className="bg-gray-300">
          <div className="p-4  lg:px-20 2xl:px-0 2xl:max-w-7xl mx-auto ">
            <div className="flex flex-col lg:flex-row bg-gray-300 justify-center items-center mx-auto ">
              <div className="w-full  mb-8 lg:mb-0">
                <h1 className="text-left p-4 font-header text-3xl lg:text-5xl text-blue-500">
                  Adjust to your budget
                </h1>
                <HealthCalculator
                  otcMeds={otcMeds}
                  setOtcMeds={setOtcMeds}
                  gpVisits={gpVisits}
                  setGpVisits={setGpVisits}
                  dentalVisits={dentalVisits}
                  setDentalVisits={setDentalVisits}
                  optometryVisits={optometryVisits}
                  setOptometryVisits={setOptometryVisits}
                />
              </div>
              <div className="relative w-full h-full bg-gray-300">
                {/* Container for background image and content */}
                <div
                  className="relative w-full h-full bg-cover bg-center mx-auto"
                  style={{
                    backgroundImage: `url(${planBg})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {/* Centered content inside the background */}
                  <div className="flex flex-col justify-center items-center h-full pt-10">
                    <IconList
                      gpVisits={Object.values(gpVisits).reduce(
                        (a, b) => a + b,
                        0
                      )}
                      dental={Object.values(dentalVisits).reduce(
                        (a, b) => a + b,
                        0
                      )}
                      optometry={Object.values(optometryVisits).reduce(
                        (a, b) => a + b,
                        0
                      )}
                      otcMeds={otcMeds}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
      <Footer />
    </>
  );
};

export default HomePage;
