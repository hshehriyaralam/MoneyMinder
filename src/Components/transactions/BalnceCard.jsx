import React from 'react';
import BlurText from "../comman/BlurText.jsx";
import CashPick1 from "../../assets/images/cash-amount2.png";
import AnimatedContent from '../comman/AnimatedContent';
import TrueFocus from "../comman/TrueFocus.jsx"
import CountUp from "../comman/CountUp.jsx"
import Income from "../../assets/images/income1.png"

const BalanceCard = () => {
  return (
    <div className="bg-transparent rounded-lg p-4 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 w-full max-w-lg md:max-w-4xl mx-auto h-auto flex flex-col md:flex-row items-center justify-center">
      <div className="flex-1 text-center w-full">
        <TrueFocus
          sentence="Total Balance"
          manualMode={false}
          blurAmount={5}
          borderColor="green"
          animationDuration={1}
          pauseBetweenAnimations={1}/>
        <div className="flex justify-center items-center">
          <BlurText
            text="$5,000"
            delay={150}
            animateBy="words"
            direction="right"
            className="text-3xl md:text-4xl font-semibold text-[#1E3A5F] mb-4 md:mb-6 text-center"
          />
        </div>
        <div className="flex justify-center space-x-4 md:space-x-8 flex-wrap w-full">
          <div className="text-center w-1/2 md:w-auto">
            <p className="text-lg font-semibold text-green-500">Income</p>
            <p className="text-xl md:text-2xl font-bold text-green-500">
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
          </div>
          <div className="text-center w-1/2 md:w-auto">
            <p className="text-lg font-semibold text-red-600">Expense</p>
            <p className="text-xl md:text-2xl font-bold text-red-600">
              -$
              <CountUp
                from={0}
                to={2000}
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
        threshold={0.2}>
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
