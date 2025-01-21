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
import processingAnimation from "../../processingAnimation.json";

interface LoadProps {
  tokens: Token[];
  circleImages: string[];
  circleTexts: string[];
  setTokens: React.Dispatch<React.SetStateAction<Token[]>>;
  setSelectedToken: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedTab: (tab: string) => void; // Add this prop to handle tab navigation
}

const Load: React.FC<LoadProps> = ({
  tokens,
  circleImages,
  circleTexts,
  setSelectedToken,
  setSelectedTab, // Destructure the new prop
}) => {
  const [amountInRands, setAmountInRands] = useState<number | "">(""); // State for amount in rands (empty by default)
  const [selectedToken, setSelectedTokenState] = useState<string | null>(null);
  const [activeText, setActiveText] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [data, setData] = useState<UrlData | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "failure"
  >("idle");

  useEffect(() => {
    const url = window.location.href;
    const urlParams = new URLSearchParams(new URL(url).search);
    const base64Data = urlParams.get("data");

    if (
      base64Data &&
      localStorage.getItem("awaitingPaymentConfirmation") === "true"
    ) {
      setPaymentStatus("processing");
      localStorage.removeItem("awaitingPaymentConfirmation");

      try {
        const decodedString = atob(base64Data);
        const jsonData: UrlData = JSON.parse(decodedString);
        setData(jsonData);
        if (jsonData.responseCode === "00") {
          pay(jsonData);
        } else {
          setPaymentStatus("failure");
          setTimeout(() => setPaymentStatus("idle"), 3000);
          clearUrlParameters();
        }
      } catch (error) {
        console.error("Error parsing JSON data:", error);
        setPaymentStatus("failure");
        setTimeout(() => setPaymentStatus("idle"), 3000);
        clearUrlParameters();
      }
    }
  }, []);

  const clearUrlParameters = () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  const pay = async (jsonData: any) => {
    try {
      const paymentResponse = await payment(jsonData.echoData);
      console.log("Payment request:", paymentResponse);
      if (paymentResponse.responseCode === "00") {
        setPaymentStatus("success");
      } else {
        setPaymentStatus("failure");
      }
      setTimeout(() => setPaymentStatus("idle"), 3000);
    } catch (error) {
      console.error("Error processing payment:", error);
      setPaymentStatus("failure");
      setTimeout(() => setPaymentStatus("idle"), 3000);
    } finally {
      clearUrlParameters(); // Clear URL parameters after payment processing
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedToken || amountInRands === "") {
      console.log("No token selected or amount is empty");
      return;
    }

    // Convert amount from rands to cents
    const amountInCents = Number(amountInRands) * 100;

    try {
      const orderResponse = await createOrder(amountInCents); // Send amount in cents
      console.log("Order created:", orderResponse);
      const authResponse = await initiateAuthenticateToken(
        selectedToken,
        orderResponse.orderId
      );
      if (orderResponse.responseCode === "00") {
        // Set a flag in localStorage before redirecting
        localStorage.setItem("awaitingPaymentConfirmation", "true");
        const authInitiationUrl = authResponse.peripheryData?.initiationUrl;
        window.location.href = authInitiationUrl;
      } else {
        console.log("Order failed:", orderResponse.responseMessage);
        setPaymentStatus("failure");
        setTimeout(() => setPaymentStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Error processing order:", error);
      setPaymentStatus("failure");
      setTimeout(() => setPaymentStatus("idle"), 3000);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow empty input or valid numbers
    if (value === "") {
      setAmountInRands("");
    } else {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue) && numericValue >= 0) {
        setAmountInRands(numericValue);
      }
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
      case "processing":
        return (
          <div className="flex flex-col items-center">
            <Lottie
              animationData={processingAnimation}
              style={{ width: 200, height: 200 }}
            />
            <p className="text-xl font-semibold text-blue-600">
              Processing Payment...
            </p>
          </div>
        );
      case "success":
        return (
          <div className="flex flex-col items-center space-y-4">
            <Lottie
              animationData={successAnimation}
              style={{ width: 200, height: 200 }}
            />
            <p className="text-xl font-semibold text-green-600">
              Payment Successful!
            </p>
            <p className="text-md text-gray-600">
              Your voucher has been generated successfully.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedTab("vouchers")}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                View Vouchers
              </button>
              <button
                onClick={() => setSelectedTab("redeem")}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Redeem Voucher
              </button>
            </div>
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
                Amount (Rands)
              </label>
              <input
                type="number"
                id="amount"
                value={amountInRands}
                onChange={handleAmountChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                min="0" // Ensure the input is non-negative
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
            <div className="rounded-lg flex items-center justify-center h-64">
              <img
                src={circleImages[activeImage]}
                alt={`Slide ${activeImage + 1}`}
                className="h-full w-full object-contain rounded-lg transition-opacity duration-500 ease-in-out"
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
