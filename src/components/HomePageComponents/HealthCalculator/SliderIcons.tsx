import React from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { LiaToothSolid } from "react-icons/lia";
import { PiEyeThin } from "react-icons/pi";
import { GiMedicinePills } from "react-icons/gi";

interface IconListProps {
  gpVisits: number;
  dental: number;
  optometry: number;
  otcMeds: number;
}

export const IconList: React.FC<IconListProps> = ({
  gpVisits,
  dental,
  optometry,
  otcMeds,
}) => {
  const totalCost = gpVisits + dental + optometry + otcMeds;

  return (
    <div className="relative w-64 h-[30rem] bg-orange-400 bg-opacity-60 shadow-lg rounded-3xl p-6 text-center ">
      <h1 className="text-white font-header text-2xl mb-6">
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
      <div className="space-y-2">
        <div className="flex items-center">
          <FaUserDoctor className="text-white text-xl mr-2" />
          <span className="text-white">{gpVisits / 500}: GP Visits</span>
        </div>
        <div className="flex items-center">
          <LiaToothSolid className="text-white text-xl mr-2" />
          <span className="text-white">{dental / 300}: Dentist</span>
        </div>
        <div className="flex items-center">
          <PiEyeThin className="text-white text-xl mr-2" />
          <span className="text-white">{optometry / 200}: Optometrist</span>
        </div>
        <div className="flex items-center">
          <GiMedicinePills className="text-white text-xl mr-2" />
          <span className="text-white">{otcMeds}: OTC</span>
        </div>
      </div>
    </div>
  );
};
