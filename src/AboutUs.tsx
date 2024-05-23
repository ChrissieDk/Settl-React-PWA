import React, { useState } from "react";
import { FaArrowRight, FaArrowUp } from "react-icons/fa";
import faqsGirl from "../src/img/Faqs/girl.png";

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
      question: "What is my health wallet?",
      answer:
        "Your Healthcare Piggy Bank! This digital stash holds the cash you set aside for cover and lets you pay your doc directly. Here's how you can feed your piggy bank: Cash: Straightforward and simple. Buy now, pay later: Spread the cost (check for options!).Medical credit (if available): Use a credit option for healthcare.Pay as you can: Contribute what you can. Top it up, pay your doc, stay healthy!",
    },
    {
      id: 3,
      question: "How does ‘buy now, pay later’ work?",
      answer:
        "With ‘buy now, pay later’, you can use our healthcare services and arrange to pay later. Settl uses reliable third-party providers to offer funds up front. You may apply for credit, and upon confirmation, the money will be transferred into your health wallet. Then you can book an appointment with your service provider and get your consultation.",
    },
    {
      id: 4,
      question: "What is a settl token and how does it work?",
      answer:
        "Your Magic Healthcare Coin! Think of a Settl token as your digital healthcare coin. Need to see a doc? Generate a token from your health wallet (usually for the service cost). Doctors, dentists, optometrists and pharmacies love these tokens – they just scan your QR code or enter a special code on their end. Easy payment, healthy you!",
    },
    {
      id: 5,
      question: "How can I use my health wallet?",
      answer:
        "1 Load money: Once you become a member, you can easily select the health services you need and load money into your health wallet. 2 Generate a token: Your token is your digital payment for healthcare services. You can generate a token equal to the service fee. Providers like doctors, dentists, optometrist and pharmacist can redeem it by scanning the QR code or entering the unique code on their Settl account. 3 Send and receive: Easily send and receive funds from other Settl members.",
    },
    {
      id: 6,
      question: "Can I send money to another person's health wallet?",
      answer:
        "Absolutely! You can effortlessly send or receive money from anyone who’s also a Settl member.",
    },
    {
      id: 7,
      question: "How do I load money into my health wallet?",
      answer:
        "Cash payment: Deposit cash directly from your bank account into your health wallet. Settl accepts most payment methods. Buy now, pay later: You can use a healthcare provider immediately, and then pay back in monthly installments until your account is settled",
    },
    {
      id: 8,
      question:
        "Why should I choose Settl instead of paying the health provider directly?      ",
      answer:
        "Settl offers cost savings, transparent pricing, flexible payment plans, improved financial planning, and other health-related services, making it easier and more convenient.",
    },
    {
      id: 9,
      question:
        "What if my consultation costs more than the balance in my health wallet?",
      answer:
        "You can either add more money to your health wallet or pay the provider directly in cash. You also have the option to apply for credit through our ‘buy now, pay later’ option, which allows you to access funds up front for your healthcare needs.",
    },
    {
      id: 10,
      question: "Can I withdraw funds from my health wallet?",
      answer:
        "Yes, you can access cash from your health wallet as needed by transferring the money into a bank account. Banking fees will apply.",
    },
    {
      id: 11,
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
      <section className="bg-orange-400 w-full">
        <div className="pt-2 lg:pt-18 px-10 lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto flex items-center">
          <img
            className="w-auto h-[35rem] hidden lg:block"
            src={faqsGirl}
            alt="frequently_asked_questions_image"
          />
          <div className="text-left text-white">
            <h1 className="text-4xl lg:text-[3.5rem] font-header mb-4">
              Healthcare for EVERYONE <br />
              <p className="font-header text-4xl text-black">
                (at South African prices!)
              </p>
            </h1>

            <h1 className="text-xl font-header ">
              <strong className="text-black">
                Millions lack quality healthcare – Settl fixes that.
              </strong>
            </h1>
            <p className="text-lg mb-4 font-paragraph font-light text-black">
              We connect you to a massive network of top-notch doctors,
              dentists, and optometrists, all at better-than-market rates.
            </p>

            <h1>
              <strong className="font-header text-xl">
                You're in control!
              </strong>
            </h1>
            <p className="text-black font-paragraph mb-4 text-lg">
              Settl is a prepaid healthcare payment enabler that puts you in
              charge. Load your health wallet, choose your cover, and access
              care whenever you need it. Pay as you go, with the flexibility to
              fit your life.
            </p>

            <h1 className="text-xl text-white font-header">
              Focus on well-being, not bills.
            </h1>
            <p className="text-lg text-black mb-4 font-paragraph">
              We handle the costs, you focus on staying healthy. That's the
              Settl difference.
            </p>
          </div>
        </div>
      </section>

      <section className="p-8 lg:pt-18 lg:px-20 pb-lg-0 2xl:px-0 2xl:max-w-7xl mx-auto">
        <div className="text-4xl lg:text-6xl font-header mb-10 text-gray-600">
          Unfold clarity in our FAQ section
        </div>
        <div className="mt-8 lg:px-24 text-xl font-header text-left">
          {faqData.map((item) => (
            <div key={item.id} className="mb-4">
              <div
                className={`flex justify-between items-center cursor-pointer rounded-2xl p-6 text-white transition-colors duration-500 ${
                  activeItem === item.id
                    ? "bg-blue-500"
                    : "bg-orange-400 hover:bg-blue-500"
                }`}
                onClick={() => toggleItem(item.id)}
              >
                <div className="font-semibold">{item.question}</div>
                <div>
                  {activeItem === item.id ? <FaArrowUp /> : <FaArrowRight />}
                </div>
              </div>
              {activeItem === item.id && (
                <div className="mt-2 text-left p-2 text-lg">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AboutUs;
