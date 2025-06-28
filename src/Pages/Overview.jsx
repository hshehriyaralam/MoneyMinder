import React, { useContext } from 'react';
import { TextAnimate } from '../Components/magicui/text-animate';
import SavingCard from '../Components/OverviewComponents/SavingCard';
import CategoriesCard from '../Components/OverviewComponents/CategoriesCard';
import { Context } from '../Context/TransactionContext.jsx';

const Overview = () => {
  const { transactions } = useContext(Context);

  const categoryMap = {};
  transactions.forEach((t) => {
    const key = `${t.category}-${t.type}`;
    if (!categoryMap[key]) {
      categoryMap[key] = 0;
    }
    categoryMap[key] += Number(t.amount);
  });

  const categoryWithPercentage = Object.entries(categoryMap).map(([key, totalAmount]) => {
    const [category, type] = key.split('-');
    const totalBase = type === 'income'
      ? transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0)
      : transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0);

    const percentage = totalBase > 0 ? Math.round((totalAmount / totalBase) * 100) : 0;

    return { category, type, amount: totalAmount, percentage: `${percentage}` };
  });

  return (
    <div className="min-h-screen w-full flex flex-col p-6 md:p-10 bg-transparent space-y-4 mb-5">
      <TextAnimate
        delay={0.4}
        duration={1.9}
        animation="slideLeft"
        by="character"
        className="text-center text-4xl  font-lexend font-bold text-[#2d5385]"
      >
        {"Overview"}
      </TextAnimate>
      <div className="w-full flex justify-center">
        <SavingCard />
      </div>
      <div className="w-full flex flex-wrap gap-6 ">
  {categoryWithPercentage.length > 0 ? (
    categoryWithPercentage.map((item, index) => (
      <div key={index} className="flex-1 min-w-[250px] max-w-[400px]">
        <CategoriesCard
          category={item.category}
          type={item.type}
          amount={item.amount}
          percentage={item.percentage}
        />
      </div>
    ))
  ) : (
    <p className="text-center w-full text-[#2d5385]">No transaction history.</p>
  )}
</div>


    </div>
  );
};

export default Overview;
