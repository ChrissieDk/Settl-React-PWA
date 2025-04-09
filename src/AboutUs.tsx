import React, { useState } from "react";
import { FaArrowRight, FaArrowUp } from "react-icons/fa";
import faqsGirl from "../src/img/Faqs/girl.png";
import gotQuestions from "../src/img/Faqs/faqs.png";
import faqBg from "../src/img/Faqs/settl see-through.png";
import Footer from "./components/Footer/Footer";
import FadeIn from "./components/FadeIn/FadeIn";

const AboutUs = () => {
  const faqData = [
    {
      id: 1,
      question: "How do I join Settl?",
      answer:
        "Click ‘Sign Up’ to create an account, then set your username and password.",
    },
    {
      id: 2,
      question: "What is my health vault?",
      answer:
        "Your Healthcare Piggy Bank! This digital stash holds the cash you set aside for cover and lets you pay your doc directly. Loading cash is easy and straightforward. Simply load your card and add money to your health vault.",
    },
    {
      id: 3,
      question: "What is a settl voucher and how does it work?",
      answer:
        "Your Magic Healthcare Coin! Think of a Settl voucher as your digital healthcare coin. Need to see a doc? Generate a voucher from your health vault (usually for the service cost). Doctors, dentists, optometrists and pharmacies love these vouchers – they just scan your QR code or enter a special code on their end. Easy payment, healthy you!",
    },
    {
      id: 4,
      question: "How can I use my health vault?",
      answer: [
        "1 Load money: Once you become a member, you can easily select the health services you need and load money into your health vault. 2 Generate a voucher: Your voucher is your digital payment for healthcare services. You can generate a voucher equal to the service fee. Providers like doctors, dentists, optometrists and pharmacists can redeem it by entering the unique code on their Settl account.",
      ],
    },
    {
      id: 5,
      question: "How do I load money into my health vault?",
      answer:
        "Log in to your Settl account. Add your card, and deposit cash directly into your health vault. ",
    },
    {
      id: 6,
      question: "Is there a monthly subscription?",
      answer:
        "No. You only pay and add money to your health vault when you’re able to.",
    },
    {
      id: 7,
      question:
        "Why should I choose Settl instead of paying the health provider directly?",
      answer:
        "Settl offers cost savings, transparent pricing, flexible payment plans, improved financial planning, and other health-related services, making it easier and more convenient.",
    },
    {
      id: 8,
      question: "What healthcare providers can I use?",
      answer:
        "We provide access to a network of qualified healthcare professionals across the nation, including GPs, dentists, optometrists and pharmacies. To see our healthcare providers, click here.",
    },
  ];

  const [activeItem, setActiveItem] = useState(null);

  // Function to toggle accordion item
  const toggleItem = (id: any) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <>
      <section
        className="bg-gray-200 w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${faqBg})`,
        }}
      >
        <FadeIn>
          <div className="pt-2 lg:pt-18 px-10 lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto flex items-center">
            <img
              className="w-auto h-[35.5rem] hidden lg:block"
              src={faqsGirl}
              alt="frequently_asked_questions_image"
            />
            <div className="relative text-left text-blue-500 ">
              <h1 className="text-4xl lg:text-[3.8rem] font-header mb-4 lg:-ml-20">
                Healthcare for EVERYONE <br />
                <span className="font-header text-4xl text-orange-500">
                  (without breaking your budget)
                </span>
              </h1>

              <h2 className="text-xl font-header">
                <strong className="text-orange-500">
                  Millions lack quality healthcare – Settl fixes that.
                </strong>
              </h2>
              <p className="text-lg mb-3 font-paragraph font-light text-black">
                We connect you to a massive network of top-notch doctors,
                dentists, and optometrists, all at better-than-market rates.
              </p>

              <h2>
                <strong className="font-header text-xl text-orange-500">
                  You're in control!
                </strong>
              </h2>
              <p className="text-black font-paragraph mb-3 text-lg">
                You're in control! Settl is a prepaid healthcare payment enabler
                that puts you in charge. Load your health vault, choose your
                cover, and access care whenever you need it
              </p>

              <h2 className="text-xl font-header text-orange-500">
                Focus on well-being, not bills.
              </h2>
              <p className="text-lg text-black mb-3 font-paragraph">
                With a simple process, it’s easy to redeem your voucher.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Possiblly add later when we have the video ? At the moment extra section seems pointless. */}
      <section className=" pb-lg-0 2xl:px-0  mx-auto">
        <FadeIn>
          <img
            className="w-full h-auto z-10"
            src={gotQuestions}
            alt="frequently_asked_questions_image"
          />
        </FadeIn>
      </section>
      <section className="p-8 lg:pt-18 lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-4xl lg:text-6xl font-header mb-10 text-gray-600">
            Unfold clarity in our FAQ section
          </div>
        </FadeIn>
        <FadeIn>
          <div className="mt-8 lg:px-20 text-xl lg:text-2xl font-header text-left">
            {faqData.map((item) => (
              <div key={item.id} className="mb-4">
                <div
                  className={`flex justify-between items-center cursor-pointer rounded-2xl p-6 lg:p-7 text-white transition-colors duration-500 ${
                    activeItem === item.id
                      ? "bg-blue-500"
                      : "bg-orange-400 hover:bg-blue-500"
                  }`}
                  onClick={() => toggleItem(item.id)}
                >
                  <div className="font-paragraph">{item.question}</div>
                  <div>
                    {activeItem === item.id ? <FaArrowUp /> : <FaArrowRight />}
                  </div>
                </div>
                {activeItem === item.id && (
                  <div className="mt-2 text-left p-2 text-xl font-paragraph">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;
