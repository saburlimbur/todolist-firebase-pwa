import React from 'react';

function Loaders() {
  return (
    <div className="flex justify-center items-center">
      <svg
        className="animate-spin h-6 w-6 text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          strokeWidth="2"
          stroke="#d1d5db"
          fill="none"
        />
        <path
          d="M4 12a8 8 0 0 1 16 0"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default Loaders;
