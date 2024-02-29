import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

const AboutUs = () => {
  const faqData = [
    {
      question: "What is Lorem Ipsum What is Lorem Ipsum?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      question: "Why do we use it What is Lorem Ipsum?",
      answer:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      question: "What is Lorem Ipsum What is Lorem Ipsum",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      question: "Why do we use it?",
      answer:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      question: "What is Lorem Ipsum What is Lorem Ipsum?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      question: "Why do we use it?",
      answer:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout..",
    },
  ];

  const [activeItem, setActiveItem] = useState(null);

  // Function to toggle accordion item
  const toggleItem = (index: any) => {
    setActiveItem(activeItem === index ? null : index);
  };

  return (
    <section className="p-8 lg:pt-18 lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto">
      <div className="text-2xl lg:text-5xl font-bold mb-10">
        Unfold clarity in our FAQ section
      </div>
      <div className="mt-8 lg:px-36 text-lg">
        {faqData.map((item, index) => (
          <div key={index} className="mb-4">
            <div
              className={`flex justify-between items-center cursor-pointer rounded-3xl p-6 text-white transition-colors duration-500 ${
                activeItem === index
                  ? "bg-blue-500"
                  : "bg-orange-400 hover:bg-blue-500"
              }`}
              onClick={() => toggleItem(index)}
            >
              <div className="font-semibold">{item.question}</div>
              <div>
                {activeItem === index ? <FaArrowUp /> : <FaArrowRight />}
              </div>
            </div>
            {activeItem === index && (
              <div className="mt-2 text-left p-6 text-lg">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
