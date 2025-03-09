import BalnceCard from '@/Components/transactions/BalnceCard'
import ExpenseCard from '@/Components/transactions/ExpenseCard'
import IncomeCard from '@/Components/transactions/IncomeCard'
import React from 'react'


const Dashboard = () => {
 
  return (
    <div className='min-h-screen flex flex-col justify-center items-center p-4 space-y-8 '>
        <BalnceCard />
        <div className='flex'>
          <IncomeCard />
          {/* <ExpenseCard /> */}

        </div>
    </div>
  )
}

export default Dashboard
