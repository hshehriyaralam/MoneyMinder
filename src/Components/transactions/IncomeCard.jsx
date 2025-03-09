import React from 'react';
import IncomeVector from "../../assets/images/22229999.png";
import IncomeButton from '../comman/AddButtons.jsx';
import CountUp from "../comman/CountUp.jsx"

const IncomeSection = () => {
  return (
    <div className="bg-transparent rounded-lg p-2 shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 w-[500px] h-70 flex flex-col md:flex-row items-center justify-center">
      {/* Income Details */}
      <div className="flex-1 text-center">
        {/* Income Amount */}
        <h3 className="text-3xl md:text-2xl font-bold text-[#1E3A5F]">Total Income</h3>
        <p className="text-3xl md:text-2xl font-semibold text-green-600 mb-8">
          +$
       <CountUp
        from={0}
        to={3000}
        separator=","
        direction="up"
        duration={1}
        className="inline"
         />
        </p>

        {/* Add Income Button */}
        <div className="flex justify-center">
          <IncomeButton />
        </div>
      </div>

      {/* Image */}
      <img src={IncomeVector} alt="Income-Vector" width={300} className="mt-6 md:mt-0 md:ml-6" />
    </div>
  );
};

export default IncomeSection;