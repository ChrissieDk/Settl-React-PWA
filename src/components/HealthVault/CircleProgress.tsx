import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CircularProgressProps {
  percentage: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
  return (
    <div className="relative w-32 h-32">
      {/* <svg width="0" height="0">
        <defs>
          <linearGradient id="gradientColors" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#66B2C2" />
            <stop offset="45%" stopColor="#338FAD" />
            <stop offset="100%" stopColor="#0B809A" />
          </linearGradient>
        </defs>
      </svg> */}
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        background
        backgroundPadding={6}
        styles={buildStyles({
          pathColor: `white`,
          textColor: "#fff",
          trailColor: "transparent",
          backgroundColor: "#0B809A",
        })}
      />
    </div>
  );
};

export default CircularProgress;
