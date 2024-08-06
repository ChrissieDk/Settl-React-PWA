import React, { useEffect, useState } from "react";
import RedeemModal from "./components/RedeemModal/RedeemModal";
import { VoucherOldTransaction, UrlData, Voucher } from "./types/Types";
import HealthVault from "./components/HealthVault/HealthVault";
import {
  initiateIssueToken,
  listTokens,
  createOrder,
  initiateAuthenticateToken,
  payment,
  getVouchers,
} from "./Services/data.service";
import Modal from "./components/CardDetail/CardDetail";
import Vouchers from "./components/Vouchers/Vouchers";
import Load from "./components/Load/Load";
// icons
import { FaUserDoctor } from "react-icons/fa6";
import { FaTooth } from "react-icons/fa";
import { FaGlasses } from "react-icons/fa";
import { GiMedicinePills } from "react-icons/gi";
import { TbReportAnalytics } from "react-icons/tb";
import blurredBird from "../src/img/Homepage/settl bird_blur.png";

const Dashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("load");
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
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);

  const circleTexts = [
    "Secure Payments.",
    "Reliable Transactions.",
    "Swift Service.",
  ];

  const circleImages = [blurredBird, blurredBird, blurredBird];

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
        console.log("Tokens fetched:", response.additionalData.paymentTokens);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    fetchTokens();
  }, []);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await getVouchers();
        setVouchers(response);

        const balance = response.reduce(
          (acc: any, voucher: any) => acc + voucher.balance,
          0
        );
        const value = response.reduce(
          (acc: any, voucher: any) => acc + voucher.amount,
          0
        );

        setTotalBalance(balance);
        setTotalValue(value);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    fetchVouchers();
  }, []);

  const validTotalBalance =
    typeof totalBalance === "number" && !isNaN(totalBalance) ? totalBalance : 0;
  const validTotalValue =
    typeof totalValue === "number" && !isNaN(totalValue) && totalValue !== 0
      ? totalValue
      : 1; // Default to 1 to avoid division by zero

  const percentage =
    validTotalValue && validTotalBalance
      ? (validTotalBalance / validTotalValue) * 100
      : 0;

  const formattedPercentage = percentage.toFixed(2);

  const transactions: VoucherOldTransaction[] = [
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
    //  || action === "send" || action === "request"
    if (action === "redeem") {
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
    <div className="bg-gray-200 px-4 lg:px-8 py-4 min-h-screen">
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
                selectedTab === "load" ? "text-blue-600" : "text-gray-600"
              }`}
              onClick={() => handleTabChange("load")}
            >
              Load
            </button>
            <button
              className={`text-lg font-semibold ${
                selectedTab === "vouchers" ? "text-blue-600" : "text-gray-600"
              }`}
              onClick={() => handleTabChange("vouchers")}
            >
              Vouchers
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
          balance={(totalBalance / 100).toFixed(2).replace(".", ",")}
          percentage={parseFloat(percentage.toFixed(2))}
          totalValue={(totalValue / 100).toFixed(2).replace(".", ",")}
          description="Health Vault"
          expenses={[
            {
              category: "GP",
              amount: "500,00",
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
              category: "Over the counter medication",
              amount: "",
              icon: <GiMedicinePills size={30} />,
              description:
                "Over-the-counter medication voucher value - can be any custom value",
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
          <div className="flex justify-between text-left lg:items-center mt-4 flex-col lg:flex-row">
            <div>
              <button
                onClick={() => openModal("redeem")}
                className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Redeem
              </button>
              {/* <button
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
              </button> */}
            </div>
            <div className="mt-2 lg:mt-0">
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
      {/* Load tab */}
      {selectedTab === "load" && (
        <Load
          tokens={tokens}
          circleImages={circleImages}
          circleTexts={circleTexts}
          setTokens={setTokens}
          setSelectedToken={setSelectedToken}
        />
      )}
      {selectedTab === "vouchers" && <Vouchers />}
    </div>
  );
};

export default Dashboard;
