import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const CategoryCard = ({ category, type, amount, percentage }) => {

  const isIncome = type.toLowerCase() === 'income';

  return (
    <div className="bg-transparent rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 w-full max-w-sm mx-auto flex flex-col items-center space-y-6 backdrop-blur-md">
      <h2 className={`text-2xl font-bold text-center tracking-wide ${isIncome ? 'text-green-400' : 'text-red-400'}`}>
        {type.toUpperCase()}
      </h2>

      <div className="flex w-full justify-between items-center">
        
        <div className="flex flex-col items-start space-y-2">
          <p className="text-gray-200 text-sm font-medium">
            Category: <span className="text-amber-400 font-semibold">{category}</span>
          </p>
          <p className="text-gray-200 text-sm font-medium">
            Amount: <span className={`font-semibold ${isIncome ? 'text-green-300' : 'text-red-300'}`}>${amount}</span>
          </p>
        </div>
        <div className="w-20 h-20">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            strokeWidth={10}
            styles={buildStyles({
              pathColor: isIncome ? '#34d399' : '#f87171', 
              trailColor: '#4b5563', 
              textColor: '#d1d5db', 
              textSize: '16px',
            })}
          />
        </div>

      </div>
    </div>
  );
};

export default CategoryCard;
