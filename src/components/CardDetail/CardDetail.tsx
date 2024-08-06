import React from "react";
import { Token } from "../../types/Types";
import { Tooltip as ReactTooltip } from "react-tooltip";

import { MdInfoOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokens: Token[];
}

const CardModal: React.FC<CardModalProps> = ({
  isOpen,
  onClose,
  tokens = [],
}) => {
  if (!isOpen) return null;

  return (
    <div className="p-2 fixed inset-0 bg-gray-600 bg-opacity-70 overflow-y-auto h-full w-full z-10 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex">
        <div className="w-1/3 bg-blue-400 p-8 flex-col justify-between hidden lg:flex">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4 text-left font-header">
              Your Cards
            </h2>
            <p className="text-white text-left font-paragraph mb-4">
              Manage your payment methods securely and easily.
            </p>
            <h2 className="text-xl text-white text-left font-header mb-2">
              Card not appearing?{" "}
              <span className="text-orange-400 font-bold">No stress!</span>
            </h2>
            <p className="text-white text-left font-paragraph mb-8">
              Card details are not stored, but rather tied to user sessions.
              This ensures that your card details are secure and private.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-2/3 bg-white">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 bg-orange-400 rounded-full mr-3"></div>
                <h1 className="text-2xl font-header text-gray-800">My Cards</h1>
                <MdInfoOutline
                  className="text-blue-500 cursor-pointer ml-2"
                  id="card-info"
                />
                <ReactTooltip
                  anchorId="card-info"
                  place="right"
                  opacity={1}
                  content="Card details are not stored, but rather tied to user sessions. This ensures that your card details are secure and private."
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
            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {tokens?.length > 0 ? (
                tokens.map((token, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold text-gray-800">
                        {token.paymentInstrumentAssociationName}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          token.paymentTokenStatus === "00"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {token.paymentTokenStatus === "00"
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-600 text-left">
                        {token.truncatedPaymentInstrument}
                      </p>
                      <p className="flex flex-row text-sm text-gray-500 text-left justify-between">
                        Expires: {token.paymentInstrumentExpiryDate}
                        <FaTrashAlt
                          className="text-red-500 hover:text-red-300"
                          id="remove-card"
                        />
                        <ReactTooltip
                          anchorId="remove-card"
                          place="left"
                          opacity={1}
                          content="Remove card"
                          style={{
                            backgroundColor: "white",
                            color: "#222",
                            fontFamily: "Montserrat, sans-serif",
                            borderRadius: "8px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                            padding: "8px 12px",
                            maxWidth: "600px",
                            width: "auto",
                            zIndex: 9999,
                          }}
                        />
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No cards found.</p>
              )}
            </div>
          </div>
          <div className="bg-gray-100 p-8">
            <button
              onClick={onClose}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-xl font-paragraph text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
