import React, { useState } from "react";

const Dashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("transactions");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("last7days");
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleTimePeriodChange = (timePeriod: string) => {
    setSelectedTimePeriod(timePeriod);
  };

  const generateToken = () => {
    // TODO: Implement logic to generate a token
  };

  const sendToken = () => {
    // TODO: Implement logic to send a token
  };

  const requestToken = () => {
    // TODO: Implement logic to request a token
  };

  const transactionData = [
    {
      date: "2022-01-01",
      type: "Purchase",
      amount: 100,
      status: "Success",
    },
    {
      date: "2022-01-02",
      type: "Withdrawal",
      amount: 50,
      status: "Pending",
    },
    {
      date: "2022-01-03",
      type: "Deposit",
      amount: 200,
      status: "Failed",
    },
    {
      date: "2022-01-01",
      type: "Purchase",
      amount: 100,
      status: "Success",
    },
    {
      date: "2022-01-02",
      type: "Withdrawal",
      amount: 50,
      status: "Pending",
    },
    {
      date: "2022-01-03",
      type: "Deposit",
      amount: 200,
      status: "Failed",
    },
    {
      date: "2022-01-01",
      type: "Purchase",
      amount: 100,
      status: "Success",
    },
    {
      date: "2022-01-02",
      type: "Withdrawal",
      amount: 50,
      status: "Pending",
    },
    {
      date: "2022-01-03",
      type: "Deposit",
      amount: 200,
      status: "Failed",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="bg-white shadow rounded-lg mb-6 p-4">
        <div className="flex items-center justify-between">
          <div className="flex">
            <button
              className={`text-lg font-semibold ${
                selectedTab === "dashboard" ? "text-blue-600" : "text-gray-600"
              } mr-6`}
              onClick={() => setSelectedTab("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`text-lg font-semibold ${
                selectedTab === "transactions"
                  ? "text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setSelectedTab("transactions")}
            >
              Transactions
            </button>
          </div>
          <button className="bg-blue-500 text-white rounded-lg px-4 py-2">
            Load
          </button>
        </div>

        {selectedTab === "dashboard" && <div>{/* Dashboard content */}</div>}

        {selectedTab === "transactions" && (
          <div>
            <div className="flex justify-between items-center mt-4">
              <div>
                <button className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Generate
                </button>
                <button className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
                  Send
                </button>
                <button className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
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
                  onClick={() => setSelectedTimePeriod("last7days")}
                >
                  Last 7 days
                </button>
                <button
                  className={`text-sm ${
                    selectedTimePeriod === "last30days"
                      ? "bg-orange-400"
                      : "bg-gray-300"
                  } hover:bg-orange-500 text-white font-bold py-2 px-4 rounded ml-2`}
                  onClick={() => setSelectedTimePeriod("last30days")}
                >
                  Last 30 days
                </button>
                <button
                  className={`text-sm ${
                    selectedTimePeriod === "last90days"
                      ? "bg-orange-400"
                      : "bg-gray-300"
                  } hover:bg-orange-500 text-white font-bold py-2 px-4 rounded ml-2`}
                  onClick={() => setSelectedTimePeriod("last90days")}
                >
                  Last 90 days
                </button>
              </div>
            </div>

            <div className="mt-4 bg-white shadow rounded-lg p-4">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Transaction Type
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactionData.map((transaction, index) => (
                    <tr key={index}>
                      <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                        {transaction.date}
                      </td>
                      <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                        {transaction.type}
                      </td>
                      <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                        R {transaction.amount}
                      </td>
                      <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                        <span
                          className={`inline-flex font-semibold ${
                            transaction.status === "Success"
                              ? "text-green-600"
                              : transaction.status === "Pending"
                              ? "text-orange-500"
                              : "text-red-500"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 border-b border-gray-200 text-sm">
                        <button className="text-blue-600 hover:text-blue-900">
                          View Transaction
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
