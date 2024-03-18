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
        className={`inline-flex items-center justify-center font-semibold rounded-full text-xs  py-1 ${statusClasses}`}
      >
        {status}
      </span>
    );
  };

  const transactions = [
    {
      id: 1,
      date: "2022-01-01",
      type: "Token Redeemed",
      amount: 100,
      status: "Success",
    },
    {
      id: 2,
      date: "2022-01-01",
      type: "Token Transfer",
      amount: 100,
      status: "Success",
    },
    {
      id: 3,
      date: "2022-01-02",
      type: "Token Generate",
      amount: 50,
      status: "Pending",
    },
    {
      id: 4,
      date: "2022-01-02",
      type: "Token Generate",
      amount: 50,
      status: "Pending",
    },
    {
      id: 5,
      date: "2022-01-03",
      type: "Wallet deposit",
      amount: 200,
      status: "Success",
    },
    {
      id: 6,
      date: "2022-01-03",
      type: "Wallet deposit",
      amount: 200,
      status: "Success",
    },
    {
      id: 7,
      date: "2022-01-03",
      type: "Token Request",
      amount: 200,
      status: "Failed",
    },
    {
      id: 8,
      date: "2022-01-03",
      type: "Wallet deposit",
      amount: 200,
      status: "Success",
    },
    {
      id: 9,
      date: "2022-01-03",
      type: "Wallet deposit",
      amount: 200,
      status: "Success",
    },
    {
      id: 10,
      date: "2022-01-03",
      type: "Token Request",
      amount: 200,
      status: "Success",
    },
  ];

  return (
    <div className=" bg-gray-200 px-8 py-5">
      <div className="bg-white shadow-lg rounded-lg mb-6 p-4">
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
      </div>

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

          <div className="flex justify-between items-center mt-4 space-x-4">
            <div className="flex-1 bg-white shadow-lg rounded-lg p-4">
              <div className="text-gray-600 text-lg font-semibold">
                Total Plan Value
              </div>
              <div className="text-gray-900 text-2xl font-bold">R 10000</div>
            </div>

            <div className="flex-1 bg-white shadow-lg rounded-lg p-4">
              <div className="text-gray-600 text-lg font-semibold">Balance</div>
              <div className="text-gray-900 text-2xl font-bold">R 5000</div>
            </div>

            <div className="flex-1 bg-white shadow-lg rounded-lg p-4">
              <div className="text-gray-600 text-lg font-semibold">Spent</div>
              <div className="text-gray-900 text-2xl font-bold">R 3000</div>
            </div>
          </div>

          <div className="mt-4 bg-white shadow-lg rounded-lg p-4">
            <div className="overflow-y-auto max-h-80">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Id
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Transaction Type
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                        {transaction.id}
                      </td>
                      <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                        {transaction.date}
                      </td>
                      <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                        {transaction.type}
                      </td>
                      <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                        <StatusPill status={transaction.status} />
                      </td>
                      <td className="px-5 py-3 border-b border-gray-200 text-sm text-left">
                        R {transaction.amount}
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
        </div>
      )}
    </div>
  );
};

export default Dashboard;
