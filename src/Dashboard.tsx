import React, { useEffect, useState } from "react";
import TokenModal from "./components/TokenModal/TokenModal";
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
import blurredBird from "../src/img/Homepage/settl bird_blur.png";

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
  const [activeText, setActiveText] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

  const circleTexts = [
    "Secure Payments.",
    "Reliable Transactions.",
    "Swift Service.",
  ];

  const circleImages = [blurredBird, blurredBird, blurredBird];

  const cycleInterval = 4000;
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveText((prevActive) => (prevActive + 1) % circleTexts.length);
    }, cycleInterval);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveImage((prevActive) => (prevActive + 1) % circleImages.length);
    }, cycleInterval);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchInitiationUrl = async () => {
      try {
        const data = await initiateIssueToken();
        // console.log("API response:", data);
        if (data && data.peripheryData && data.peripheryData.initiationUrl) {
          setInitiationUrl(data.peripheryData.initiationUrl);
          // console.log("Initiation URL set:", data.peripheryData.initiationUrl);
        } else {
          console.error("API response does not contain initiationUrl:", data);
        }
      } catch (error) {
        console.error("Redirect failed", error);
      }
    };

    fetchInitiationUrl();
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
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 md:justify-between sm:space-x-0">
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
          <div className="pt-4 lg:pt-0 space-y-2 md:space-y-0">
            <button
              className="w-full sm:w-auto bg-blue-500 text-white rounded-lg px-4 py-2"
              onClick={addCardRedirect}
            >
              Add Card
            </button>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              tokens={tokens}
            />
            <button
              className="w-full sm:w-auto bg-blue-500 text-white rounded-lg px-4 py-2 lg:mx-2"
              onClick={handleButtonClick}
            >
              My Cards
            </button>
            {/* <button className="w-full sm:w-auto bg-blue-500 text-white rounded-lg px-4 py-2">
              Load
            </button> */}
          </div>
        </div>
      </div>

      {/* HealthVault tab */}
      {selectedTab === "healthVault" && (
        <HealthVault
          balance="2000,00"
          percentage={75}
          totalValue="5000,00"
          description="Health Vault"
          expenses={[
            {
              category: "GP",
              amount: "550,00",
              icon: <FaUserDoctor size={30} />,
              description: "General practitioner voucher value",
            },
            {
              category: "Dentist",
              amount: "500,00",
              icon: <FaTooth size={30} />,
              description: "Dentist voucher value",
            },
            {
              category: "Optometrist",
              amount: "500,00",
              icon: <FaGlasses size={30} />,
              description: "Optometrist voucher value",
            },
            {
              category: "OTC",
              amount: "250,00",
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

      {/* Transactions tab */}
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
        <div className="flex justify-center items-center ">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex">
            {/* Left section for image or content */}
            <div className="w-1/3 bg-blue-400 p-8  flex-col justify-between hidden lg:block">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4 text-left font-header">
                  Your voucher, your way!
                </h2>
                <p className="text-white text-left font-paragraph mb-8">
                  Easily manage and process payments with our intuitive
                  platform.
                </p>
              </div>
              <div className="mt-auto">
                <div className="w-full h-64 rounded-lg flex items-center justify-center">
                  <img
                    src={circleImages[activeImage]}
                    alt={`Slide ${activeImage + 1}`}
                    className="object-cover w-full h-full rounded-lg transition-opacity duration-500 ease-in-out"
                  />
                </div>
                <div className="flex space-x-2 mt-[2.2rem]">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-500 ease-in-out ${
                        activeImage === index ? "bg-orange-400" : "bg-white"
                      }`}
                      onClick={() => setActiveImage(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right section with the form */}
            <div className="w-full lg:w-2/3 bg-white">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-orange-400 rounded-full mr-3"></div>
                  <h1 className="text-2xl font-header text-gray-800 ">
                    SettlPay
                  </h1>
                </div>
                <h2 className="text-2xl lg:text-4xl font-header text-gray-800 mb-6">
                  Let's Settl it!
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="amount"
                      className="block text-md font-paragraph text-black mb-1 text-left"
                    >
                      Amount
                    </label>
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="token"
                      className="block text-md font-paragraph text-black mb-1 text-left"
                    >
                      My Cards
                    </label>
                    <select
                      id="token"
                      onChange={(e) => setSelectedToken(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    >
                      <option value="">Select a card</option>
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
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-xl font-paragraph text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Secure Payment
                  </button>
                </form>
              </div>
              <div className="bg-gray-300 p-[2.2rem]">
                <div className="text-2xl lg:text-3xl font-semibold font-header text-black mb-4 text-left transition-opacity duration-500 ease-in-out">
                  {circleTexts[activeText]}
                </div>
                <div className="flex flex-col space-y-4">
                  <div className="flex space-x-2">
                    {[0, 1, 2].map((index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-500 ease-in-out ${
                          activeText === index ? "bg-orange-400" : "bg-white"
                        }`}
                        onClick={() => setActiveText(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
