import React, { useEffect, useState, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CircularProgressProps {
  percentage: number;
  duration?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  duration = 5100,
}) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!hasAnimated.current) {
      hasAnimated.current = true;

      const animationInterval = setInterval(() => {
        setCurrentPercentage((prev) => {
          if (prev < percentage) {
            return Math.min(prev + 1, percentage);
          } else {
            clearInterval(animationInterval);
            return prev;
          }
        });
      }, duration / percentage);

      return () => clearInterval(animationInterval);
    } else {
      setCurrentPercentage(percentage);
    }
  }, [percentage, duration]);

  return (
    <div className="relative w-32 h-32 lg:w-48 lg:h-48">
      <CircularProgressbar
        value={currentPercentage}
        text={`${currentPercentage}%`}
        background
        backgroundPadding={8}
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
