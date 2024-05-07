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
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="w-64 h-[30rem] bg-orange-400 bg-opacity-60 shadow-lg rounded-3xl relative">
        <h1 className="text-white font-header text-2xl pt-8">
          Your Plan Value Is:{" "}
        </h1>
        <svg
          className="absolute top-[3rem] left-1/2 transform -translate-x-1/2"
          width="200"
          height="200"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="70" fill="#1181A1" />
          <text
            fill="#ffffff"
            fontSize="30"
            fontFamily="Roboto"
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
          >
            R{totalCost}
          </text>
        </svg>
        <h2 className="absolute top-[14.5rem] left-1/2 transform -translate-x-1/2 text-white font-header text-2xl w-full text-left ml-5">
          You can visit:
        </h2>
        <div className="absolute top-[17rem] space-y-2 text-left ml-5">
          <div className="flex items-center">
            <FaUserDoctor className="text-white text-xl mr-2" />
            <span className="text-white">{gpVisits / 500}: GP Visits </span>
          </div>
          <div className="flex items-center">
            <LiaToothSolid className="text-white text-xl mr-2" />
            <span className="text-white"> {dental / 300}: Dentist</span>
          </div>
          <div className="flex items-center">
            <PiEyeThin className="text-white text-xl mr-2" />
            <span className="text-white"> {optometry / 200}: Optometrist</span>
          </div>
          <div className="flex items-center">
            <GiMedicinePills className="text-white text-xl mr-2" />
            <span className="text-white">{otcMeds}: OTC </span>
          </div>
        </div>
      </div>
    </div>
  );
};
