import React from "react";
import { useState } from "react";

// Updated interface to match your API data structure
interface User {
  id: string;
  emailAddress: string;
  username: string;
  lastTransactionDate: string;
  amount: number;
}

interface PatientDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: User | null;
}

const PatientDetail: React.FC<PatientDetailModalProps> = ({
  isOpen,
  onClose,
  patient,
}) => {
  type TabType = "transactions" | "info";
  const [activeTab, setActiveTab] = useState<TabType>("transactions");

  if (!isOpen || !patient) return null;

  // Format currency with proper spacing
  const formatCurrency = (amount: number): string => {
    return `R ${Math.abs(amount).toFixed(2)}`;
  };

  // Extract username (and potentially firstname/lastname)
  const extractDisplayName = (
    username: string
  ): { name: string; surname: string } => {
    // Assuming username might be an email or a name
    // If it contains @, use the part before @ as the display name
    if (username.includes("@")) {
      const name = username.split("@")[0];
      // Try to split by . or _ to get first and last name
      const nameParts = name.split(/[._]/);
      if (nameParts.length > 1) {
        return {
          name: nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1),
          surname: nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1),
        };
      }
      return { name, surname: "" };
    }

    // If username contains space, split by space
    if (username.includes(" ")) {
      const [name, ...surnameParts] = username.split(" ");
      return { name, surname: surnameParts.join(" ") };
    }

    // Default case
    return { name: username, surname: "" };
  };

  const { name, surname } = extractDisplayName(patient.username);

  // Get transaction type based on amount
  const getTransactionType = (): string => {
    return patient.amount < 0 ? "Debit" : "Credit";
  };

  // Get transaction badge color based on amount
  const getTransactionBadgeColor = (): string => {
    return patient.amount < 0
      ? "bg-red-100 text-red-800"
      : "bg-green-100 text-green-800";
  };

  // Format the transaction date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-md mx-4 h-[80vh] flex flex-col shadow-2xl z-50 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-6 shrink-0">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">User Details</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close modal"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-4 flex items-center space-x-4">
            <div className="bg-white/20 rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-medium">
                {name} {surname}
              </h3>
              <p className="opacity-80 text-sm truncate">
                {patient.emailAddress}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-50 px-6 py-3 shrink-0 border-b border-gray-100">
          <div className="flex space-x-4">
            <button
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === "transactions"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("transactions")}
            >
              Transactions
            </button>
            <button
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === "info"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("info")}
            >
              Information
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-grow">
          {activeTab === "info" && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  User Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Username</p>
                    <p className="font-medium text-gray-800">
                      {patient.username}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="font-medium text-gray-800 truncate">
                      {patient.emailAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "transactions" && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden h-full">
              <div className="p-5 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">
                  Transaction History
                </h3>
                <p className="text-sm text-gray-500">
                  Last transaction: {formatDate(patient.lastTransactionDate)}
                </p>
              </div>

              <div className="overflow-y-auto max-h-full">
                {/* We only have one transaction from the API */}
                <div className="px-5 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getTransactionBadgeColor()}`}
                      >
                        {getTransactionType()}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(patient.lastTransactionDate)}
                    </span>
                  </div>

                  <div className="flex justify-between items-end">
                    <p className="text-lg font-semibold text-gray-800">
                      {formatCurrency(patient.amount)}
                    </p>
                  </div>
                </div>

                {/* Empty state message */}
                {!patient.lastTransactionDate && (
                  <div className="p-8 text-center">
                    <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500 font-medium">
                      No transaction history available
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      All billing transactions will appear here
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
