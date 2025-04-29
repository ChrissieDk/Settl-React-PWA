import React from "react";
import { IoCloseSharp } from "react-icons/io5";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  serviceType: "gp" | "dentist" | string;
}

interface PatientDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: {
    id: string;
    name: string;
    surname: string;
    email?: string;
    phone?: string;
    address?: string;
    transactions: Transaction[];
  } | null;
}

const PatientDetail: React.FC<PatientDetailModalProps> = ({
  isOpen,
  onClose,
  patient,
}) => {
  if (!isOpen || !patient) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md mx-4 h-[80vh] flex flex-col shadow-xl z-50 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b shrink-0">
          <div>
            <h2 className="text-xl font-semibold">Billing history</h2>
            <p className="text-sm text-gray-500">
              View your billing history below
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <IoCloseSharp size={24} />
          </button>
        </div>

        {/* Patient Info Card */}
        <div className="p-4 shrink-0">
          <div className="bg-gray-50 rounded-xl p-4 shadow-sm space-y-3">
            <h3 className="text-base font-semibold text-gray-800">
              Patient information
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium">
                  {patient.name} {patient.surname}
                </p>
              </div>
              {patient.phone && (
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="font-medium">{patient.phone}</p>
                </div>
              )}
              {patient.email && (
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium truncate">{patient.email}</p>
                </div>
              )}
              {patient.address && (
                <div className="col-span-2">
                  <p className="text-gray-500">Address</p>
                  <p className="font-medium">{patient.address}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Transaction History */}
        <div className="px-4 pb-4 overflow-y-auto flex-grow">
          <div className="bg-gray-50 rounded-xl shadow-sm p-4 h-full">
            <h3 className="text-base font-semibold mb-4 text-gray-800">
              Transaction history
            </h3>

            {patient.transactions.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {patient.transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="py-3 flex justify-between items-start"
                  >
                    <div className="text-sm text-gray-700">
                      <p className="text-gray-500">{transaction.date}</p>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="capitalize text-gray-500">
                        {transaction.serviceType}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-800">
                        R{transaction.amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                No transaction history available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
