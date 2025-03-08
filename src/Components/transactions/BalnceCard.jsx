import React from 'react';
import CashPick1 from "../../assets/images/cash-amount2.png";

const BalanceCard = () => {
  return (
    <div className="bg-transparent rounded-lg p-4 shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 w-full  md:w-4xl h-88 flex flex-col md:flex-row items-center justify-center  ">
      <div className="flex-1 text-center ">
        <h3 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-2">Total Balance</h3>
        <p className="text-4xl md:text-4xl font-semibold text-[#1E3A5F] mb-6">$5,000</p>
        <div className="flex justify-center space-x-6 flex-wrap">
              <div className="text-center">
            <p className="text-lg font-semibold text-green-500">Income</p>
            <p className="text-2xl font-bold text-green-500">+$3,000</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-red-600">Expense</p>
            <p className="text-2xl font-bold text-red-600">-$2,000</p>
          </div>
        </div>
      </div>
      <img src={CashPick1} alt="Balance-Vector" width={500} className="mt-2 md:mt-0 md:ml-6" />
    </div>
  );
};
export default BalanceCard;