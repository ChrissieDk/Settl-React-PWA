import React, { useState } from "react";
import { acceptOTP } from "../../Services/data.service";
import Lottie from "lottie-react";
import successAnimation from "../../successAnimation.json";
import failureAnimation from "../../failureAnimation.json";

interface OTPRedemptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchantId: string;
}

const OTPRedemptionModal: React.FC<OTPRedemptionModalProps> = ({
  isOpen,
  onClose,
  merchantId,
}) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [redeemStatus, setRedeemStatus] = useState<"idle" | "success" | "failure">("idle");

  const handleConfirm = async () => {
    if (otp.length !== 4) {
      alert("Please enter a valid 4-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await acceptOTP(otp, merchantId);
      setRedeemStatus("success");
      console.log("OTP Redemption Response:", response);
      setTimeout(() => {
        onClose();
        setRedeemStatus("idle"); // Reset status after closing
      }, 2000); // Close modal after 2 seconds
    } catch (error) {
      setRedeemStatus("failure");
      console.error("OTP Redemption Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {redeemStatus === "idle" ? (
          <>
            {/* Modal Header */}
            <div className="border-b pb-3 mb-4">
              <h2 className="text-xl font-semibold">Redeem OTP</h2>
              <p className="text-sm text-gray-500 mt-1">
                Enter the OTP provided by the customer
              </p>
            </div>

            {/* OTP Input */}
            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                OTP Code
              </label>
              <input
                type="text"
                id="otp"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter 4-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={4}
                disabled={loading}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 text-white rounded-md transition-colors ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                onClick={handleConfirm}
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <Lottie
              animationData={redeemStatus === "success" ? successAnimation : failureAnimation}
              style={{ width: 200, height: 200 }}
            />
            <p className="text-xl font-semibold mt-4">
              {redeemStatus === "success"
                ? "OTP Redeemed Successfully!"
                : "Failed to Redeem OTP"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OTPRedemptionModal;