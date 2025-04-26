import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import { Context } from '@/Context/TransactionContext';
import { useContext } from 'react';
import { redirect } from 'react-router-dom';

const CategoryCard = ({ category, type, amount, percentage }) => {
  const {Percentage} = useContext(Context)
  const isIncome = type.toLowerCase() === 'income';

  return (
    <div className='bg-transparent rounded-lg  p-4 shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] px-10 transition-all duration-300 w-full max-w-sm mx-auto flex flex-col items-center py-5'>
      <h2 className={`text-xl font-bold text-center mb-4  ${type === "income" ? "text-green-500" : "text-red-700"}`}>
        {type.toUpperCase()}
      </h2>

      <div className="flex w-full justify-between items-center   ">
        
        {/* Left side: Name and Category */}
        <div className="flex flex-col items-start space-y-1">
          <p className="text-md  font-semibold text-black font-medium">Category: {category}</p>
          <p className="text-md font-semibold text-black">Amount: {amount}</p>
        </div>

        {/* Right side: Circle bar placeholder */}
        <div className='w-24  text-red-900 ' >
         <CircularProgressbar  strokeWidth={12}   value={percentage} text={`${percentage}%`} />
        </div>

      </div>

    </div>
  );
};

export default CategoryCard;
