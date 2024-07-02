import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useTypingEffect from "./hooks/useTypingEffect/UseTypingEffect";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import { HealthCalculator } from "./components/HomePageComponents.tsx/HealthCalculator/HealthCalculator";
import { IconList } from "./components/HomePageComponents.tsx/HealthCalculator/SliderIcons";

//images and icons
import HeroSection from "./components/HomePageComponents.tsx/HeroSection/HeroSection";
import planBg from "./img/image3.png";
import smilingPeople from "./img/Homepage/smiling_people.png";
import takeControl1 from "./img/Homepage/slider icon.png";
import takeControl2 from "./img/Homepage/pay icon.png";
import takeControl3 from "./img/Homepage/support icon.png";
import block1 from "../src/img/Homepage/join settl.png";
import block2 from "../src/img/Homepage/craft your plan.png";
import block3 from "../src/img/Homepage/see your doc.png";
import blurredBird from "../src/img/Homepage/settl bird_blur.png";
import step1 from "../src/img/Homepage/1.png";
import step2 from "../src/img/Homepage/2.png";
import step3 from "../src/img/Homepage/3.png";
import { get } from "http";

const blockText = [
  {
    description:
      "Use our health calculator to find your perfect fit!Slide the dials to adjust cover for GP, dentist and optometrists’ visits, and even the amount of OTC  medication you need. Learn more.",
    imgSrc: takeControl1,
    id: "1",
  },
  {
    description:
      "Pay the way that works for you! We offer a variety of flexible payment options, including cash, buy now, pay later, medical credit, and even a customisable payment plan. Learn more.",
    imgSrc: takeControl2,
    id: "2",
  },
  {
    description:
      "Support their health! Send and receive funds for your loved ones' health wallets. Learn more.",
    imgSrc: takeControl3,
    id: "3",
  },
];

// write call getAllUsers from dataService

