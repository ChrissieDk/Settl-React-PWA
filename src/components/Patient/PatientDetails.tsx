import React, { useState, useEffect } from "react";
import { fetchMerchantTransactions } from "../../Services/data.service";

// Interface for User data
interface User {
  id: string;
  emailAddress: string;
  username: string;
  lastTransactionDate: string;
  amount: number;
}

interface Transaction {
  id: string;
  userId?: string;
  amount: number;
  transactionDate: string;
  service?: string;
  status?: string;
  balance?: number;
  transactionType?: string;
  voucherCode?: string;
  description?: string;
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
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch transactions when patient changes
  useEffect(() => {
    const loadTransactions = async () => {
      if (!patient) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchMerchantTransactions(patient.id);

        setTransactions(data);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
        setError("Failed to load transactions. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && patient) {
      loadTransactions();
    }
  }, [patient, isOpen]);

  if (!isOpen || !patient) return null;

  // Format currency with proper spacing
  const formatCurrency = (amount: number): string => {
    return `R ${amount.toFixed(2)}`;
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

  // Format the transaction date
  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return "N/A";

    try {
      // Try to parse the date
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.warn(`Invalid date format: ${dateString}`);
        return "N/A";
      }

      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (err) {
      console.error(`Error formatting date: ${dateString}`, err);
      return "N/A";
    }
  };

  const { name, surname } = extractDisplayName(patient.username);

  // Calculate total transaction amount
  const getTotalAmount = (): number => {
    return transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
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
                  <div>
                    <p className="text-xs text-gray-500 mb-1">User ID</p>
                    <p className="font-medium text-gray-800 truncate">
                      {patient.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Last Activity</p>
                    <p className="font-medium text-gray-800">
                      {formatDate(patient.lastTransactionDate)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Transaction Summary
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Payments</p>
                    <p className="font-medium text-gray-800">
                      {transactions.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                    <p className="font-medium text-blue-600">
                      {formatCurrency(
                        transactions.reduce(
                          (sum, t) => sum + Math.abs(t.amount / 100),
                          0
                        )
                      )}
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
                  Payment History
                </h3>
                <p className="text-sm text-gray-500">
                  {transactions.length} transactions found
                </p>
              </div>

              <div className="overflow-y-auto max-h-full">
                {isLoading && (
                  <div className="p-8 text-center">
                    <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-100">
                      <svg
                        className="animate-spin h-8 w-8 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                    <p className="text-gray-500 font-medium">
                      Loading transactions...
                    </p>
                  </div>
                )}

                {error && (
                  <div className="p-8 text-center">
                    <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-red-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 font-medium">{error}</p>
                    <button
                      onClick={() => fetchMerchantTransactions(patient.id)}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {!isLoading && !error && transactions.length > 0 && (
                  <div>
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="px-5 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                              {transaction.transactionType || "Payment"}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {formatDate(transaction.transactionDate)}
                          </span>
                        </div>

                        <div className="flex justify-between items-end">
                          <p className="text-lg font-semibold text-gray-800">
                            {formatCurrency(Math.abs(transaction.amount / 100))}
                          </p>
                          <div className="text-right">
                            {transaction.service && (
                              <p className="text-sm text-gray-500">
                                {transaction.service}
                              </p>
                            )}
                            {transaction.voucherCode && (
                              <p className="text-xs text-gray-400">
                                Voucher: {transaction.voucherCode}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!isLoading && !error && transactions.length === 0 && (
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
