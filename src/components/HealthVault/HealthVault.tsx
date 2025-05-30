// Component not done, just basic styling alayout idea completed.

import React, { ReactNode } from "react";
import CircularProgress from "./CircleProgress";
import { Tooltip as ReactTooltip } from "react-tooltip";

import { MdInfoOutline, MdOutlineAccountBalanceWallet } from "react-icons/md";

interface Expense {
  category?: string;
  amount?: string;
  icon?: ReactNode;
  description?: string;
}

interface HealthVaultProps {
  balance: string;
  percentage: number;
  totalValue: string;
  description?: string;
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl lg:text-4xl text-blue-500 font-header flex items-center">
          <MdOutlineAccountBalanceWallet className="mr-2" />
          Health Vault
        </h1>
        <div>
          <MdInfoOutline
            id="info-icon"
            className="text-blue-500 cursor-pointer text-xl lg:text-2xl"
          />
          <ReactTooltip
            anchorId="info-icon"
            place="left"
            opacity={1}
            content="Prices shown are general estimates to help guide your health voucher budgeting. Actual costs may vary by provider."
            style={{
              backgroundColor: "white",
              color: "#222",
              fontFamily: "Montserrat, sans-serif",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              padding: "8px 12px",
              maxWidth: "600px",
              width: "auto",
              zIndex: 9999,
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-orange-400 via-orange-400 to-blue-400 text-white rounded-lg p-6 relative overflow-hidden text-left shadow-xl row-span-2 md:col-span-2">
          <div className="relative flex items-center justify-between">
            <div className="lg:ml-4 space-y-2">
              <h2 className="text-lg font-button text-[#FFFFFF]">
                Total Voucher Value
              </h2>
              <h2 className="text-lg font-paragraph text-[#FFFFFF]">
                R {totalValue}
              </h2>
              <h2 className="text-lg lg:text-2xl font-button text-[#FFFFFF]">
                My Balance
              </h2>
              <p className="text-2xl lg:text-6xl font-header text-[#FFFFFF]">
                R {balance}
              </p>
            </div>
            <div className="w-32 h-32 lg:w-60 lg:h-60 rounded-full bg-white bg-opacity-10 flex items-center justify-center lg:mt-8 lg:mr-5">
              <CircularProgress percentage={percentage} />
            </div>
          </div>
        </div>

        {expenses.map((expense, index) => (
          <div
            key={index}
            className="bg-orange-400 opacity-90 text-white rounded-lg p-4 flex flex-col shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-[-20px] right-0">
              <div className="relative">
                <div className="w-40 h-40 bg-orange-600 rounded-full absolute right-[-1.5rem] opacity-15"></div>
                <div className="w-32 h-32 bg-orange-600 rounded-full absolute right-10 top-2 opacity-25"></div>
              </div>
            </div>
            <div className="relative flex justify-between items-center mb-4">
              <div className="w-[3.5rem] h-[3.5rem] bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                {expense.icon}
              </div>
              <div
                className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer"
                data-tooltip-id={`tooltip-${index}`}
                data-tooltip-content={expense.description}
              >
                <MdInfoOutline className="cursor-pointer text-xl" />
              </div>
              <ReactTooltip
                id={`tooltip-${index}`}
                place="top"
                opacity={1}
                style={{
                  backgroundColor: "white",
                  color: "#222",
                  fontFamily: "Montserrat, sans-serif",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  padding: "8px 12px",
                  zIndex: 9999,
                }}
              />
            </div>
            <p className="text-3xl text-left font-semibold text-white">
              {expense.amount ? `R${expense.amount}` : ""}
            </p>
            <p className="text-sm font-medium text-left text-white opacity-75">
              {expense.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthVault;
