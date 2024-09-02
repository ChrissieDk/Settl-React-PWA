import React, { useEffect, useState } from "react";
import { tableTransactions, Voucher } from "./types/Types";
import HealthVault from "./components/HealthVault/HealthVault";
import TransactionsTab from "./components/Transactions/Transactions";
import {
  initiateIssueToken,
  listTokens,
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
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [initiationUrl, setInitiationUrl] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [tokens, setTokens] = useState<any[]>([]);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [transactions, setTransactions] = useState<tableTransactions[]>([]);

  const circleTexts = [
    "Secure Payments.",
    "Reliable Transactions.",
    "Swift Service.",
  ];

  const circleImages = [blurredBird, blurredBird, blurredBird];

  // fetches url to add a card
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

  // onClick function to redirect to add card page
  const addCardRedirect = () => {
    if (initiationUrl) {
      console.log("Navigating to:", initiationUrl);
      window.location.href = initiationUrl;
    } else {
      console.error("Initiation URL is not available");
    }
  };

  // get all cards and display them
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

  // get all vouchers and display them
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
      : 1;

  const percentage =
    validTotalValue && validTotalBalance
      ? (validTotalBalance / validTotalValue) * 100
      : 0;

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

  useEffect(() => {
    // This is where we can fetch transactions from an API
    // Using staticData for now

    // transactionId: string;
    // transactionDate: string;
    // transactionTime: string;
    // transactionType: string;
    // status: string;
    // amount: number;
    // currencyCode: string;
    // voucherCode?: string;
    // balance?: number;
    const staticTransactions: tableTransactions[] = [
      {
        transactionId: "1",
        transactionDate: "2024-01-01",
        transactionTime: "12:00",
        transactionType: "Vault load",
        amount: 1000,
        balance: 1000,
        status: "Success",
        service: "Dentist",
        currencyCode: "123",
        voucherCode: "1235677852234",
      },
      {
        transactionId: "2",
        transactionDate: "2024-01-01",
        transactionTime: "12:00",
        transactionType: "Token Redeemed",
        amount: 100,
        status: "Success",
        service: "GP",
        currencyCode: "123",
        voucherCode: "1235677852234",
        balance: 100,
      },
      {
        transactionId: "3",
        transactionDate: "2024-01-01",
        transactionTime: "12:00",
        transactionType: "Vault load",
        amount: 100,
        status: "Failed",
        service: "GP",
        currencyCode: "456",
        voucherCode: "123567712234",
        balance: 100,
      },
      {
        transactionId: "4",
        transactionDate: "2024-08-11",
        transactionTime: "12:00",
        transactionType: "Token Redeemed",
        amount: 10000,
        status: "Success",
        service: "GP",
        currencyCode: "789",
        voucherCode: "1235677852234",
        balance: 10000,
      },
      // make 10 more transactions with the exact same format below please
      {
        transactionId: "5",
        transactionDate: "2024-02-05",
        transactionTime: "12:00",
        transactionType: "Vault load",
        amount: 1000,
        balance: 1000,
        status: "Success",
        service: "GP",
        currencyCode: "123",
        voucherCode: "1235677852234",
      },
      {
        transactionId: "6",
        transactionDate: "2023-01-01",
        transactionTime: "12:00",
        transactionType: "Token Redeemed",
        amount: 100,
        status: "Success",
        service: "GP",
        currencyCode: "123",
        voucherCode: "1235677852234",
        balance: 100,
      },
      {
        transactionId: "7",
        transactionDate: "2021-01-01",
        transactionTime: "12:00",
        transactionType: "Vault load",
        amount: 100,
        status: "Failed",
        service: "GP",
        currencyCode: "456",
        voucherCode: "123567712234",
        balance: 100,
      },
      {
        transactionId: "8",
        transactionDate: "2020-01-01",
        transactionTime: "12:00",
        transactionType: "Token Redeemed",
        amount: 10000,
        status: "Success",
        service: "GP",
        currencyCode: "789",
        voucherCode: "1235677852234",
        balance: 10000,
      },
      {
        transactionId: "9",
        transactionDate: "2022-01-01",
        transactionTime: "12:00",
        transactionType: "Vault load",
        amount: 1000,
        balance: 1000,
        status: "Success",
        service: "OTC",
        currencyCode: "123",
        voucherCode: "1235677852234",
      },
      {
        transactionId: "10",
        transactionDate: "2024-01-01",
        transactionTime: "12:00",
        transactionType: "Token Redeemed",
        amount: 100,
        status: "Success",
        service: "Optometrist",
        currencyCode: "123",
        voucherCode: "1235677852234",
        balance: 100,
      },
    ];

    setTransactions(staticTransactions);
  }, []);

  return (
    <div className="bg-gray-200 px-4 lg:px-8 py-4 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg mb-6 p-4">
        <div className="flex flex-col sm:flex-row md:justify-between">
          {/* Scrollable Tabs Container */}
          <div className="flex space-x-4 overflow-x-auto pb-2 min-w-0 whitespace-nowrap">
            <button
              className={`text-lg font-semibold ${
                selectedTab === "healthVault"
                  ? "text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabChange("healthVault")}
            >
              Health Vault
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

          {/* Button Container */}
          <div className="pt-4 lg:pt-0 space-y-2 md:space-y-0 flex flex-col sm:flex-row">
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
          </div>
        </div>
      </div>

      {/* HealthVault tab */}
      {selectedTab === "healthVault" && (
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
      )}
      {/* Transactions tab */}
      {selectedTab === "transactions" && (
        <TransactionsTab
          transactions={transactions}
          tokens={tokens}
          openModal={openModal}
          closeModal={closeModal}
          handleTimePeriodChange={handleTimePeriodChange}
          selectedTimePeriod={selectedTimePeriod}
        />
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
