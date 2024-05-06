import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export const HealthCalculator = () => {
  const [gpVisits, setGpVisits] = useState<number>(0);
  const [dental, setDental] = useState<number>(0);
  const [optometry, setOptometry] = useState<number>(0);
  const [otcMeds, setOtcMeds] = useState<number>(0);

  return (
    <div className="space-y-4 p-4 text-left">
      <div>
        <h3>GP Visits</h3>
        <div className="flex items-center">
          <Slider
            defaultValue={gpVisits}
            onChange={(value) => setGpVisits(value as number)}
            className="flex-1"
          />
          <div className="w-16 h-10 flex items-center justify-center ml-4 bg-orange-400 text-white rounded">
            {gpVisits}
          </div>
        </div>
      </div>
      <div>
        <h3>Dental Consultations</h3>
        <div className="flex items-center">
          <Slider
            defaultValue={dental}
            onChange={(value) => setDental(value as number)}
            className="flex-1"
          />
          <div className="w-16 h-10 flex items-center justify-center ml-4 bg-orange-400 text-white rounded">
            {dental}
          </div>
        </div>
      </div>
      <div>
        <h3>Optometry Appointments</h3>
        <div className="flex items-center">
          <Slider
            defaultValue={optometry}
            onChange={(value) => setOptometry(value as number)}
            className="flex-1"
          />
          <div className="w-16 h-10 flex items-center justify-center ml-4 bg-orange-400 text-white rounded">
            {optometry}
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
          />
          <div className="w-16 h-10 flex items-center justify-center ml-4 bg-orange-400 text-white rounded">
            {otcMeds}
          </div>
        </div>
      </div>
    </div>
  );
};
