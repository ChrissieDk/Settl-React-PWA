import React, { Dispatch, SetStateAction, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FiChevronDown } from "react-icons/fi"; // Import the arrow icon

const SERVICE_COSTS = {
  GP: {
    Consultation: 450,
  },
  Dental: {
    Filling: 430,
    Extraction: 164,
  },
  Optometry: {
    "Spectacle Frame": 583,
    "Single lens": 227,
    "Bifocal lens": 444,
    Multifocal: 488,
  },
};

const MAX_VISITS = 5;

interface HealthCalculatorProps {
  otcMeds: number;
  setOtcMeds: Dispatch<SetStateAction<number>>;
  gpVisits: Record<string, number>;
  setGpVisits: Dispatch<SetStateAction<Record<string, number>>>;
  dentalVisits: Record<string, number>;
  setDentalVisits: Dispatch<SetStateAction<Record<string, number>>>;
  optometryVisits: Record<string, number>;
  setOptometryVisits: Dispatch<SetStateAction<Record<string, number>>>;
}

export const HealthCalculator: React.FC<HealthCalculatorProps> = ({
  otcMeds,
  setOtcMeds,
  gpVisits,
  setGpVisits,
  dentalVisits,
  setDentalVisits,
  optometryVisits,
  setOptometryVisits,
}) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const providers = {
    GP: {
      services: Object.entries(SERVICE_COSTS.GP).map(([label, cost]) => ({
        label,
        value: gpVisits[label] || 0,
        setValue: (val: number) =>
          setGpVisits((prev) => ({ ...prev, [label]: val })),
        costPerVisit: cost,
        maxVisits: MAX_VISITS,
      })),
    },
    Dental: {
      services: Object.entries(SERVICE_COSTS.Dental).map(([label, cost]) => ({
        label,
        value: dentalVisits[label] || 0,
        setValue: (val: number) =>
          setDentalVisits((prev) => ({ ...prev, [label]: val })),
        costPerVisit: cost,
        maxVisits: MAX_VISITS,
      })),
    },
    Optometry: {
      services: Object.entries(SERVICE_COSTS.Optometry).map(
        ([label, cost]) => ({
          label,
          value: optometryVisits[label] || 0,
          setValue: (val: number) =>
            setOptometryVisits((prev) => ({ ...prev, [label]: val })),
          costPerVisit: cost,
          maxVisits: MAX_VISITS,
        })
      ),
    },
  };

  return (
    <div className="space-y-4 p-4 text-left border rounded-lg shadow-md bg-white">
      <div className="grid gap-4">
        {Object.entries(providers).map(([provider, { services }]) => (
          <div
            key={provider}
            className="p-4 border border-gray-400 rounded-lg bg-gray-100"
          >
            {/* Header Section */}
            <div
              className="cursor-pointer flex justify-between items-center"
              onClick={() =>
                setExpanded((prev) => ({
                  ...prev,
                  [provider]: !prev[provider],
                }))
              }
              aria-expanded={expanded[provider]}
            >
              <h3 className="text-lg font-semibold">{provider}</h3>
              <FiChevronDown
                className={`text-xl transition-transform duration-300 ${
                  expanded[provider] ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            {/* Expanding Section with Smooth Animation */}
            <div
              className={`transition-all duration-500 overflow-hidden ${
                expanded[provider]
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-4 mt-2">
                {services.map((service) => (
                  <div
                    key={service.label}
                    className="p-4 border rounded-lg bg-gray-50"
                  >
                    <h3 className="text-sm sm:text-base font-medium">
                      {service.label}
                    </h3>
                    <div className="flex items-center">
                      <Slider
                        min={0}
                        max={service.maxVisits * service.costPerVisit}
                        step={service.costPerVisit}
                        value={service.value}
                        onChange={(val) => service.setValue(val as number)}
                      />
                      <div className="w-12 sm:w-16 h-8 sm:h-10 flex items-center justify-center ml-2 sm:ml-4 bg-orange-400 text-white rounded text-sm sm:text-base">
                        {service.value / service.costPerVisit}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Service cost: R{service.costPerVisit.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* OTC Medication */}
        <div className="p-4 border border-gray-400 rounded-lg bg-gray-50">
          <h3 className="text-sm sm:text-base font-medium">OTC Medication</h3>
          <div className="flex items-center">
            <Slider
              min={0}
              max={1000}
              step={50}
              value={otcMeds}
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
            <div className="w-12 sm:w-16 h-8 sm:h-10 flex items-center justify-center ml-2 sm:ml-4 bg-orange-400 text-white rounded text-sm sm:text-base">
              R {otcMeds}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
