import React from "react";
import { FaArrowRight } from "react-icons/fa6";

// TypeScript interface for the patient data
interface PatientData {
  id: string;
  name: string;
  lastService: {
    type: "gp" | "dentist" | string;
    date: string;
  };
  amount: number;
}

interface PatientBlockProps {
  patient: PatientData;
  onViewDetails: (patientId: string) => void;
}

const PatientBlock: React.FC<PatientBlockProps> = ({
  patient,
  onViewDetails,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between h-48 w-64 hover:bg-gray-50 transition-colors">
      <div>
        <h3 className="font-medium text-gray-900 text-lg mb-2 truncate">
          {patient.name}
        </h3>
        <div className="text-sm text-gray-500">
          <div className="flex items-center mb-1">
            <span className="capitalize font-medium">Last Service:</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="capitalize">{patient.lastService.type}</span>
            <span className="mx-2">•</span>
            <span>{patient.lastService.date}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <span className="font-medium text-gray-900">
          ${patient.amount.toFixed(2)}
        </span>
        <button
          onClick={() => onViewDetails(patient.id)}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          aria-label="View patient details"
        >
          <FaArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default PatientBlock;
