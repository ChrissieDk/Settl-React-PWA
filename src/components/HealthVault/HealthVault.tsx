import React, { ReactNode } from "react";
import CircularProgress from "./CircleProgress";

interface Expense {
  category?: string;
  amount?: string;
  icon?: ReactNode;
}

interface HealthVaultProps {
  balance: string;
  percentage: number;
  totalValue: string;
  expenses: Expense[];
}

const HealthVault: React.FC<HealthVaultProps> = ({
  balance,
  percentage,
  expenses,
  totalValue,
}) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl lg:text-4xl text-blue-500 font-header">
          Health Vault
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-orange-400 via-orange-400 to-blue-400 text-white rounded-lg p-6 relative overflow-hidden text-left shadow-xl row-span-2 md:col-span-2">
          <div className="absolute inset-0 bg-geometric-pattern opacity-60"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-32 h-32 lg:w-48 lg:h-48 rounded-full bg-white bg-opacity-10 flex items-center justify-center">
                <CircularProgress percentage={percentage} />
              </div>
              <div className="ml-4">
                <h2 className="text-lg lg:text-2xl font-button text-[#FFFFFF]">
                  My Balance
                </h2>
                <p className="text-2xl lg:text-6xl font-paragraph text-[#FFFFFF]">
                  {balance}
                </p>
                <h2 className="text-lg font-button text-[#FFFFFF]">
                  Total Voucher Value
                </h2>
                <h2 className="text-lg font-paragraph text-[#FFFFFF]">
                  {totalValue}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {expenses.map((expense, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-2 flex flex-col items-center shadow-xl"
          >
            <div className="w-12 h-12 bg-opacity-20 flex items-center justify-center ">
              {expense.icon}
            </div>
            <p className="text-xl font-medium font-button">R{expense.amount}</p>
            <p className="text-blue-500 font-paragraph">{expense.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthVault;
