import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../loadingAnimation.json";

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie animationData={loadingAnimation} loop className="h-10 w-10" />
      Loading...
    </div>
  );
};
