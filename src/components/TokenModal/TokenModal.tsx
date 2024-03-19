import React, { useState } from "react";
import { MdClose } from "react-icons/md";

interface TokenModalProps {
  action: string;
  isOpen: boolean;
  onClose: () => void;
}

const TokenModal: React.FC<TokenModalProps> = ({ action, isOpen, onClose }) => {
  const [selectedService, setSelectedService] = useState("gp"); // Initial service selection (for generate action)
  const [recipientId, setRecipientId] = useState(""); // State for the recipient ID (for send and request actions)
  const [amount, setAmount] = useState(""); // State for the allocation amount

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(e.target.value);
  };

  const handleRecipientIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientId(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    switch (action) {
      case "generate":
        generateToken(selectedService); // Pass the selected service
        break;
      case "send":
        sendToken(recipientId, amount); // Pass recipient ID and amount
        break;
      case "request":
        requestToken(recipientId, amount); // Pass recipient ID and amount
        break;
      default:
        break;
    }
  };

  // Implement your token generation, sending, and requesting logic here,
  // using selectedService (for generate) and recipientId, amount (for send and request)
  const generateToken = (selectedService: string) => {
    console.log("Generating token for", selectedService, "...");
  };

  const sendToken = (recipientId: string, amount: string) => {
    console.log("Sending token to", recipientId, "for", amount, "Rands...");
  };

  const requestToken = (recipientId: string, amount: string) => {
    console.log(
      "Requesting token from",
      recipientId,
      "for",
      amount,
      "Rands..."
    );
  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed z-20 inset-0 overflow-y-auto`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="relative bg-white rounded-lg w-96 p-8">
          <button onClick={onClose} className="absolute top-4 right-4">
            <MdClose />
          </button>
          <h2 className="text-2xl font-bold mb-4">
            {action === "generate"
              ? "Generate Token"
              : action === "send"
              ? "Send Token"
              : "Request Token"}
          </h2>
          <form>
            {action === "generate" ? (
              <div className="mb-4">
                <label
                  htmlFor="service"
                  className="block text-sm font-semibold mb-2"
                >
                  Service
                </label>
                <select
                  id="service"
                  value={selectedService}
                  onChange={handleServiceChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="gp">GP</option>
                  <option value="dentist">Dentist</option>
                  <option value="optometrist">Optometrist</option>
                  <option value="pharmacy">Pharmacy</option>
                </select>
              </div>
            ) : null}
            {action === "send" || action === "request" ? (
              <div className="mb-4">
                <label
                  htmlFor="recipientId"
                  className="block text-sm font-semibold mb-2"
                >
                  {action === "send" ? "Recipient ID" : "Sender ID"}
                </label>
                <input
                  id="recipientId"
                  type="text" // Adjust type as needed (e.g., number)
                  value={recipientId}
                  onChange={handleRecipientIdChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
            ) : null}
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-sm font-semibold mb-2"
              >
                Allocation Amount (ZAR)
              </label>
              <div className="flex">
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white rounded-md p-2 w-full"
            >
              {action === "generate"
                ? "Generate Token"
                : action === "send"
                ? "Send Token"
                : "Request Token"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TokenModal;
