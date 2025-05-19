import React from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { LiaToothSolid } from "react-icons/lia";
import { PiEyeThin } from "react-icons/pi";
import { GiMedicinePills } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

interface IconListProps {
  gpVisits: number;
  dental: number;
  optometry: number;
  otcMeds: number;
  onInterestClick?: (totalCost: number) => void;
}

export const IconList: React.FC<IconListProps> = ({
  gpVisits,
  dental,
  optometry,
  otcMeds,
  onInterestClick,
}) => {
  const totalCost = gpVisits + dental + optometry + otcMeds;
  const navigate = useNavigate();

  const handleInterestClick = () => {
    // Store totalCost in localStorage
    localStorage.setItem("totalCost", totalCost.toString());
    // Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="relative w-64 h-[30rem] bg-orange-400 bg-opacity-90 shadow-lg rounded-3xl p-6 text-center flex flex-col">
      <h1 className="text-white font-header text-2xl mb-2">
        Your Plan Value Is:
      </h1>
      <div className="flex justify-center mb-4">
        <svg
          width="140"
          height="140"
          viewBox="0 0 200 200"
          className="text-center"
        >
          <circle cx="100" cy="100" r="100" fill="#1181A1" />
          <text
            fill="#ffffff"
            fontSize="50"
            fontFamily="Roboto"
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
          >
            R{totalCost}
          </text>
        </svg>
      </div>
      <h2 className="text-white font-header text-xl mb-4">You can visit:</h2>
      <div className="space-y-2 flex-1">
        <div className="flex items-center">
          <FaUserDoctor className="text-white text-xl mr-2" />
          <span className="text-white">
            {Math.round(gpVisits / 500)}: GP Visits
          </span>
        </div>
        <div className="flex items-center">
          <LiaToothSolid className="text-white text-xl mr-2" />
          <span className="text-white">
            {Math.round(dental / 1000)}: Dentist
          </span>
        </div>
        <div className="flex items-center">
          <PiEyeThin className="text-white text-xl mr-2" />
          <span className="text-white">
            {Math.round(optometry / 1200)}: Optometrist
          </span>
        </div>
        <div className="flex items-center">
          <GiMedicinePills className="text-white text-xl mr-2" />
          <span className="text-white">{otcMeds}: OTC</span>
        </div>
      </div>

      {/* I'M INTERESTED Button */}
      <button
        onClick={handleInterestClick}
        className="mt-2 w-full bg-gray-500 text-white hover:bg-transparent hover:border-black hover:text-black active:transparent active:scale-95 transition duration-200 ease-in-out p-2 border shadow-md rounded-xl font-button"
      >
        I'M INTERESTED
      </button>
    </div>
  );
};
