import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CategoryCard = React.memo(({ category, type, amount, percentage }) => {

  const isIncome = type.toLowerCase() === 'income';

  return (
    <div className="bg-transparent rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 w-full max-w-sm mx-auto flex flex-col items-center space-y-6 backdrop-blur-md">
      <h2 className={`text-2xl font-bold text-center tracking-wide ${isIncome ? 'text-[#11bb52]' : 'text-[#e70c0c]'}`}>
        {type.toUpperCase()}
      </h2>

      <div className="flex w-full justify-between items-center">
        
        <div className="flex flex-col items-start space-y-2">
          <p className="text-[#1f2937] text-sm font-medium">
            Category : <span className="text-[#FF9900]   font-semibold">{category}</span>
          </p>
          <p className="text-[#1f2937] text-sm font-medium">
            Amount: <span className={`font-semibold ${isIncome ? 'text-[#11bb52]' : 'text-[#e70c0c]'}`}>${amount}</span>
          </p>
        </div>
        <div className="w-20 h-20">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            strokeWidth={10}
            styles={buildStyles({
              pathColor: isIncome ? '#11bb52' : '#e70c0c', 
              trailColor: '#4b5561', 
              textColor: 'black', 
              textSize: '18px',
            })}
          />
        </div>

      </div>
    </div>
  );
})

export default CategoryCard;