const HomePage = () => {
  const [iconSize, setIconSize] = useState(100);
  const dynamicWords = ["Freedom", "Flexibility", "Choice"];
  const dynamicText = useTypingEffect(dynamicWords);
  const [gpVisits, setGpVisits] = useState(0);
  const [dental, setDental] = useState(0);
  const [optometry, setOptometry] = useState(0);
  const [otcMeds, setOtcMeds] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      // Adjust this logic based on your specific responsive breakpoints
      setIconSize(window.innerWidth < 768 ? 40 : 100);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check if user is logged in
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/firebase.User
  //       const uid = user.uid;
  //       // ...
  //       console.log("uid", uid);
  //     } else {
  //       // User is signed out
  //       console.log("user is logged out");
  //     }
  //   });
  // }, []);

  return (
    <>
      {/* Hero section */}
      <section className="p-8 lg:pt-18 lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row w-full">
          <HeroSection dynamicText={dynamicText} />
        </div>
        {/* Interested button - always visible */}
        <button className="fixed bottom-10 right-0 p-4 bg-orange-400 text-white font-bold lg:text-xl rounded-l-full rounded-r-none shadow-lg hover:bg-blue-500 active:scale-95 transition duration-300 ease-in-out z-50 uppercase">
          <h1 className="pl-6 pr-2 font-button">I'm interested</h1>
        </button>
      </section>

      {/* Take control section */}
      <section className="w-full bg-gray-200">
        <div className="p-8 lg:pt-18 lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto bg-gray-200">
          <div className="flex flex-col lg:flex-row w-full">
            <div className="lg:w-1/2 flex flex-col">
              <div>
                <h1 className="font-header text-4xl lg:text-6xl text-left text-blue-500">
                  <span className="text-orange-400 font-header">
                    Take control
                  </span>{" "}
                  of your money and health.
                </h1>
              </div>

              <div className="flex flex-col space-y-4 mt-10">
                <AnimatePresence>
                  {blockText.map((block) => {
                    const learnMoreUrl = "/Settl-React-PWA";

                    return (
                      <motion.div
                        key={block.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex lg:flex-row items-center lg:space-x-4 space-y-4 lg:space-y-0"
                      >
                        <div className="w-16 h-16 lg:w-32 lg:h-32 lg:p-10 bg-orange-400 flex justify-center items-center text-2xl text-gray-800 rounded-xl mr-2 lg:mr-0">
                          <img
                            src={block.imgSrc}
                            alt="Icon"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-2 flex-1 min-w-0">
                          <p className="text-blue-500 break-words text-sm lg:text-lg text-left font-paragraph lg:pb-0">
                            {block.description.replace("Learn more.", "")}
                            <a
                              href={learnMoreUrl}
                              className="text-orange-400 hover:text-blue-500 underline"
                            >
                              Learn more.
                            </a>
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
            <div className="lg:w-1/2 flex items-center pt-5 pb-5 relative">
              <img
                src={smilingPeople}
                alt="Description"
                className="hidden lg:block absolute max-w-full h-[18em] w-auto lg:h-[36rem] bottom-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="p-8 lg:pt-18 lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto relative">
        <h1 className="font-header text-4xl lg:text-7xl text-blue-500 lg:pb-4">
          How it works<span className="text-orange-400"> :</span>
        </h1>
        <div className="absolute inset-0 z-0">
          {/* TOP LEFT  */}
          <img
            src={blurredBird}
            alt="Dove Behind"
            className="h-20 lg:h-40 w-auto object-cover blur-[2px] lg:ml-24"
          />
        </div>
        <div className="absolute top-8 right-0 lg:-right-8 z-0">
          {/* TOP RIGHT */}
          <img
            src={blurredBird}
            alt="Dove Behind"
            className="h-16 lg:h-72 w-auto object-cover blur-[2px] lg:ml-10 scale-x-[-1]"
          />
        </div>

        <div className="relative lg:h-[70vh] flex justify-center items-center">
          <div className="flex flex-col lg:flex-row lg:justify-between space-y-4 lg:space-y-0 mx-auto">
            <div className="w-full lg:w-[30%] px-2 relative">
              <img className="w-full h-auto" src={block1} alt="testblock" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 flex flex-col items-center text-center w-full">
                <h2 className="text-2xl lg:text-2xl font-button mt-2 text-black">
                  JOIN SETTL
                </h2>
                <p className="text-xl lg:text-lg font-paragraph text-white">
                  It’s free, takes seconds!
                </p>
              </div>
            </div>
            <div className="w-full lg:w-[30%] px-2 relative">
              <img
                className="lg:w-full lg:h-auto"
                src={block2}
                alt="testblock"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-12 flex flex-col items-center text-center w-full">
                <h2 className="pt-14 text-2xl lg:text-2xl font-button mt-2 text-black lg:pt-10">
                  CRAFT YOUR PLAN
                </h2>
                <p className="text-xl lg:text-lg font-paragraph text-white">
                  Use our calculator to customise how much you allocate for
                  doctors, dentists, optometrists and meds.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-[30%] px-2 relative">
              <img className="w-full h-auto" src={block3} alt="testblock" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-12 flex flex-col items-center text-center w-full">
                <h2 className="text-2xl lg:text-2xl font-button mt-2 text-black lg:pt-3">
                  SEE YOUR DOC
                </h2>
                <p className="text-xl lg:text-lg font-paragraph text-white">
                  Pay seamlessly with your Settl token at checkout!
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-[-8%] z-0">
            {/* BOTTOM LEFT */}
            <img
              src={blurredBird}
              alt="Dove Behind"
              className="h-24 lg:h-56 w-auto object-cover blur-[2px] lg:ml-10"
            />
          </div>
        </div>
      </section>

      {/* Health Calculator */}
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
                  Our health calculator features easy-to-use sliders. Slide each
                  dial to the level of cover you want for GP visits, dental
                  consultations, optometry appointments, and even OTC
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
                  As you adjust each slider, watch the recommended cover amount
                  for your health wallet update in real time!
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
                The calculator shows your personalised cover for each selection.
                Simply load your Settl health wallet with this amount to unlock
                quality private healthcare at lower-than-market rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Health Calculator - slider */}
      <section className="bg-gray-300 h-[30rem]">
        <div className="p-8 lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row bg-gray-300">
            <div className="lg:w-2/5">
              <HealthCalculator
                gpVisits={gpVisits}
                setGpVisits={setGpVisits}
                dental={dental}
                setDental={setDental}
                optometry={optometry}
                setOptometry={setOptometry}
                otcMeds={otcMeds}
                setOtcMeds={setOtcMeds}
              />
            </div>
            <div
              className="bg-cover bg-center lg:w-3/5 lg:m-[-7rem] lg:ml-[1rem] lg:mr-[-6rem] relative"
              style={{ backgroundImage: `url(${planBg})` }}
            >
              <IconList
                gpVisits={gpVisits}
                dental={dental}
                optometry={optometry}
                otcMeds={otcMeds}
              />
              {/* Centered Button below IconList */}
              <button className="absolute bottom-16 w-48 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white hover:bg-transparent hover:border-black hover:text-black active:transparent active:scale-95 transition duration-200 ease-in-out p-2 border shadow-md rounded-xl font-button">
                I'M INTERESTED
              </button>
            </div>
          </div>
        </div>
      </section>
      <section></section>
    </>
  );
};

export default HomePage;
