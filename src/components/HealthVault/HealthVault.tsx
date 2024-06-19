// src/components/HealthVault/HealthVault.tsx
import React from "react";

interface Expense {
  category: string;
  amount: string;
  icon: string;
}

interface HealthVaultProps {
  balance: string;
  percentage: number;
  expenses: Expense[];
}

const HealthVault: React.FC<HealthVaultProps> = ({
  balance,
  percentage,
  expenses,
}) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl lg:text-4xl text-blue-500 font-header">
          Health Vault
        </h1>
        <button className="text-black">
          <svg width="40" height="40" fill="currentColor">
            <circle cx="12" cy="12" r="2"></circle>
            <circle cx="19" cy="12" r="2"></circle>
            <circle cx="5" cy="12" r="2"></circle>
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-orange-400 text-white rounded-lg p-6 relative overflow-hidden text-left shadow-xl row-span-2 md:col-span-2">
          <div className="absolute inset-0 bg-geometric-pattern opacity-60"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-32 h-32 rounded-full bg-white bg-opacity-10 flex items-center justify-center">
                <span className="text-xl lg:text-4xl">{percentage}%</span>
              </div>
              <div className="ml-4">
                <h2 className="text-lg lg:text-2xl font-button">My Balance</h2>
                <p className="text-3xl lg:text-6xl font-paragraph">{balance}</p>
              </div>
            </div>
          </div>
        </div>

        {expenses.map((expense, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 flex flex-col items-center shadow-xl"
          >
            <div
              className={`w-12 h-12 rounded-full bg-opacity-20 mb-2 ${expense.icon}`}
            ></div>
            <p className="text-xl font-medium font-header">${expense.amount}</p>
            <p className="text-gray-500 font-paragraph">{expense.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthVault;
