import React, { useState } from "react";

const Toggle = ({ isIncome, setIsIncome }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className={`text-sm font-bold ${isIncome ? "text-teal-500" : "text-gray-300"}`}>
        Income
      </span>
      <button
        onClick={() => setIsIncome(!isIncome)}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
          isIncome ? "bg-[#0D4D66]" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
            isIncome ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
      <span className={`text-sm font-bold ${!isIncome ? "text-teal-500" : "text-gray-300"}`}>
        Expense
      </span>
    </div>
  );
};

export default Toggle;