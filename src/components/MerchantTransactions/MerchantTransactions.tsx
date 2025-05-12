import React, { useState, useEffect, useMemo } from "react";
import { FaSearch, FaArrowUp, FaArrowDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { fetchMerchantTransactions } from "../../Services/data.service"; // Import from your data service

// TypeScript interface for transaction data
interface Transaction {
  id: string;
  transactionId?: string;
  transactionDate: string;
  transactionType: string;
  amount: number;
  balance: number;
  service: string;
  voucherCode: string | null;
  status: string;
}

// Constants
const TABLE_HEADERS = [
  "ID", "Date", "Time", "Type", "Amount", "Balance", "Service", "Status", "Currency", "Voucher Code"
];
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// Status pill component for status display
const StatusPill = ({ status }: { status: string }) => {
  let bgColor = "bg-gray-100";
  let textColor = "text-gray-800";
  let statusText = "Unknown";

  switch (status) {
    case "00": bgColor = "bg-green-100"; textColor = "text-green-800"; statusText = "Completed"; break;
    case "01": bgColor = "bg-blue-100"; textColor = "text-blue-800"; statusText = "Pending"; break;
    case "02": bgColor = "bg-yellow-100"; textColor = "text-yellow-800"; statusText = "Processing"; break;
    case "03": bgColor = "bg-red-100"; textColor = "text-red-800"; statusText = "Failed"; break;
    default: statusText = status;
  }

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}>
      {statusText}
    </span>
  );
};

// Helper functions
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();
const formatTime = (dateString: string) => new Date(dateString).toLocaleTimeString();
const truncateId = (id: string) => id.substring(0, 8) + "...";

// Main component
const MerchantTransactionsTable = ({ userId }: { userId?: string }) => {
  // State
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>({ key: "transactiondate", direction: "descending" });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  // Fetch data effect
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const data = await fetchMerchantTransactions(userId);
        setTransactions(data.map(t => ({ ...t, transactionId: t.transactionId || t.id })));
        setError(null);
      } catch (err) {
        setError("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [userId]);

  // Search handler
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Sorting logic
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Create sorted and filtered data
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Apply search filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (transaction) =>
          transaction.id.toLowerCase().includes(lowerSearchTerm) ||
          transaction.transactionType.toLowerCase().includes(lowerSearchTerm) ||
          transaction.service.toLowerCase().includes(lowerSearchTerm) ||
          (transaction.voucherCode && transaction.voucherCode.toLowerCase().includes(lowerSearchTerm)) ||
          formatDate(transaction.transactionDate).toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Apply sorting
    if (sortConfig !== null) {
      filtered.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [transactions, searchTerm, sortConfig]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Calculate page numbers to show
  const getPageNumbers = useMemo(() => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(1);
      
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 2) endPage = 3;
      else if (currentPage >= totalPages - 1) startPage = totalPages - 2;
      
      if (startPage > 2) pageNumbers.push("...");
      for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
      if (endPage < totalPages - 1) pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  }, [currentPage, totalPages]);

  // Render Helper Components
  const renderSearchBar = () => (
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
  );

  const renderEmptyState = () => (
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
      <p className="text-gray-500 text-lg font-medium">No transactions found</p>
      <p className="text-gray-400 mt-1">Try adjusting your search criteria</p>
    </div>
  );

  const renderTableHeader = () => (
    <thead>
      <tr>
        {TABLE_HEADERS.map((header) => {
          const sortKey = header.toLowerCase().replace(/ /g, "");
          const isCurrentSortKey = sortConfig?.key === sortKey;
          const sortDirection = isCurrentSortKey ? sortConfig.direction : null;

          return (
            <th
              key={header}
              scope="col"
              className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-50 shadow-sm z-10 cursor-pointer transition-colors hover:bg-gray-100"
              onClick={() => requestSort(sortKey)}
            >
              <div className="flex items-center">
                {header}
                {isCurrentSortKey &&
                  (sortDirection === "ascending" ? (
                    <FaArrowDown className="ml-2 text-orange-500" />
                  ) : (
                    <FaArrowUp className="ml-2 text-orange-500" />
                  ))}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );

  const renderTableRow = (transaction: Transaction, index: number) => {
    const isEvenRow = index % 2 === 0;
    const rowClass = isEvenRow
      ? "bg-white hover:bg-gray-200"
      : "bg-gray-50 hover:bg-gray-200";
    const amount = Number(transaction.amount);
    const isPositiveAmount = amount > 0;
    const formattedAmount = (amount / 100).toFixed(2);
    const amountPrefix = isPositiveAmount ? "+" : "";
    const amountClass = isPositiveAmount ? "text-green-600" : "text-red-600";

    return (
      <tr
        key={transaction.transactionId || transaction.id}
        className={`transition-colors ${rowClass}`}
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
          <span className={amountClass}>
            {amountPrefix}
            {formattedAmount}
          </span>
        </td>
        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">
          {transaction.balance ? (transaction.balance / 100).toFixed(2) : "-"}
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
    );
  };

  const renderPagination = () => {
    if (filteredTransactions.length === 0) return null;

    return (
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium mx-1">{indexOfFirstItem + 1}</span> to{" "}
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
                onChange={handleItemsPerPageChange}
                className="rounded border border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500 py-1"
              >
                {PAGE_SIZE_OPTIONS.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-md">
        <div className="text-red-600 text-lg font-medium">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {renderSearchBar()}
      
      <div className="mt-4 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <div className="overflow-x-auto">
          {filteredTransactions.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              {renderTableHeader()}
              <tbody className="bg-white divide-y divide-gray-200">
                {currentTransactions.map(renderTableRow)}
              </tbody>
            </table>
          ) : (
            renderEmptyState()
          )}
        </div>
        {renderPagination()}
      </div>
    </div>
  );
};

export default MerchantTransactionsTable;