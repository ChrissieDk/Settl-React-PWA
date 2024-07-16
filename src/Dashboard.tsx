import React, { useEffect, useState } from "react";
import TokenModal from "./components/TokenModal/TokenModal";
import { useNavigate } from "react-router-dom";
import { Transaction } from "./types/Types";
import HealthVault from "./components/HealthVault/HealthVault";
import {
  initiateIssueToken,
  listTokens,
  createOrder,
  initiateAuthenticateToken,
  payment,
} from "./Services/data.service";
import Modal from "./CardDetail/CardDetail";
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
  const [initiationUrl, setInitiationUrl] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [tokens, setTokens] = useState<any[]>([]);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitiationUrl = async () => {
      try {
        const data = await initiateIssueToken();
        console.log("API response:", data);
        if (data && data.peripheryData && data.peripheryData.initiationUrl) {
          setInitiationUrl(data.peripheryData.initiationUrl);
          console.log("Initiation URL set:", data.peripheryData.initiationUrl);
        } else {
          console.error("API response does not contain initiationUrl:", data);
        }
      } catch (error) {
        console.error("Redirect failed", error);
      }
    };

    fetchInitiationUrl();
  }, []);

  useEffect(() => {
    const testCreateOrder = async () => {
      try {
        const response = await createOrder(amount);
        console.log("Data received from createOrder:", response);
      } catch (err) {
        console.log("Error creating order:", err);
      }
    };

    testCreateOrder();
  }, []);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const addCardRedirect = () => {
    if (initiationUrl) {
      console.log("Navigating to:", initiationUrl);
      window.location.href = initiationUrl;
    } else {
      console.error("Initiation URL is not available");
    }
  };

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await listTokens();
        setTokens(response.additionalData.paymentTokens);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    fetchTokens();
  }, []);

  // payment flow
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedToken) {
      console.log("No token selected");
      return;
    }

    try {
      const orderResponse = await createOrder(amount);

      const authResponse = await initiateAuthenticateToken(
        selectedToken,
        amount
      );
      console.log("Order created:", orderResponse);
      const authInitiationUrl = authResponse.peripheryData?.initiationUrl;
      window.location.href = authInitiationUrl;
    } catch (error) {
      console.error("Error processing order:", error);
    }
  };
  // await payment(selectedToken, orderResponse).then(
  //   async (paymentResponse) => {
  //     debugger;
  //     window.location.href = authInitiationUrl;
  //     console.log("Payment request:", paymentResponse);
  //   }
  // );

  const transactions: Transaction[] = [
    // {
    //   id: 1,
    //   date: "2024-01-01",
    //   type: "Token Redeemed",
    //   amount: 100,
    //   status: "Success",
    //   service: "GP",
    // },
    // {
    //   id: 2,
    //   date: "2024-01-01",
    //   type: "Token Transfer",
    //   amount: 100,
    //   status: "Success",
    //   service: "Transfer",
    // },
    // {
    //   id: 3,
    //   date: "2024-01-02",
    //   type: "Token Generate",
    //   amount: 50,
    //   status: "Pending",
    //   service: "Dentistry",
    // },
    // {
    //   id: 4,
    //   date: "2024-01-02",
    //   type: "Token Generate",
    //   amount: 50,
    //   status: "Pending",
    //   service: "GP",
    // },
    // {
    //   id: 5,
    //   date: "2024-01-03",
    //   type: "Wallet deposit",
    //   amount: 200,
    //   status: "Success",
    //   service: "GP",
    // },
    // {
    //   id: 6,
    //   date: "2023-01-03",
    //   type: "Wallet deposit",
    //   amount: 200,
    //   status: "Success",
    //   service: "Optometry",
    // },
    // {
    //   id: 7,
    //   date: "2023-01-03",
    //   type: "Token Request",
    //   amount: 200,
    //   status: "Failed",
    //   service: "Optometry",
    // },
    // {
    //   id: 8,
    //   date: "2023-01-03",
    //   type: "Wallet deposit",
    //   amount: 200,
    //   status: "Success",
    //   service: "GP",
    // },
    // {
    //   id: 9,
    //   date: "2023-01-03",
    //   type: "Wallet deposit",
    //   amount: 200,
    //   status: "Success",
    //   service: "Optometry",
    // },
    // {
    //   id: 10,
    //   date: "2023-01-03",
    //   type: "Token Request",
    //   amount: 200,
    //   status: "Success",
    //   service: "Request",
    // },
    // {
    //   id: 11,
    //   date: "2021-01-01",
    //   type: "Token Redeemed",
    //   amount: 100,
    //   status: "Success",
    //   service: "Dentistry",
    // },
    // {
    //   id: 12,
    //   date: "2021-01-01",
    //   type: "Token Transfer",
    //   amount: 100,
    //   status: "Success",
    //   service: "Transfer",
    // },
    // {
    //   id: 13,
    //   date: "2021-01-02",
    //   type: "Token Generate",
    //   amount: 50,
    //   status: "Pending",
    //   service: "Optometry",
    // },
    // {
    //   id: 14,
    //   date: "2024-01-02",
    //   type: "Token Generate",
    //   amount: 50,
    //   status: "Pending",
    //   service: "GP",
    // },
    // {
    //   id: 15,
    //   date: "2024-01-03",
    //   type: "Wallet deposit",
    //   amount: 200,
    //   status: "Success",
    //   service: "Deposit",
    // },
    // {
    //   id: 16,
    //   date: "2024-01-03",
    //   type: "Wallet deposit",
    //   amount: 200,
    //   status: "Success",
    //   service: "Deposit",
    // },
    // {
    //   id: 17,
    //   date: "2024-01-03",
    //   type: "Token Request",
    //   amount: 200,
    //   status: "Failed",
    //   service: "Request",
    // },
    // {
    //   id: 18,
    //   date: "2024-01-03",
    //   type: "Wallet deposit",
    //   amount: 200,
    //   status: "Success",
    //   service: "Deposit",
    // },
    // {
    //   id: 19,
    //   date: "2024-01-03",
    //   type: "Wallet deposit",
    //   amount: 200,
    //   status: "Success",
    //   service: "Deposit",
    // },
    // {
    //   id: 20,
    //   date: "2024-01-03",
    //   type: "Token Request",
    //   amount: 200,
    //   status: "Success",
    //   service: "Request",
    // },
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
    if (action === "generate" || action === "send" || action === "request") {
      setTokenModalOpen(true);
      setSelectedAction(action);
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setTokenModalOpen(false);
    setIsModalOpen(false);
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
              Health Vault
            </button>
            <button
              className={`text-lg font-semibold ${
                selectedTab === "transactions"
                  ? "text-blue-600"
                  : "text-gray-600"
              } mr-6`}
              onClick={() => handleTabChange("transactions")}
            >
              Transactions
            </button>
            <button
              className={`text-lg font-semibold ${
                selectedTab === "orders" ? "text-blue-600" : "text-gray-600"
              }`}
              onClick={() => handleTabChange("orders")}
            >
              Orders
            </button>
          </div>
          <div>
            <button
              className="bg-blue-500 text-white rounded-lg px-4 py-2 mr-2"
              onClick={addCardRedirect}
            >
              Add Card
            </button>
            <button
              className="bg-blue-500 text-white rounded-lg px-4 py-2 mr-2"
              onClick={handleButtonClick}
            >
              My Cards
            </button>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              tokens={tokens}
            />
            <button className="bg-blue-500 text-white rounded-lg px-4 py-2">
              Load
            </button>
          </div>
        </div>
      </div>

      {/* HealthVault tab */}
      {selectedTab === "healthVault" && (
        <HealthVault
          balance="2000,00"
          percentage={75}
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

      {/* Orders tab */}
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
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-5">
                        Id
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-5">
                        Date
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-5">
                        Service
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-5">
                        Transaction Type
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-5">
                        Status
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-5">
                        Amount
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
          )}
        </div>
      )}
      {/* Orders tab */}
      {selectedTab === "orders" && (
        <form
          onSubmit={handleSubmit}
          className="p-4 max-w-sm mx-auto bg-white rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700">
              Amount:
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="token" className="block text-gray-700">
              Select Token:
            </label>
            <select
              id="token"
              onChange={(e) => setSelectedToken(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select a token</option>
              {tokens.map((token, index) => (
                <option key={index} value={token.token}>
                  {token.paymentInstrumentAssociationName} -{" "}
                  {token.truncatedPaymentInstrument}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Create Order
          </button>
        </form>
      )}
    </div>
  );
};

export default Dashboard;
