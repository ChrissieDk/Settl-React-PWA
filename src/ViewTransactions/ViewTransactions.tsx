import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { Transaction } from "../types/Types";
import { TransactionModalProps } from "../types/Types";

const ViewTransactions: React.FC<TransactionModalProps> = ({
  isOpen,
  transactions,
  onClose,
}) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-hidden shadow mx-2">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-2xl font-semibold">Detailed Transactions</h2>
          <button onClick={onClose} className="text-lg font-semibold">
            <MdClose size={25} />
          </button>
        </div>
        <div className="overflow-auto h-[70vh]">
          <ul className="divide-y divide-gray-200 px-2">
            {transactions.map((transaction) => (
              <li
                key={transaction.id}
                className="bg-gray-50 rounded my-2 shadow"
              >
                <div
                  className="cursor-pointer p-4 flex justify-between items-center hover:bg-gray-100"
                  onClick={() => toggleExpand(transaction.id)}
                >
                  <span className="font-medium">
                    {transaction.date} - Record {transaction.id}
                  </span>
                  <span className="text-gray-500">
                    {expandedId === transaction.id ? (
                      <FaArrowUp />
                    ) : (
                      <FaArrowDown />
                    )}
                  </span>
                </div>
                {expandedId === transaction.id && (
                  <div className="text-left border-t p-4">
                    <p>
                      <strong>Type:</strong> {transaction.type}
                    </p>
                    <p>
                      <strong>Amount:</strong> R {transaction.amount}
                    </p>
                    <p>
                      <strong>Status:</strong> {transaction.status}
                    </p>
                    <p>
                      <strong>Service:</strong> {transaction.service}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewTransactions;
