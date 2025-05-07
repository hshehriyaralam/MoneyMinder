import React, { useContext } from 'react';
import { Context } from '@/Context/TransactionContext.jsx';
import CountUp from "../comman/CountUp.jsx"; 

const SavingCard = () => {
  const { incomeAmount, expenseAmount, BalanceAmount } = useContext(Context);

  return (
    <div className="bg-transparent rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 w-full max-w-3xl mx-auto flex flex-col items-center space-y-6 backdrop-blur-md mb-10">

      <h1 className="md:text-3xl text-3xl font-bold text-center text-[#1f2937] tracking-wide">Saving Summary</h1>
      <div className="flex w-full justify-around items-center text-center mt-2">
        <div className="flex flex-col space-y-2  shadow-md p-3  rounded-xl">
          <p className="text-[#1f2937] text-[14px] font-semibold">Total Income</p>
          <h2 className="text-[#11bb52] text-[20px] font-bold">
            <CountUp  from={0}
                to={`${incomeAmount}`}
                separator=","
                direction="up"
                duration={1}
                className="inline" />
          </h2>
        </div>

        <div className="flex flex-col space-y-2 shadow-md p-3   rounded-xl">
          <p className="text-[#1f2937] text-[14px] font-semibold">Total Expense</p>
          <h2 className="text-[#e70c0c] text-[20px] font-bold">
            <CountUp
            from={0}
            to={`${expenseAmount}`}
                separator=","
                direction="up"
                duration={1}
                className="inline" />
          </h2>
        </div>

        <div className="flex flex-col space-y-2 shadow-md p-3   rounded-xl ">
          <p className="text-[#1f2937] text-[14px] font-semibold">Total Saving</p>
          <h2 className="text-[#FF9900] text-[20px] font-bold">
            <CountUp
            from={0}
            to={`${BalanceAmount}`}
                separator=","
                direction="up"
                duration={1}
                className="inline" />
          </h2>
        </div>

      </div>
    </div>
  );
};

export default SavingCard;
