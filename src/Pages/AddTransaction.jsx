import AnimatedAvatar from '@/Components/comman/AnimateAvtar'
import React, { useContext, useEffect, useState } from 'react'
import IncomeForm from '@/Components/layout/IncomeForm'
import Switch from '@/Components/UIverse/Toggle'
import SplitText from "../Components/Reactbits/SplitText"
import Toggle from '@/Components/UIverse/Toggle'
import ExpenseForm from '@/Components/layout/ExpenseForm'
import { useSearchParams} from 'react-router-dom'

const AddTransaction = () => {
  const [searchParams,setSearchParams] = useSearchParams()
  const type = searchParams.get('type')
  const [isIncome, setIsIncome] = useState(type !== 'expense' );



  const handleToggle = (value) => {
    setIsIncome(value)
    setSearchParams({type : value ? 'income' : 'expense'})
  }
  return (
    <div className='' >
      <div  className='flex flex-col items-center gap-2 md:flex-row   md:justify-between md:mx-48'>
<SplitText
  text="Add Transactions"
  className="text-[27px] font-semibold  text-gray-300"
  delay={150}
  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
  easing="easeOutCubic"
  threshold={0.2}
  rootMargin="-50px"
/>
<Toggle isIncome={isIncome} setIsIncome={handleToggle} />
  </div>
{isIncome ? <IncomeForm /> : <ExpenseForm /> }
  </div>
  )
}

export default AddTransaction