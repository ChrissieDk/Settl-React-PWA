import React, { useEffect, useState, useRef } from "react";
import { tableTransactions, Voucher } from "./types/Types";
import HealthVault from "./components/HealthVault/HealthVault";
import TransactionsTab from "./components/Transactions/Transactions";
import { useAuth } from "./Auth/AuthContext";
import {
  initiateIssueToken,
  listTokens,
  getVouchers,
  getTransactions,
} from "./Services/data.service";
import Modal from "./components/CardDetail/CardDetail";
import Vouchers from "./components/Vouchers/Vouchers";
import Load from "./components/Load/Load";
import "driver.js/dist/driver.css";

// icons
import { FaUserDoctor, FaTooth, FaGlasses, FaBars } from "react-icons/fa6";
import { GiMedicinePills } from "react-icons/gi";
import { TbReportAnalytics } from "react-icons/tb";
import { IoWalletOutline } from "react-icons/io5";
import { MdOutlineConfirmationNumber, MdHealthAndSafety } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";

import blurredBird from "../src/img/Homepage/settl bird_blur.png";
import phone from "../src/img/HP_Phones.png";
import placeholder from "../src/img/settl_logo1.png";
import RedeemModal from "./components/RedeemModal/RedeemModal";
import OTPRedemptionModal from "./components/OtpRedemption/OTPRedemption";
import SignalRservice from "./Services/SignalRservice";
import PatientList from "./components/Patient/PatientList";
import MerchantTransactionsTable from "./components/MerchantTransactions/MerchantTransactions";

