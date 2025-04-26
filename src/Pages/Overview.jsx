import React, { useContext } from 'react'
import { TextAnimate } from '@/Components/magicui/text-animate'
import SavingCard from '@/Components/OverviewComponents/SavingCard'
import CategoriesCard from '@/Components/OverviewComponents/CategoriesCard'
import { Context } from '@/Context/TransactionContext'
import IncomeCard from '@/Components/transactions/IncomeCard'
import ExpenseCard from '@/Components/transactions/ExpenseCard'
import CircleProgreesBar from '@/Components/OverviewComponents/CircleProgreesBar'

const Overview = () => {
  const {transactions,Percentage} = useContext(Context)
  const categoryMap  = {};
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
    <div className='min-h-screen w-full flex flex-col   p-4 space-y-6' >
       <TextAnimate
              delay={0.4}
              duration={1.9}
              animation="slideLeft"
              by="character"
              className="text-center text-3xl sm:text-3xl font-lexend font-bold text-[#082244]"
            >
              {"Overview"}
            </TextAnimate>
            <div className='flex flex-row gap-x-4'>
              {/* <IncomeCard /> */}
              {/* <ExpenseCard /> */}
            </div>
            {/* <SavingCard /> */}
            <div  className='flex flex-row flex-wrap flex-wrap gap-x-4 gap-y-4' >

           {categoryWithPercentage.length > 0 ? categoryWithPercentage.map((item, index) => (
             <CategoriesCard
             key={index} 
             category={item.category}
             type={item.type}
             amount={item.amount}
             percentage={item.percentage}
             />
            )) : <p>No transaction history</p>}
            </div>
     

    </div>
  )
}

export default Overview
