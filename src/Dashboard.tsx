import React, { useEffect, useState } from "react";
import TokenModal from "./components/TokenModal/TokenModal";
import ViewTransactions from "./ViewTransactions/ViewTransactions";
import { useNavigate } from "react-router-dom";
import { Transaction } from "./types/Types";
import HealthVault from "./components/HealthVault/HealthVault";

// icons
import { FaUserDoctor } from "react-icons/fa6";
import { FaTooth } from "react-icons/fa";
import { FaGlasses } from "react-icons/fa";
import { GiMedicinePills } from "react-icons/gi";
import { TbReportAnalytics } from "react-icons/tb";

const Dashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("transactions");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("last7days");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [tokenModalOpen, setTokenModalOpen] = useState(false);

  const navigate = useNavigate();

  const transactions: Transaction[] = [
    {
      id: 1,
      date: "2024-01-01",
      type: "Token Redeemed",
      amount: 100,
      status: "Success",
      service: "GP",
    },
    {
      id: 2,
      date: "2024-01-01",
      type: "Token Transfer",
      amount: 100,
      status: "Success",
      service: "Transfer",
    },
    {
      id: 3,
      date: "2024-01-02",
      type: "Token Generate",
      amount: 50,
      status: "Pending",
      service: "Dentistry",
    },
    {
      id: 4,
      date: "2024-01-02",
      type: "Token Generate",
      amount: 50,
      status: "Pending",
      service: "GP",
    },
    {
      id: 5,
      date: "2024-01-03",
      type: "Wallet deposit",
      amount: 200,
      status: "Success",
      service: "GP",
    },
    {
      id: 6,
      date: "2023-01-03",
      type: "Wallet deposit",
      amount: 200,
      status: "Success",
      service: "Optometry",
    },
    {
      id: 7,
      date: "2023-01-03",
      type: "Token Request",
      amount: 200,
      status: "Failed",
      service: "Optometry",
    },
    {
      id: 8,
      date: "2023-01-03",
      type: "Wallet deposit",
      amount: 200,
      status: "Success",
      service: "GP",
    },
    {
      id: 9,
      date: "2023-01-03",
      type: "Wallet deposit",
      amount: 200,
      status: "Success",
      service: "Optometry",
    },
    {
      id: 10,
      date: "2023-01-03",
      type: "Token Request",
      amount: 200,
      status: "Success",
      service: "Request",
    },
    {
      id: 11,
      date: "2021-01-01",
      type: "Token Redeemed",
      amount: 100,
      status: "Success",
      service: "Dentistry",
    },
    {
      id: 12,
      date: "2021-01-01",
      type: "Token Transfer",
      amount: 100,
      status: "Success",
      service: "Transfer",
    },
    {
      id: 13,
      date: "2021-01-02",
      type: "Token Generate",
      amount: 50,
      status: "Pending",
      service: "Optometry",
    },
    {
      id: 14,
      date: "2024-01-02",
      type: "Token Generate",
      amount: 50,
      status: "Pending",
      service: "GP",
    },
    {
      id: 15,
      date: "2024-01-03",
      type: "Wallet deposit",
      amount: 200,
      status: "Success",
      service: "Deposit",
    },
    {
      id: 16,
      date: "2024-01-03",
      type: "Wallet deposit",
      amount: 200,
      status: "Success",
      service: "Deposit",
    },
    {
      id: 17,
      date: "2024-01-03",
      type: "Token Request",
      amount: 200,
      status: "Failed",
      service: "Request",
    },
    {
      id: 18,
      date: "2024-01-03",
      type: "Wallet deposit",
      amount: 200,
      status: "Success",
      service: "Deposit",
    },
    {
      id: 19,
      date: "2024-01-03",
      type: "Wallet deposit",
      amount: 200,
      status: "Success",
      service: "Deposit",
    },
    {
      id: 20,
      date: "2024-01-03",
      type: "Token Request",
      amount: 200,
      status: "Success",
      service: "Request",
    },
  ];

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const currentData = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleTimePeriodChange = (timePeriod: string) => {
    setSelectedTimePeriod(timePeriod);
  };

  const openModal = (action: string) => {
    // Check which modal to open based on the action
    if (action === "generate" || action === "send" || action === "request") {
      setTokenModalOpen(true);
      setSelectedAction(action);
    } else {
      setIsModalOpen(true); // Open the generic modal for viewing transactions
    }
  };

  const closeModal = () => {
    setTokenModalOpen(false);
    setIsModalOpen(false); // Close the generic modal for viewing transactions
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  return (
    <div className="bg-gray-200 px-8 py-4 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg mb-6 p-4">
        <div className="flex items-center justify-between">
          <div className="flex">
            <button
              className={`text-lg font-semibold ${
                selectedTab === "healthVault"
                  ? "text-blue-600"
                  : "text-gray-600"
              } mr-6`}
              onClick={() => handleTabChange("healthVault")}
            >
              Dashboard
            </button>
            <button
              className={`text-lg font-semibold ${
                selectedTab === "transactions"
                  ? "text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabChange("transactions")}
            >
              Transactions
            </button>
          </div>
          <button className="bg-blue-500 text-white rounded-lg px-4 py-2">
            Load
          </button>
        </div>
      </div>

      {selectedTab === "healthVault" && (
        <HealthVault
          balance="2000,00"
          percentage={65}
          totalValue="10000,00"
          description="Health Vault"
          expenses={[
            {
              category: "GP",
              amount: "2000,00",
              icon: <FaUserDoctor size={30} />,
              description: "General practitioner voucher value",
            },
            {
              category: "Dentist",
              amount: "2500,00",
              icon: <FaTooth size={30} />,
              description: "Dentist voucher value",
            },
            {
              category: "Optometrist",
              amount: "2000,00",
              icon: <FaGlasses size={30} />,
              description: "Optometrist voucher value",
            },
            {
              category: "OTC",
              amount: "1500,00",
              icon: <GiMedicinePills size={30} />,
              description: "OTC voucher value",
            },
            {
              category: "Transaction summary",
              amount: "",
              icon: <TbReportAnalytics size={30} />,
              description: "Detailed description of past transactions",
            },
          ]}
        />
      )}

      {selectedTab === "transactions" && (
        <div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <button
                onClick={() => openModal("generate")}
                className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Generate
              </button>
              <button
                className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={() => openModal("send")}
              >
                Send
              </button>
              <button
                className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={() => openModal("request")}
              >
                Request
              </button>
            </div>
            <div>
              <button
                className={`text-sm ${
                  selectedTimePeriod === "last7days"
                    ? "bg-orange-400"
                    : "bg-gray-300"
                } hover:bg-orange-500 text-white font-bold py-2 px-4 rounded`}
                onClick={() => handleTimePeriodChange("last7days")}
              >
                Last 7 days
              </button>
              <button
                className={`text-sm ${
                  selectedTimePeriod === "last30days"
                    ? "bg-orange-400"
                    : "bg-gray-300"
                } hover:bg-orange-500 text-white font-bold py-2 px-4 rounded ml-2`}
                onClick={() => handleTimePeriodChange("last30days")}
              >
                Last 30 days
              </button>
              <button
                className={`text-sm ${
                  selectedTimePeriod === "last90days"
                    ? "bg-orange-400"
                    : "bg-gray-300"
                } hover:bg-orange-500 text-white font-bold py-2 px-4 rounded ml-2`}
                onClick={() => handleTimePeriodChange("last90days")}
              >
                Last 90 days
              </button>
            </div>
          </div>
          {tokenModalOpen && (
            <TokenModal
              action={selectedAction}
              isOpen={tokenModalOpen}
              onClose={closeModal}
            />
          )}
          <div className="mt-4 bg-white shadow-lg rounded-lg p-4">
            <div className="overflow-y-auto max-h-96">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10">
                      Id
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10">
                      Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10">
                      Service
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10">
                      Transaction Type
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10">
                      Amount
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10">
                      Action
                    </th>
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
                      <td className="px-5 py-3 border-b border-gray-200 text-sm">
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="px-4 py-2 text-blue-500  hover:text-blue-900"
                        >
                          View Transactions
                        </button>
                        {isModalOpen && (
                          <ViewTransactions
                            isOpen={isModalOpen}
                            transactions={transactions}
                            onClose={closeModal}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Pagination + ItemsPerPage */}
          <div className="flex flex-row justify-center">
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
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
                )
              )}
            </div>
            <div>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="ml-2 rounded px-2 py-1 mt-6 border border-blue-500 "
              >
                {/* TODO: Make more dynamic  */}
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="150">150</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
