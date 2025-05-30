import React, { useState, useEffect, useCallback, useRef } from "react";
import { MdClose, MdInfoOutline, MdContentCopy } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { redeem, getVouchers, getOTP } from "../../Services/data.service";
import { TokenModalProps, Voucher } from "../../types/Types";
import Lottie from "lottie-react";
import successAnimation from "../../successAnimation.json";
import failureAnimation from "../../failureAnimation.json";

type MerchantDisplayMap = {
  [key: string]: string;
};

const RedeemModal: React.FC<TokenModalProps> = ({ isOpen, onClose }) => {
  const [merchantId, setMerchantId] = useState(
    "b2b911a2-f8df-4e0e-9168-d5dada20786f"
  );
  const merchantIds = [
    "b2b911a2-f8df-4e0e-9168-d5dada20786f",
    "de66a1f1-544d-414c-bf59-fc31d4344ccb",
    "123",
    "456",
    "789",
  ];
  const [service, setService] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [redeemStatus, setRedeemStatus] = useState<
    "idle" | "success" | "failure" | "otpGenerated"
  >("idle");
  const [generatedOTP, setGeneratedOTP] = useState(""); // New state for OTP

  // Dropdown-related states for merchants
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMerchants, setFilteredMerchants] = useState(merchantIds);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dropdown-related states for vouchers
  const [voucherSearchTerm, setVoucherSearchTerm] = useState("");
  const [filteredVouchers, setFilteredVouchers] = useState<Voucher[]>([]);
  const [isVoucherDropdownOpen, setIsVoucherDropdownOpen] = useState(false);
  const voucherDropdownRef = useRef<HTMLDivElement>(null);

  // Sample data for dropdowns
  const services = ["GP", "Dentist", "Optometrist", "OTC"];

  const merchantDisplayNames: MerchantDisplayMap = {
    "b2b911a2-f8df-4e0e-9168-d5dada20786f": "Dr. Scott Hogarth",
    "de66a1f1-544d-414c-bf59-fc31d4344ccb": "Dr. Jesse Thomas",
    "123": "Dr. Fabian Williams",
    "456": "Dr. Ryno Ellis",
    "789": "Dr. Lauren Matthee",
  };

  const getMerchantDisplayName = (id: string): string => {
    return merchantDisplayNames[id] || id;
  };

  // Fetch vouchers
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await getVouchers();
        setVouchers(response);
        setFilteredVouchers(response); // Initialize filtered vouchers
      } catch (err) {
        console.error("Error fetching vouchers:", err);
        setError("Error fetching vouchers. Please try again later.");
      }
    };

    if (isOpen) {
      fetchVouchers();
    }
  }, [isOpen]);

  // Filter merchants based on search term
  useEffect(() => {
    setFilteredMerchants(
      merchantIds.filter((merchant) =>
        merchant.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  // Filter vouchers based on search term
  useEffect(() => {
    setFilteredVouchers(
      vouchers.filter((voucher) =>
        voucher.voucherCode
          .toLowerCase()
          .includes(voucherSearchTerm.toLowerCase())
      )
    );
  }, [voucherSearchTerm, vouchers]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        voucherDropdownRef.current &&
        !voucherDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setIsVoucherDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setService(e.target.value);
  };

  const handleTransactionAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const userInput = parseFloat(e.target.value);
    if (!isNaN(userInput)) {
      const transactionAmountInCents = (userInput * 100).toFixed(0);
      setTransactionAmount(transactionAmountInCents);
    } else {
      setTransactionAmount("");
    }
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
      const response = await getOTP(payload);
      console.log("OTP response:", response);

      const otp = response;
      setGeneratedOTP(otp);
      setRedeemStatus("otpGenerated");

      // Auto-close after 7 seconds
      setTimeout(() => {
        onClose();
        setRedeemStatus("idle");
      }, 7000);
    } catch (error) {
      console.error("Error generating OTP:", error);
      setRedeemStatus("failure");
      setTimeout(() => {
        setRedeemStatus("idle");
      }, 3000);
    }
  };

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose, isOpen]);

  const handleCopyOTP = () => {
    navigator.clipboard.writeText(generatedOTP);
    alert("OTP copied to clipboard!");
  };

  // Calculate the order summary values
  const calculateOrderSummary = () => {
    if (!transactionAmount)
      return { amount: 0, settlFee: 0, transactionFee: 0, total: 0 };

    const amount = parseInt(transactionAmount, 10) / 100; // Convert cents to Rands
    const settlFee = amount * 0.075; // 7.5% Settl fee
    const transactionFee = amount * 0.025; // 2.5% Transaction fee
    const total = amount + settlFee + transactionFee;

    return {
      amount,
      settlFee,
      transactionFee,
      total,
    };
  };

  // Order summary component
  const OrderSummary = () => {
    const { amount, settlFee, transactionFee, total } = calculateOrderSummary();

    return (
      <div className="mt-6 border-t border-gray-200 pt-4">
        <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between px-2">
            <span>Voucher Amount</span>
            <span>R {amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between px-2 text-gray-600">
            <span>Settl Fee (7.5%)</span>
            <span>R {settlFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between px-2 text-gray-600">
            <span>Transaction Fee (2.5%)</span>
            <span>R {transactionFee.toFixed(2)}</span>
          </div>
          <div className="mt-2 py-2 px-2 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm flex justify-between">
            <span>Total</span>
            <span>R {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (redeemStatus) {
      case "otpGenerated":
        return (
          <div className="flex flex-col items-center">
            <Lottie
              animationData={successAnimation}
              style={{ width: 200, height: 200 }}
            />
            <p className="text-xl font-semibold text-green-600 mt-4">
              OTP Generated Successfully!
            </p>
            <div className="mt-6 text-4xl font-mono bg-gray-100 px-6 py-3 rounded-lg flex items-center gap-3">
              {generatedOTP}
              <button
                onClick={handleCopyOTP}
                className="text-gray-500 hover:text-gray-700"
              >
                <MdContentCopy size={20} />
              </button>
            </div>
          </div>
        );
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
            {/* Merchant Dropdown */}
            <div className="mb-4">
              <label
                htmlFor="merchantId"
                className="block text-sm font-semibold mb-2 text-gray-700"
              >
                Merchant (Service Provider)
              </label>
              <div className="relative" ref={dropdownRef}>
                <input
                  type="text"
                  value={getMerchantDisplayName(merchantId)}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  readOnly
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none cursor-pointer"
                  placeholder="Select a merchant"
                />
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-10">
                    <input
                      type="text"
                      placeholder="Search merchants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-2 border-b border-gray-300 rounded-t-md focus:outline-none"
                    />
                    <div className="max-h-48 overflow-y-auto">
                      {filteredMerchants.map((merchant) => (
                        <div
                          key={merchant}
                          onClick={() => {
                            setMerchantId(merchant);
                            setIsDropdownOpen(false);
                          }}
                          className="p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                        >
                          {getMerchantDisplayName(merchant)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Service Dropdown */}
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

            {/* Transaction Amount */}
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
                value={(parseFloat(transactionAmount) / 100).toString()}
                onChange={handleTransactionAmountChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Enter transaction amount"
                required
              />
            </div>

            {/* Voucher Code Dropdown */}
            <div className="mb-4">
              <label
                htmlFor="voucherCode"
                className="block text-sm font-semibold mb-2 text-gray-700"
              >
                Voucher Code
              </label>
              <div className="relative" ref={voucherDropdownRef}>
                <input
                  type="text"
                  value={voucherCode}
                  onClick={() =>
                    setIsVoucherDropdownOpen(!isVoucherDropdownOpen)
                  }
                  readOnly
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none cursor-pointer"
                  placeholder="Select a voucher code"
                />
                {isVoucherDropdownOpen && (
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-10">
                    <input
                      type="text"
                      placeholder="Search vouchers..."
                      value={voucherSearchTerm}
                      onChange={(e) => setVoucherSearchTerm(e.target.value)}
                      className="w-full p-2 border-b border-gray-300 rounded-t-md focus:outline-none"
                    />
                    <div className="max-h-48 overflow-y-auto">
                      {filteredVouchers.map((voucher) => (
                        <div
                          key={voucher.voucherCode}
                          onClick={() => {
                            setVoucherCode(voucher.voucherCode);
                            setVerificationCode(voucher.verificationCode || "");
                            setIsVoucherDropdownOpen(false);
                          }}
                          className="p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                        >
                          {voucher.voucherCode} - R {voucher.balance / 100}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Verification Code */}
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

            {/* Order Summary Section */}
            {transactionAmount && <OrderSummary />}

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-xl font-paragraph text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Generate OTP
              </button>
            </div>
          </form>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="p-2 fixed inset-0 bg-gray-600 bg-opacity-70 overflow-y-auto h-full w-full z-10 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex relative">
        {/* Close button */}
        <button
          onClick={handleClose}
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
                  content="Redeem your token by entering merchant details, transaction amount, service, and voucher details."
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
