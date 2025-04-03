import React, { useContext } from 'react';
import ExpenseButton from '../comman/ExpenseButton';
import CountUp from "../comman/CountUp.jsx";
import AnimatedContent from '../comman/AnimatedContent';
import expenseLogo from "../../assets/images/9610082-removebg-preview.png";
import { useNavigate } from 'react-router-dom';
import { Context } from '@/Context/TransactionContext';

const ExpenseCard = () => {
  const {expenseAmount} = useContext(Context)
  const Navigate = useNavigate()
  return (
    <AnimatedContent
        distance={300}
        direction="horizontal"
        reverse={false}
        config={{ tension: 80, friction: 20 }}
        initialOpacity={0.2}
        animateOpacity
        scale={1.1}
        threshold={0.2}
      >
    <div className="bg-transparent rounded-lg p-4 shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 w-full md:w-[500px] md:h-62 h-auto flex flex-col md:flex-row md:gap-x-1 items-center justify-center gap-y-4 md:gap-y-2">
      <div className="flex-1 text-center">
        <h1 className="text-[#0c2e5e] text-[22px] font-bold">Total Expense</h1>
        <p className="text-2xl sm:text-3xl md:text-2xl font-semibold text-red-600 mb-4">
          -$
          <CountUp
            from={0}
            to={`${expenseAmount}`}
            separator="," 
            direction="up"
            duration={1}
            className="inline text-red-600" 
          />
        </p>
        <div className="flex justify-center">
          <ExpenseButton  Navigate={() => Navigate('/AddTransaction?type=expense')} />
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
        <img src={expenseLogo} alt="Expense-Vector" className="w-48 sm:w-56 md:w-56 mt-2 md:mt-0 md:ml-4" />
      </AnimatedContent>
    </div>
    </AnimatedContent>
  );
};

export default ExpenseCard;