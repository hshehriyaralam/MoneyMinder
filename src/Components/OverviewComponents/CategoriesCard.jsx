import { FaShoppingCart, FaMoneyCheckAlt, FaPiggyBank } from 'react-icons/fa';
import Category from "../../assets/images/3857457.png"

const CategoryCard = ({ category, type, amount, percentage }) => {
  const isIncome = type.toLowerCase() === 'income';

  return (
    <div className='bg-transparent rounded-lg p-1 shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 w-full max-w-lg mx-auto flex  '>
      <div className='flex flex-col gap-1 justify-center items-start mx-10'>
        <p className='text-lg text-gray-300'>Category: <span className='text-black font-semibold'>{category}</span></p>
        <p className='text-lg text-gray-300'>Type: <span className={`${isIncome ? 'text-green-500' : 'text-red-600'} font-semibold`}>{type}</span></p>
        <p className='text-lg text-gray-300'>Amount: <span className={`${isIncome ? 'text-green-500' : 'text-red-600'} font-semibold`}>${amount}</span></p>
        <p className='text-lg text-gray-300 text-start'>Percentage: <span className='text-amber-600 font-semibold'>{percentage}</span></p>
      </div>
      <div className='text-gray-400'>
        <img src={Category}  width={300} alt="" />
      </div>
    </div>
  );
};

export default CategoryCard;
