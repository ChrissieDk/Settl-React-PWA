import React from "react";

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        type="button"
        className="flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded"
        disabled
      >
        <svg
          className="animate-spin h-5 w-5 mr-3 text-white"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6h3c0-5.05-4.1-9-9-9zM4.93 6.54l1.42-1.42a8.963 8.963 0 00-1.42 2.91l1.82.76a7.03 7.03 0 011.11-2.25L4.93 6.54zm.82 10.71a8.963 8.963 0 001.42 2.91l1.42-1.42a7.03 7.03 0 01-1.11-2.25l-1.82.76zm9.82 4.13a8.963 8.963 0 002.91-1.42l-1.42-1.42a7.03 7.03 0 01-2.25 1.11l.76 1.82zm3.53-3.53a8.963 8.963 0 001.42-2.91l-1.82-.76a7.03 7.03 0 01-1.11 2.25l1.42 1.42zM12 18v3l4-4-4-4v3c-3.31 0-6-2.69-6-6H3c0 5.05 4.1 9 9 9z"
          />
        </svg>
        Loading...
      </button>
    </div>
  );
};
