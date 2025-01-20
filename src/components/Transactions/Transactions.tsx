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
      className={`inline-flex items-center justify-center font-semibold rounded-full text-xs py-1 ${statusClasses}`}
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
        console.log("Transactions fetched:", response);
        updateTransactions(response);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();

    // Optional: Add a cleanup function if needed
    return () => {
      console.log("Cleaning up transactions fetch");
    };
  }, [selectedTab]); // Only depend on selectedTab

  return (
    <div>
      <div className="flex justify-between text-left lg:items-center mt-4 flex-col lg:flex-row">
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search transactions"
          />
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
      <div className="mt-4 bg-white shadow-lg rounded-lg p-4">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8 flex items-center justify-center h-64">
            <p className="text-gray-500 text-lg">No transactions found</p>
          </div>
        ) : (
          <div className="overflow-y-auto max-h-96">
            <table className="min-w-full leading-normal">
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
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-5 cursor-pointer"
                      onClick={() =>
                        requestSort(header.toLowerCase().replace(/ /g, ""))
                      }
                    >
                      <div className="flex items-center">
                        {header}
                        {sortConfig?.key ===
                          header.toLowerCase().replace(/ /g, "") &&
                          (sortConfig.direction === "ascending" ? (
                            <FaArrowDown className="ml-2" />
                          ) : (
                            <FaArrowUp className="ml-2" />
                          ))}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentData.map((transaction) => (
                  <tr key={transaction.transactionId}>
                    <td
                      className="px-5 py-3 border-b border-gray-200 text-sm text-left cursor-help"
                      title={transaction.id}
                    >
                      {truncateId(transaction.id)}
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                      {formatDate(transaction.transactionDate)}
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                      {formatTime(transaction.transactionDate)}
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                      {transaction.transactionType}
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                      {transaction.amount}
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                      {transaction.balance ?? "-"}
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                      {transaction.service}
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                      <StatusPill status={transaction.status} />
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm text-center">
                      ZAR
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                      {transaction.voucherCode || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {filteredTransactions.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
            <nav
              className="flex items-center justify-center"
              aria-label="Pagination"
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mr-2 px-2 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
                aria-label="Previous page"
              >
                <FaChevronLeft className="h-4 w-4" />
              </button>
              {getPageNumbers.map((number, index) => (
                <button
                  key={number === "..." ? `ellipsis-${index}` : number}
                  onClick={() =>
                    typeof number === "number" && handlePageChange(number)
                  }
                  className={`mx-1 px-3 py-1 rounded-md ${
                    number === currentPage
                      ? "bg-orange-400 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  aria-label={`Go to page ${number}`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-2 px-2 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
                aria-label="Next page"
              >
                <FaChevronRight className="h-4 w-4" />
              </button>
            </nav>
            <div className="mt-4 sm:mt-0">
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="ml-2 rounded px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Items per page"
              >
                {[5, 10, 15, 20, 50, 100, 150].map((value) => (
                  <option key={value} value={value}>
                    {value} per page
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsTab;
