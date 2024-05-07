import React, { Dispatch, SetStateAction, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const GP_COST_PER_VISIT = 500; // Cost per GP visit
const DENTAL_COST_PER_VISIT = 300; // Cost per dental visit
const OPTOMETRY_COST_PER_VISIT = 200; // Cost per optometry visit
const MAX_GP_VISITS = 5;
const MAX_DENTAL_VISITS = 5;
const MAX_OPTOMETRY_VISITS = 5;

interface HealthCalculatorProps {
  gpVisits: number;
  setGpVisits: Dispatch<SetStateAction<number>>;
  dental: number;
  setDental: Dispatch<SetStateAction<number>>;
  optometry: number;
  setOptometry: Dispatch<SetStateAction<number>>;
  otcMeds: number;
  setOtcMeds: Dispatch<SetStateAction<number>>;
}

export const HealthCalculator: React.FC<HealthCalculatorProps> = ({
  gpVisits,
  setGpVisits,
  dental,
  setDental,
  optometry,
  setOptometry,
  otcMeds,
  setOtcMeds,
}) => {
  return (
    <div className="space-y-4 p-4 text-left">
      <div>
        <h3 className="font-paragraph">GP Visits</h3>
        <div className="flex items-center">
          <Slider
            min={0}
            max={MAX_GP_VISITS * GP_COST_PER_VISIT}
            step={GP_COST_PER_VISIT}
            value={gpVisits}
            onChange={(value) => setGpVisits(value as number)}
            className="flex-1"
            trackStyle={{ backgroundColor: "blue", height: "8px" }}
            handleStyle={{
              borderColor: "blue",
              height: "18px",
              width: "18px",
              marginTop: "-5px",
              backgroundColor: "white",
            }}
            railStyle={{ backgroundColor: "lightgrey", height: "8px" }}
          />
          <div className="w-16 h-10 flex items-center justify-center ml-4 bg-orange-400 text-white rounded">
            {gpVisits / GP_COST_PER_VISIT}
          </div>
        </div>
      </div>
      <div>
        <h3>Dental Consultations</h3>
        <div className="flex items-center">
          <Slider
            min={0}
            max={MAX_DENTAL_VISITS * DENTAL_COST_PER_VISIT}
            step={DENTAL_COST_PER_VISIT}
            value={dental}
            onChange={(value) => setDental(value as number)}
            className="flex-1"
            trackStyle={{ backgroundColor: "blue", height: "8px" }}
            handleStyle={{
              borderColor: "blue",
              height: "18px",
              width: "18px",
              marginTop: "-5px",
              backgroundColor: "white",
            }}
            railStyle={{ backgroundColor: "lightgrey", height: "8px" }}
          />
          <div className="w-16 h-10 flex items-center justify-center ml-4 bg-orange-400 text-white rounded">
            {dental / DENTAL_COST_PER_VISIT}
          </div>
        </div>
      </div>
      <div>
        <h3>Optometry Appointments</h3>
        <div className="flex items-center">
          <Slider
            min={0}
            max={MAX_OPTOMETRY_VISITS * OPTOMETRY_COST_PER_VISIT}
            step={OPTOMETRY_COST_PER_VISIT}
            value={optometry}
            onChange={(value) => setOptometry(value as number)}
            className="flex-1"
            trackStyle={{ backgroundColor: "blue", height: "8px" }}
            handleStyle={{
              borderColor: "blue",
              height: "18px",
              width: "18px",
              marginTop: "-5px",
              backgroundColor: "white",
            }}
            railStyle={{ backgroundColor: "lightgrey", height: "8px" }}
          />
          <div className="w-16 h-10 flex items-center justify-center ml-4 bg-orange-400 text-white rounded">
            {optometry / OPTOMETRY_COST_PER_VISIT}
          </div>
        </div>
      </div>
      <div>
        <h3>OTC Medication</h3>
        <div className="flex items-center">
          <Slider
            defaultValue={otcMeds}
            onChange={(value) => setOtcMeds(value as number)}
            className="flex-1"
            trackStyle={{ backgroundColor: "blue", height: "8px" }}
            handleStyle={{
              borderColor: "blue",
              height: "18px",
              width: "18px",
              marginTop: "-5px",
              backgroundColor: "white",
            }}
            railStyle={{ backgroundColor: "lightgrey", height: "8px" }}
          />
          <div className="w-16 h-10 flex items-center justify-center ml-4 bg-orange-400 text-white rounded">
            R {otcMeds}
          </div>
        </div>
      </div>
    </div>
  );
};