const Dashboard: React.FC = () => {
  // Navigation and UI State
  const { isMerchant, loading: authLoading } = useAuth();
  const [selectedTab, setSelectedTab] = useState(
    isMerchant ? "transactions" : "load"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Existing State
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("last7days");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [initiationUrl, setInitiationUrl] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [tokens, setTokens] = useState<any[]>([]);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [transactions, setTransactions] = useState<tableTransactions[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);

  const circleTexts = [
    "Secure Payments.",
    "Reliable Transactions.",
    "Swift Service.",
  ];

  const circleImages = [blurredBird, phone, placeholder];

  const navItems = isMerchant
    ? [
        {
          id: "merchantTransactionsTable",
          label: "Transactions",
          icon: <BiTransfer size={20} />,
        },
        {
          id: "otp-redemption",
          label: "OTP Redemption",
          icon: <MdHealthAndSafety size={20} />,
        },
        {
          id: "patient-list",
          label: "Patient List",
          icon: <MdHealthAndSafety size={20} />,
        },
      ]
    : [
        { id: "load", label: "Load", icon: <IoWalletOutline size={20} /> },
        {
          id: "redeem",
          label: "Redeem",
          icon: <MdOutlineConfirmationNumber size={20} />,
        },
        {
          id: "vouchers",
          label: "Vouchers",
          icon: <MdOutlineConfirmationNumber size={20} />,
        },
        {
          id: "healthVault",
          label: "Health Vault",
          icon: <MdHealthAndSafety size={20} />,
        },
        {
          id: "transactions",
          label: "Transactions",
          icon: <BiTransfer size={20} />,
        },
      ];

  // Driver js
  // useDriverTour(isMobile, setIsSidebarOpen);

  useEffect(() => {
    // Listen for incoming messages
    SignalRservice.on("ReceiveMessage", (message) => {
      console.log("Received message:", message);
      if (typeof message === "string" && message.length === 36) {
        setIsOtpModalOpen(true); // Open the OTP Modal
      }
    });

    return () => {
      SignalRservice.off("ReceiveMessage");
    };
  }, []);

  useEffect(() => {
    const maxRetries = 3;
    let retryCount = 0;

    const fetchDataWithRetry = async (
      fetchFunction: () => Promise<any>,
      setData: (data: any) => void
    ) => {
      while (retryCount < maxRetries) {
        try {
          const response = await fetchFunction();
          setData(response);
          break; // Exit loop if fetch is successful
        } catch (error) {
          retryCount++;
          console.error(`Attempt ${retryCount} failed:`, error);
          if (retryCount >= maxRetries) {
            setError(
              "Failed to fetch data after multiple attempts. Please try again later."
            );
          }
        }
      }
    };

    fetchDataWithRetry(getTransactions, setTransactions);
    fetchDataWithRetry(getVouchers, setVouchers);
    fetchDataWithRetry(listTokens, (response) =>
      setTokens(response.additionalData.paymentTokens)
    );
  }, []);

  const updateTransactions = (newTransactions: tableTransactions[]) => {
    setTransactions(newTransactions);
  };

  useEffect(() => {
    // Only set default tab on initial load, not when tab changes
    if (isMerchant && !selectedTab) {
      setSelectedTab("merchantTransactionsTable");
    }
  }, [isMerchant]); // Only depend on isMerchant, not selectedTab

  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Existing useEffects
  useEffect(() => {
    const fetchInitiationUrl = async () => {
      try {
        const data = await initiateIssueToken();
        if (data && data.peripheryData && data.peripheryData.initiationUrl) {
          setInitiationUrl(data.peripheryData.initiationUrl);
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

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getTransactions();
        setTransactions(response);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const openOTPModal = () => {
    setIsOtpModalOpen(true);
  };
  const closeOTPModal = () => {
    setIsOtpModalOpen(false);
  };

  // Calculations
  const validTotalBalance =
    typeof totalBalance === "number" && !isNaN(totalBalance) ? totalBalance : 0;
  const validTotalValue =
    typeof totalValue === "number" && !isNaN(totalValue) && totalValue !== 0
      ? totalValue
      : 1;

  const percentage =
    validTotalValue && validTotalBalance
      ? (validTotalBalance / validTotalValue) * 100
      : 0;

  // Event Handlers
  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const addCardRedirect = () => {
    if (initiationUrl) {
      window.location.href = initiationUrl;
    } else {
      console.error("Initiation URL is not available");
    }
  };

  const handleTimePeriodChange = (timePeriod: string) => {
    setSelectedTimePeriod(timePeriod);
  };

  const openModal = (action: string) => {
    if (action === "redeem") {
      setTokenModalOpen(true);
      setSelectedAction(action);
    } else if (action === "otp-redemption") {
      openOTPModal();
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setTokenModalOpen(false);
    setIsModalOpen(false);
  };

  // Open Redeem Modal
  const openRedeemModal = () => {
    setIsRedeemModalOpen(true);
  };

  // Close Redeem Modal
  const closeRedeemModal = () => {
    setIsRedeemModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed md:static
        inset-y-0 left-0
        w-64 bg-white
        transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-200 ease-in-out
        z-30 md:z-0
        flex flex-col
        h-full
        shadow-lg
      `}
      >
        {/* Sidebar Header */}
        <div
          className="p-4 border-b flex justify-between items-center"
          data-driver="sidebar-header"
        >
          <h2 className="text-xl font-bold text-blue-600">Dashboard</h2>
          {isMobile && (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <FaUserDoctor className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4">
          {navItems.map(({ id, label, icon }) => (
            <button
              key={id}
              data-driver={`sidebar-nav-${id}`}
              onClick={() => {
                if (id === "redeem") {
                  openRedeemModal();
                } else if (id === "otp-redemption") {
                  openOTPModal();
                } else {
                  setSelectedTab(id);
                }
                if (isMobile) setIsSidebarOpen(false);
              }}
              className={`
        w-full flex items-center space-x-3 px-4 py-3 mb-2 rounded-lg
        transition-all duration-200 ease-in-out
        transform hover:scale-102 
        hover:shadow-md
        group
        ${
          selectedTab === id
            ? "bg-blue-500 text-white translate-x-1"
            : "text-gray-600 hover:bg-blue-50 hover:translate-x-1"
        }
      `}
            >
              <span
                className={`
        flex items-center justify-center w-6
        transition-transform duration-200
        group-hover:scale-110
      `}
              >
                {icon}
              </span>
              <span className="transition-colors duration-200">{label}</span>
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="p-4 border-t space-y-2" data-driver="sidebar-actions">
          {!isMerchant && (
            <>
              <button
                className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors"
                onClick={addCardRedirect}
                data-driver="sidebar-add-card"
              >
                Add Card
              </button>
              <button
                className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors"
                onClick={handleButtonClick}
                data-driver="sidebar-my-cards"
              >
                My Cards
              </button>
            </>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <div className="bg-white p-4 shadow-sm flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden mr-4 text-gray-500 hover:text-gray-700 p-1"
          >
            <FaBars className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">
            {navItems.find((item) => item.id === selectedTab)?.label}
          </h1>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 overflow-auto">
          {selectedTab === "healthVault" && (
            <div id="health-vault-section">
              <HealthVault
                balance={Math.floor(totalBalance / 100).toString()}
                percentage={Math.floor(percentage)}
                totalValue={Math.floor(totalValue / 100).toString()}
                description="Health Vault"
                expenses={[
                  {
                    category: "GP",
                    amount: "500",
                    icon: <FaUserDoctor size={30} />,
                    description: "General practitioner voucher value",
                  },
                  {
                    category: "Dentist",
                    amount: "500",
                    icon: <FaTooth size={30} />,
                    description: "Dentist voucher value",
                  },
                  {
                    category: "Optometrist",
                    amount: "500",
                    icon: <FaGlasses size={30} />,
                    description: "Optometrist voucher value",
                  },
                  {
                    category: "Over the counter medication",
                    amount: "",
                    icon: <GiMedicinePills size={30} />,
                    description: "Over-the-counter medication",
                  },
                  {
                    category: "Transaction summary",
                    amount: "",
                    icon: <TbReportAnalytics size={30} />,
                    description: "Detailed description of past transactions",
                  },
                ]}
              />
            </div>
          )}
          {selectedTab === "transactions" && (
            <div id="transactions-tab">
              <TransactionsTab
                key="transactions-tab"
                transactions={transactions}
                tokens={tokens}
                openModal={openModal}
                closeModal={closeModal}
                handleTimePeriodChange={handleTimePeriodChange}
                selectedTimePeriod={selectedTimePeriod}
                selectedTab={selectedTab}
                updateTransactions={updateTransactions}
              />
            </div>
          )}
          {selectedTab === "load" && (
            <Load
              tokens={tokens}
              circleImages={circleImages}
              circleTexts={circleTexts}
              setTokens={setTokens}
              setSelectedToken={setSelectedToken}
              setSelectedTab={setSelectedTab}
              openRedeemModal={openRedeemModal}
            />
          )}
          {selectedTab === "vouchers" && <Vouchers />}
          {selectedTab === "patient-list" && (
            <div id="patient-list">
              <PatientList key="patient-list" />
            </div>
          )}
          {selectedTab === "merchantTransactionsTable" && (
            <div id="merchantTransactionsTable">
              <MerchantTransactionsTable key="merchantTransactionsTable" />
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tokens={tokens}
      />
      <RedeemModal
        isOpen={isRedeemModalOpen}
        onClose={closeRedeemModal}
        vouchers={vouchers}
        action="redeem"
      />
      {isOtpModalOpen && (
        <OTPRedemptionModal
          isOpen={isOtpModalOpen}
          onClose={closeOTPModal}
          merchantId={"b2b911a2-f8df-4e0e-9168-d5dada20786f"}
        />
      )}
    </div>
  );
};

export default Dashboard;
