import React from 'react';
import IncomeVector from "../../assets/images/22229999.png";
import IncomeButton from '../comman/AddButtons.jsx';
import CountUp from "../comman/CountUp.jsx"
import HyperText from "../magicui/hyper-text"
import AnimatedContent from '../comman/AnimatedContent';
import incomeLogo from "../../assets/images/3588982.png"
const IncomeSection = () => {
  return (
    <div 
    className="bg-transparent   rounded-lg p-2 shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 w-[500px] h-62 flex flex-col md:flex-row md:gap-x-1 items-center justify-center gap-y-2"
    >
      <div className="flex-1 text-center">
        <HyperText> 
            Total Income
        </HyperText>
        <p className="text-3xl md:text-2xl font-semibold text-green-600 mb-4">
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

        <div className="flex justify-center">
          <IncomeButton />
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
        threshold={0.2}>
         <img src={incomeLogo} alt="Income-Vector" width={270} className="mt-2 md:mt-0 md:ml-4" />
      </AnimatedContent>
    </div>
  );
};
export default IncomeSection;
