import React, { useState } from "react";
import RedeemModal from "../RedeemModal/RedeemModal";
import { tableTransactions } from "../../types/Types";

interface Transaction {
  id: number;
  date: string;
  service: string;
  type: string;
  status: string;
  amount: number;
}

interface TransactionsTabProps {
  transactions: Transaction[];
  tokens: any[];
  openModal: (action: string) => void;
  closeModal: () => void;
  handleTimePeriodChange: (period: string) => void;
  selectedTimePeriod: string;
}

const StatusPill = ({ status }: { status: string }) => {
  let statusClasses;

  switch (status) {
    case "Success":
      statusClasses = "bg-green-300 text-green-800 min-w-[5rem] uppercase";
      break;
    case "Pending":
      statusClasses = "bg-yellow-300 text-yellow-800 min-w-[5rem] uppercase";
      break;
    case "Failed":
      statusClasses = "bg-red-300 text-red-800 min-w-[5rem] uppercase";
      break;
    default:
      statusClasses = "bg-gray-100 text-gray-800 min-w-[5rem] uppercase";
  }

  return (
    <span
      className={`inline-flex items-center justify-center font-semibold rounded-full text-xs py-1 ${statusClasses}`}
    >
      {status}
    </span>
  );
};

const TransactionsTab: React.FC<TransactionsTabProps> = ({
  transactions,
  tokens,
  openModal,
  closeModal,
  handleTimePeriodChange,
  selectedTimePeriod,
}) => {
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = transactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openRedeemModal = (action: string) => {
    setSelectedAction(action);
    setTokenModalOpen(true);
    openModal(action);
  };

  return (
    <div>
      <div className="flex justify-between text-left lg:items-center mt-4 flex-col lg:flex-row">
        <div>
          <button
            onClick={() => openRedeemModal("redeem")}
            className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Redeem
          </button>
        </div>
        <div className="mt-2 lg:mt-0">
          {["last7days", "last30days", "last90days"].map((period) => (
            <button
              key={period}
              className={`text-sm ${
                selectedTimePeriod === period ? "bg-orange-400" : "bg-gray-300"
              } hover:bg-orange-500 text-white font-bold py-2 px-4 rounded ${
                period !== "last7days" ? "ml-2" : ""
              }`}
              onClick={() => handleTimePeriodChange(period)}
            >
              {period === "last7days"
                ? "Last 7 days"
                : period === "last30days"
                ? "Last 30 days"
                : "Last 90 days"}
            </button>
          ))}
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
      <div className="mt-4 bg-white shadow-lg rounded-lg p-4 ">
        {transactions.length === 0 ? (
          <div className="text-center py-8 flex items-center justify-center h-64">
            <p className="text-gray-500 text-lg">No transactions yet</p>
          </div>
        ) : (
          <div className="overflow-y-auto max-h-96">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  {[
                    "Id",
                    "Date",
                    "Service",
                    "Transaction Type",
                    "Status",
                    "Amount",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-5"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentData.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                      {transaction.id}
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                      {transaction.date}
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                      {transaction.service}
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                      {transaction.type}
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                      <StatusPill status={transaction.status} />
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                      {transaction.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {transactions.length > 0 && (
        <div className="flex flex-row justify-center">
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-1 px-4 py-2 rounded border border-blue-500 ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-white border"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <div>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="ml-2 rounded px-2 py-1 mt-6 border border-blue-500 "
            >
              {[5, 10, 15, 20, 50, 100, 150].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsTab;
