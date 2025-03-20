import AnimatedAvatar from '@/Components/comman/AnimateAvtar'
import React, { useContext, useState } from 'react'
import IncomeForm from '@/Components/layout/IncomeForm'
import Switch from '@/Components/UIverse/Toggle'
import SplitText from "../Components/Reactbits/SplitText"
import Toggle from '@/Components/UIverse/Toggle'
import ExpenseForm from '@/Components/layout/ExpenseForm'

const AddTransaction = () => {
  const [isIncome, setIsIncome] = useState(true);
  return (
    <div className='' >
      <div  className='flex flex-col items-center gap-2 md:flex-row   md:justify-between md:mx-24'>
<SplitText
  text="Add Transactions"
  className="text-2xl font-semibold  text-gray-300"
  delay={150}
  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
  easing="easeOutCubic"
  threshold={0.2}
  rootMargin="-50px"
/>
<Toggle isIncome={isIncome} setIsIncome={setIsIncome} />
  </div>
{isIncome ? <IncomeForm /> : <ExpenseForm /> }
       </div>
  )
}

export default AddTransaction
