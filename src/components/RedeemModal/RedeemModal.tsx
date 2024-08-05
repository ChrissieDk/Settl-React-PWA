import React, { useState, useEffect } from "react";
import { MdClose, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { redeem, getVouchers } from "../../Services/data.service";
import { TokenModalProps, Voucher } from "../../types/Types";
import Lottie from "lottie-react";
import successAnimation from "../../successAnimation.json";
import failureAnimation from "../../failureAnimation.json";

const RedeemModal: React.FC<TokenModalProps> = ({ isOpen, onClose }) => {
  const [merchantId, setMerchantId] = useState("TBUY64665380465");
  const [service, setService] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [redeemStatus, setRedeemStatus] = useState<
    "idle" | "success" | "failure"
  >("idle");

  // Sample data for dropdowns
  const merchantIds = ["TBUY64665380465"];
  const services = ["GP", "Dentist", "Optometrist", "OTC"];

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await getVouchers();
        setVouchers(response);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching vouchers:", err);
        setError("Error fetching vouchers. Please try again later.");
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchVouchers();
    }
  }, [isOpen]);

  const handleMerchantIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMerchantId(e.target.value);
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setService(e.target.value);
  };

  const handleTransactionAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTransactionAmount(e.target.value);
  };

  const handleVoucherCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVoucher = vouchers.find(
      (v) => v.voucherCode === e.target.value
    );
    setVoucherCode(selectedVoucher?.voucherCode || "");
    setVerificationCode(selectedVoucher?.verificationCode || "");
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
      if (response.responseCode === "00") {
        setRedeemStatus("success");
      } else {
        setRedeemStatus("failure");
      }
      // Don't close the modal immediately to show the animation
      setTimeout(() => {
        onClose();
        setRedeemStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Error redeeming voucher:", error);
      setRedeemStatus("failure");
      setTimeout(() => {
        setRedeemStatus("idle");
      }, 3000);
    }
  };

  const renderContent = () => {
    switch (redeemStatus) {
      case "success":
        return (
          <div className="flex flex-col items-center">
            <Lottie
              animationData={successAnimation}
              style={{ width: 200, height: 200 }}
            />
            <p className="text-xl font-semibold text-green-600">
              Redemption Successful!
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
            <p className="text-xl font-semibold text-red-600">
              Redemption Failed
            </p>
          </div>
        );
      default:
        return (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="merchantId"
                className="block text-sm font-semibold mb-2 text-gray-700"
              >
                Merchant ID
              </label>
              <select
                id="merchantId"
                value={merchantId}
                onChange={handleMerchantIdChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                required
              >
                {merchantIds.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="service"
                className="block text-sm font-semibold mb-2 text-gray-700"
              >
                Service
              </label>
              <select
                id="service"
                value={service}
                onChange={handleServiceChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                required
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
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
              <select
                id="voucherCode"
                value={voucherCode}
                onChange={handleVoucherCodeChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                required
              >
                <option value="">Select a voucher code</option>
                {vouchers.map((voucher: Voucher) => (
                  <option key={voucher.voucherCode} value={voucher.voucherCode}>
                    {voucher.voucherCode}
                  </option>
                ))}
              </select>
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
                readOnly
                className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
                placeholder="Verification code will be auto-filled"
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
        );
    }
  };

  if (!isOpen) return null;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedeemModal;
