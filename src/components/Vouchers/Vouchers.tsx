import React, { useState, useEffect } from "react";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { getVouchers } from "../../Services/data.service";
import { Voucher } from "../../types/Types";

const Vouchers: React.FC = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

    fetchVouchers();
  }, []);

  if (loading)
    return <div className="text-center py-4">Loading vouchers...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">{error}</div>;
  if (vouchers.length === 0)
    return <div className="text-center py-4">No vouchers found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl lg:text-4xl text-left font-header text-blue-500 mb-4">
        Your Vouchers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vouchers.map((voucher, index) => (
          <div
            key={voucher.voucherCode}
            className="bg-orange-400 opacity-90 text-white rounded-lg p-4 flex flex-col shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-[-20px] right-0">
              <div className="relative">
                <div className="w-40 h-40 bg-orange-600 rounded-full absolute right-[-1.5rem] opacity-15"></div>
                <div className="w-32 h-32 bg-orange-600 rounded-full absolute right-10 top-2 opacity-25"></div>
              </div>
            </div>
            <div className="relative flex justify-between items-center mb-4">
              <div className="w-[3.5rem] h-[3.5rem] bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
              </div>
              <div
                className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer"
                data-tooltip-id={`tooltip-${index}`}
                data-tooltip-content={`Expiry: ${new Date(
                  voucher.expiryDate
                ).toLocaleDateString()}`}
              >
                <MdInfoOutline className="cursor-pointer text-xl" />
              </div>
              <Tooltip
                id={`tooltip-${index}`}
                place="top"
                opacity={1}
                style={{
                  backgroundColor: "white",
                  color: "#222",
                  fontFamily: "Montserrat, sans-serif",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  padding: "8px 12px",
                  zIndex: 9999,
                }}
              />
            </div>
            <p className="text-3xl text-left font-header text-white">
              R{voucher.amount / 100}
            </p>
            <p className="text-sm font-medium text-left text-white opacity-75">
              {voucher.balance}
            </p>
            <div className="flex flex-row">
              <p className="text-md font-paragraph text-left text-white mt-2 mr-2">
                Code: {voucher.voucherCode}
              </p>
              <p className="text-md font-paragraph text-left text-white  mt-2">
                Code: {voucher.verificationCode}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vouchers;
