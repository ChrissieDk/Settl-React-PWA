import React, { useState, useEffect } from "react";
import { Token, UrlData } from "../../types/Types";
import {
  createOrder,
  initiateAuthenticateToken,
  payment,
} from "../../Services/data.service";
import Lottie from "lottie-react";
import successAnimation from "../../successAnimation.json";
import failureAnimation from "../../failureAnimation.json";

interface LoadProps {
  tokens: Token[];
  circleImages: string[];
  circleTexts: string[];
  setTokens: React.Dispatch<React.SetStateAction<Token[]>>;
  setSelectedToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const Load: React.FC<LoadProps> = ({
  tokens,
  circleImages,
  circleTexts,
  setTokens,
  setSelectedToken,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [selectedToken, setSelectedTokenState] = useState<string | null>(null);
  const [activeText, setActiveText] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [data, setData] = useState<UrlData | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "success" | "failure"
  >("idle");

  useEffect(() => {
    const url = window.location.href;
    if (url.includes("data=")) {
      const urlParams = new URLSearchParams(new URL(url).search);
      const base64Data = urlParams.get("data");

      if (base64Data) {
        try {
          const decodedString = atob(base64Data);
          const jsonData: UrlData = JSON.parse(decodedString);
          if (jsonData.responseCode == "00") {
            pay(jsonData);
          }
          setData(jsonData);
        } catch (error) {
          console.error("Error parsing JSON data:", error);
        }
      } else {
        console.error("No 'data' parameter found in the URL.");
      }
    }
  }, []);

  const pay = async (jsonData: any) => {
    try {
      const paymentResponse = await payment(jsonData.echoData);
      console.log("Payment request:", paymentResponse);
      if (paymentResponse.responseCode === "00") {
        setPaymentStatus("success");
      } else {
        setPaymentStatus("failure");
      }
      setTimeout(() => {
        setPaymentStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Error processing payment:", error);
      setPaymentStatus("failure");
      setTimeout(() => {
        setPaymentStatus("idle");
      }, 3000);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedToken) {
      console.log("No token selected");
      return;
    }
    try {
      const orderResponse = await createOrder(amount);
      console.log("Order created:", orderResponse);
      const authResponse = await initiateAuthenticateToken(
        selectedToken,
        orderResponse.orderId
      );
      if (orderResponse.responseCode === "00") {
        const authInitiationUrl = authResponse.peripheryData?.initiationUrl;
        window.location.href = authInitiationUrl;
      } else {
        console.log("Order failed:", orderResponse.responseMessage);
        setPaymentStatus("failure");
        setTimeout(() => {
          setPaymentStatus("idle");
        }, 3000);
      }
    } catch (error) {
      console.error("Error processing order:", error);
      setPaymentStatus("failure");
      setTimeout(() => {
        setPaymentStatus("idle");
      }, 3000);
    }
  };

  const cycleInterval = 4000;
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveText((prevActive) => (prevActive + 1) % circleTexts.length);
    }, cycleInterval);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveImage((prevActive) => (prevActive + 1) % circleImages.length);
    }, cycleInterval);

    return () => clearInterval(intervalId);
  }, []);

  const renderContent = () => {
    switch (paymentStatus) {
      case "success":
        return (
          <div className="flex flex-col items-center">
            <Lottie
              animationData={successAnimation}
              style={{ width: 200, height: 200 }}
            />
            <p className="text-xl font-semibold text-green-600">
              Payment Successful!
            </p>
          </div>
        );
      case "failure":
        return (
          <div className="flex flex-col items-center">
            <Lottie
              animationData={failureAnimation}
              style={{ width: 200, height: 200 }}
            />
            <p className="text-xl font-semibold text-red-600">Payment Failed</p>
          </div>
        );
      default:
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="amount"
                className="block text-md font-paragraph text-black mb-1 text-left"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label
                htmlFor="token"
                className="block text-md font-paragraph text-black mb-1 text-left"
              >
                My Cards
              </label>
              <select
                id="token"
                value={selectedToken || ""}
                onChange={(e) => {
                  setSelectedToken(e.target.value);
                  setSelectedTokenState(e.target.value);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select a card</option>
                {tokens?.map((token, index) => (
                  <option key={index} value={token.token}>
                    {token.paymentInstrumentAssociationName} -{" "}
                    {token.truncatedPaymentInstrument}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-xl font-paragraph text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Secure Payment
            </button>
          </form>
        );
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex">
        <div className="w-1/3 bg-blue-400 p-8 flex-col justify-between hidden lg:block">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4 text-left font-header">
              Your voucher, your way!
            </h2>
            <p className="text-white text-left font-paragraph mb-8">
              Load your Health Vault and start your journey to simpler
              healthcare.
            </p>
          </div>
          <div className="mt-auto">
            <div className="w-full h-64 rounded-lg flex items-center justify-center">
              <img
                src={circleImages[activeImage]}
                alt={`Slide ${activeImage + 1}`}
                className="object-cover w-full h-full rounded-lg transition-opacity duration-500 ease-in-out"
              />
            </div>
            <div className="flex space-x-2 mt-[2.2rem]">
              {[0, 1, 2]?.map((index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-500 ease-in-out ${
                    activeImage === index ? "bg-orange-400" : "bg-white"
                  }`}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/3 bg-white">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-orange-400 rounded-full mr-3"></div>
              <h1 className="text-2xl font-header text-gray-800 ">SettlPay</h1>
            </div>
            <h2 className="text-2xl lg:text-4xl font-header text-gray-800 mb-6">
              Let's Settl it!
            </h2>
            {renderContent()}
          </div>
          <div className="bg-gray-300 p-[2.2rem]">
            <div className="text-2xl lg:text-3xl font-semibold font-header text-black mb-4 text-left transition-opacity duration-500 ease-in-out">
              {circleTexts[activeText]}
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-2">
                {[0, 1, 2]?.map((index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-500 ease-in-out ${
                      activeText === index ? "bg-orange-400" : "bg-white"
                    }`}
                    onClick={() => setActiveText(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Load;
