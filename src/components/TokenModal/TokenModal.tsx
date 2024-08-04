import React, { useState } from "react";
import { MdClose, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { TokenModalProps } from "../../types/Types";
import { redeem } from "../../Services/data.service";

const TokenModal: React.FC<TokenModalProps> = ({ isOpen, onClose }) => {
  const [merchantId, setMerchantId] = useState("");
  const [service, setService] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const handleMerchantIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMerchantId(e.target.value);
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setService(e.target.value);
  };

  const handleTransactionAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTransactionAmount(e.target.value);
  };

  const handleVoucherCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoucherCode(e.target.value);
  };

  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      MerchantId: merchantId,
      Service: service,
      transactionAmount: parseInt(transactionAmount, 10),
      vouchers: [
        {
          voucherCode: voucherCode,
          verificationCode: verificationCode,
        },
      ],
    };

    try {
      const response = await redeem(payload);
      console.log("Redeem response:", response);
      // Handle success (e.g., show a success message, close the modal, etc.)
    } catch (error) {
      console.error("Error redeeming voucher:", error);
      // Handle error (e.g., show an error message)
    } finally {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="p-2 fixed inset-0 bg-gray-600 bg-opacity-70 overflow-y-auto h-full w-full z-10 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <MdClose size={24} />
        </button>

        {/* Left section */}
        <div className="w-1/3 bg-blue-400 p-8 flex-col justify-between hidden lg:flex">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4 text-left font-header">
              Redeem Token
            </h2>
            <p className="text-white text-left font-paragraph mb-4">
              Redeem your token quickly and securely.
            </p>
            <h2 className="text-xl text-white text-left font-header mb-2">
              Need help?{" "}
              <span className="text-orange-400 font-bold">We're here!</span>
            </h2>
            <p className="text-white text-left font-paragraph mb-8">
              If you have any questions about redeeming your token, please
              contact our support team.
            </p>
          </div>
        </div>

        {/* Right section with the form */}
        <div className="w-full lg:w-2/3 bg-white">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 bg-orange-400 rounded-full mr-3"></div>
                <h1 className="text-2xl font-header text-gray-800">
                  Redeem Token
                </h1>
                <MdInfoOutline
                  className="text-blue-500 cursor-pointer ml-2"
                  id="token-info"
                />
                <ReactTooltip
                  anchorId="token-info"
                  place="right"
                  opacity={1}
                  content="Redeem your token by entering the merchant details, service, and voucher details."
                  style={{
                    backgroundColor: "white",
                    color: "#222",
                    fontFamily: "Montserrat, sans-serif",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                    padding: "8px 12px",
                    maxWidth: "350px",
                    width: "auto",
                    zIndex: 9999,
                  }}
                />
              </div>
            </div>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto text-left">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="merchantId"
                    className="block text-sm font-semibold mb-2 text-gray-700"
                  >
                    Merchant ID
                  </label>
                  <input
                    id="merchantId"
                    type="text"
                    value={merchantId}
                    onChange={handleMerchantIdChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    placeholder="Enter merchant ID"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="service"
                    className="block text-sm font-semibold mb-2 text-gray-700"
                  >
                    Service
                  </label>
                  <input
                    id="service"
                    type="text"
                    value={service}
                    onChange={handleServiceChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    placeholder="Enter service name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="transactionAmount"
                    className="block text-sm font-semibold mb-2 text-gray-700"
                  >
                    Transaction Amount
                  </label>
                  <input
                    id="transactionAmount"
                    type="number"
                    value={transactionAmount}
                    onChange={handleTransactionAmountChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    placeholder="Enter transaction amount"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="voucherCode"
                    className="block text-sm font-semibold mb-2 text-gray-700"
                  >
                    Voucher Code
                  </label>
                  <input
                    id="voucherCode"
                    type="text"
                    value={voucherCode}
                    onChange={handleVoucherCodeChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    placeholder="Enter your voucher code"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="verificationCode"
                    className="block text-sm font-semibold mb-2 text-gray-700"
                  >
                    Verification Code (OTP)
                  </label>
                  <input
                    id="verificationCode"
                    type="text"
                    value={verificationCode}
                    onChange={handleVerificationCodeChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    placeholder="Enter your verification code (OTP)"
                    required
                  />
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-xl font-paragraph text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Redeem Token
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenModal;
