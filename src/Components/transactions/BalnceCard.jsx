import React, {  useMemo } from "react";
import CashPick1 from "/images/cash-amount2.webp";
import AnimatedContent from "../comman/AnimatedContent.jsx";
import TrueFocus from "../comman/TrueFocus.jsx";
import CountUp from "../comman/CountUp.jsx";
import SplitText from "../Reactbits/SplitText.jsx";
import { getTotalExpense, getTotalIncome } from "@/lib/calculations.js";

const BalanceCard = ({ transactions }) => {


  // total income
  const totalIncome = useMemo(
    () => getTotalIncome(transactions),
    [transactions],
  );

  // total expense
  const totalExpense = useMemo(
    () => getTotalExpense(transactions),
    [transactions],
  );

  // Balance
  const BalanceAmount = useMemo(() => {
    return totalIncome - totalExpense;
  }, [totalIncome, totalExpense]);

  return (
    <div className="bg-transparent rounded-lg p-4 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]  transition-all duration-300 w-full max-w-lg md:max-w-4xl mx-auto h-auto flex flex-col md:flex-row items-center justify-center">
      <div className="flex-1 text-center w-full">
        <TrueFocus
          sentence="Total Balance"
          manualMode={false}
          blurAmount={5}
          borderColor="green"
          animationDuration={1}
          pauseBetweenAnimations={1}
        />
        <div className="flex justify-center items-center my-2">
          <SplitText
            text={`$${BalanceAmount}`}
            className=" text-3xl md:text-[26px] font-lexend font-bold text-[#1f2937]"
            delay={150}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />
        </div>
        <div className="flex justify-center space-x-4 md:space-x-8 flex-wrap w-full">
          <div className="text-center w-1/2 md:w-auto">
            <p className="text-lg font-semibold text-[#11bb52]">Income</p>
            <p className="text-xl md:text-2xl font-bold text-[#11bb52]">
              +$
              <CountUp
                from={0}
                to={`${totalIncome}`}
                separator=","
                direction="up"
                duration={1}
                className="inline"
              />
            </p>
          </div>
          <div className="text-center w-1/2 md:w-auto">
            <p className="text-lg font-semibold text-[#e70c0c]">Expense</p>
            <p className="text-xl md:text-2xl font-bold text-[#e70c0c]">
              -$
              <CountUp
                from={0}
                to={`${totalExpense}`}
                separator=","
                direction="up"
                duration={1}
                className="inline"
              />
            </p>
          </div>
        </div>
      </div>
      <AnimatedContent
        distance={200}
        direction="horizontal"
        reverse={false}
        config={{ tension: 80, friction: 40 }}
        initialOpacity={0.2}
        animateOpacity
        scale={1.1}
        threshold={0.2}
      >
        <img
          src={CashPick1}
          alt="Balance-Vector"
          className="w-48 md:w-[500px] max-w-full h-auto mt-2 md:mt-0 md:ml-6"
        />
      </AnimatedContent>
    </div>
  );
};

export default BalanceCard;
