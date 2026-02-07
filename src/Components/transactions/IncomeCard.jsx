import React, { useMemo } from "react";
import IncomeButton from "../comman/AddButtons.jsx";
import AnimatedContent from "../comman/AnimatedContent.jsx";
import incomeLogo from "/images/3588982.webp";

import { getTotalIncome } from "@/lib/calculations.js";



const IncomeCard =  React.memo(({ transactions,navigation }) => {

  const handleNavigate = () => {
    navigation('/AddTransaction?type=income');
  };
  const totalIncome = useMemo(
    () => getTotalIncome(transactions),
    [transactions],
  );

  return (
    <div className="bg-transparent rounded-lg p-4 shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 w-full md:w-[500px] md:h-62 h-auto flex flex-col md:flex-row md:gap-x-1 items-center justify-center gap-y-4 md:gap-y-2">
      <div className="flex-1 text-center">
        <h1 className="text-[#1f2937] text-[22px] font-bold">Total Income</h1>
        <p className="text-2xl sm:text-3xl md:text-2xl font-semibold text-[#11bb52] mb-4">
          +${totalIncome}
        </p>
        <div className="flex justify-center">
          <IncomeButton
            navigate={handleNavigate}
          />
        </div>
      </div>
      <AnimatedContent
        distance={300}
        direction="vertical"
        reverse={true}
        config={{ tension: 80, friction: 20 }}
        initialOpacity={0.2}
        animateOpacity
        scale={1.1}
        threshold={0.2}
      >
        <img
          src={incomeLogo}
          alt="Income-Vector"
          className="w-48 sm:w-56 md:w-64 mt-2 md:mt-0 md:ml-4"
        />
      </AnimatedContent>
    </div>
  );
})

export default IncomeCard;
