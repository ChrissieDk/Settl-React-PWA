import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaArrowDown,
  FaChevronLeft,
  FaChevronRight,
  FaArrowUp,
} from "react-icons/fa6";
import { getTransactions } from "../../Services/data.service";
import { tableTransactions } from "../../types/Types";
import RedeemModal from "../RedeemModal/RedeemModal";
import { FaSearch } from "react-icons/fa";

interface TransactionsTabProps {
  transactions: tableTransactions[];
  tokens: any[];
  openModal: (action: string) => void;
  closeModal: () => void;
  handleTimePeriodChange: (period: string) => void;
  selectedTimePeriod: string;
  selectedTab: string;
  updateTransactions: (transactions: tableTransactions[]) => void;
}

const StatusPill = React.memo(({ status }: { status: string }) => {
  const statusClasses = useMemo(() => {
    switch (status) {
      case "add":
        return "bg-green-300 text-green-800 min-w-[5rem] uppercase";
      case "Pending":
        return "bg-yellow-300 text-yellow-800 min-w-[5rem] uppercase";
      case "Failed":
        return "bg-red-300 text-red-800 min-w-[5rem] uppercase";
      case "Redeemed":
        return "bg-orange-300 text-red-800 min-w-[5rem] uppercase";
      default:
        return "bg-gray-100 text-gray-800 min-w-[5rem] uppercase";
    }
  }, [status]);

  return (
    <span
      className={`inline-flex items-center justify-center font-semibold rounded-full text-xs py-1 px-3 ${statusClasses}`}
    >
      {status}
    </span>
  );
});

const truncateId = (id: string) => `${id.slice(0, 10)}...`;

const TransactionsTab: React.FC<TransactionsTabProps> = ({
  transactions,
  tokens,
  handleTimePeriodChange,
  selectedTimePeriod,
  selectedTab,
  updateTransactions,
}) => {
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sortedTransactions = useMemo(() => {
    let sortableTransactions = [...transactions];
    if (sortConfig) {
      sortableTransactions.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return sortableTransactions;
  }, [transactions, sortConfig]);

  const filteredTransactions = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return sortedTransactions.filter((transaction) =>
      Object.values(transaction).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(searchLower)
      )
    );
  }, [sortedTransactions, searchTerm]);

  const requestSort = (key: string) => {
    const direction =
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";
    setSortConfig({ key, direction });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openRedeemModal = useCallback((action: string) => {
    setSelectedAction(action);
    setTokenModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setTokenModalOpen(false);
    setSelectedAction("");
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const getPageNumbers = useMemo(() => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(1);
      if (currentPage <= 3) {
        pageNumbers.push(2, 3, "...");
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push("...", totalPages - 2, totalPages - 1);
      } else {
        pageNumbers.push("...", currentPage, "...");
      }
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  }, [currentPage, totalPages]);

  // Fetch transactions only when the selectedTab changes to "transactions"
  useEffect(() => {
    if (selectedTab !== "transactions") return; // Only run for the transactions tab

    const fetchTransactions = async () => {
      try {
        const response = await getTransactions();
        updateTransactions(response);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();

    // Optional: Add a cleanup function if needed
    // return () => {
    //   console.log("Cleaning up transactions fetch");
    // };
  }, [selectedTab, updateTransactions]); // Added updateTransactions dependency

  return (
    <div>
      <div className="flex justify-between text-left lg:items-center mt-4 flex-col lg:flex-row">
        <div className="mt-4 w-full lg:w-64">
          <div className="relative">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors"
              aria-label="Search transactions"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      {tokenModalOpen && (
        <RedeemModal
          action={selectedAction}
          isOpen={tokenModalOpen}
          onClose={closeModal}
          vouchers={tokens}
        />
      )}

      <div className="mt-4 bg-white shadow-lg rounded-lg overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12 flex flex-col items-center justify-center h-64 bg-gray-50">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            <p className="text-gray-500 text-lg font-medium">
              No transactions found
            </p>
            <p className="text-gray-400 mt-1">
              Try adjusting your search criteria
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="overflow-y-auto max-h-96">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    {[
                      "Transaction ID",
                      "Date",
                      "Time",
                      "Type",
                      "Amount",
                      "Balance",
                      "Service",
                      "Status",
                      "Currency",
                      "Voucher Code",
                    ].map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-50 shadow-sm z-10 cursor-pointer transition-colors hover:bg-gray-100"
                        onClick={() =>
                          requestSort(header.toLowerCase().replace(/ /g, ""))
                        }
                      >
                        <div className="flex items-center">
                          {header}
                          {sortConfig?.key ===
                            header.toLowerCase().replace(/ /g, "") &&
                            (sortConfig.direction === "ascending" ? (
                              <FaArrowDown className="ml-2 text-orange-500" />
                            ) : (
                              <FaArrowUp className="ml-2 text-orange-500" />
                            ))}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentData.map((transaction, index) => (
                    <tr
                      key={transaction.transactionId}
                      className={`transition-colors ${
                        index % 2 === 0
                          ? "bg-white hover:bg-gray-50"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <td
                        className="px-5 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-help"
                        title={transaction.id}
                      >
                        {truncateId(transaction.id)}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">
                        {formatDate(transaction.transactionDate)}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">
                        {formatTime(transaction.transactionDate)}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">
                        {transaction.transactionType}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm font-medium">
                        <span
                          className={
                            Number(transaction.amount) > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {Number(transaction.amount) > 0 ? "+" : ""}
                          {(transaction.amount / 100).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">
                        {transaction.balance
                          ? (transaction.balance / 100).toFixed(2)
                          : "-"}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">
                        {transaction.service}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <StatusPill status={transaction.status} />
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                        ZAR
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">
                        {transaction.voucherCode || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination - Improved styling */}
        {filteredTransactions.length > 0 && (
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium mx-1">{indexOfFirstItem + 1}</span>{" "}
                to{" "}
                <span className="font-medium mx-1">
                  {Math.min(indexOfLastItem, filteredTransactions.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium mx-1">
                  {filteredTransactions.length}
                </span>{" "}
                results
              </div>

              <div className="mt-3 sm:mt-0 flex items-center">
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px mr-4"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <FaChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>

                  {getPageNumbers.map((number, index) => (
                    <button
                      key={number === "..." ? `ellipsis-${index}` : number}
                      onClick={() =>
                        typeof number === "number" && handlePageChange(number)
                      }
                      disabled={number === "..."}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        number === currentPage
                          ? "z-10 bg-orange-400 border-orange-500 text-white"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      } ${number === "..." ? "cursor-default" : ""}`}
                    >
                      {number}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <FaChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </nav>

                <div className="flex items-center">
                  <label
                    htmlFor="itemsPerPage"
                    className="text-sm text-gray-700 mr-2"
                  >
                    Show:
                  </label>
                  <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="rounded border border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500 py-1"
                  >
                    {[5, 10, 15, 20, 50, 100, 150].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsTab;
