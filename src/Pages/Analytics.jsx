import React from 'react'
import MontlyBarChart from '../Components/AnaylyticsComponents/BarChart'
import ExpensePieChart from '../Components/AnaylyticsComponents/ExpensePieChart'
import IncomePieChart from '@/Components/AnaylyticsComponents/IncomePieChart'
import SavingLinBar from '@/Components/AnaylyticsComponents/SavingLinBar'

const Analytics = () => {
  return (
    <div  className="w-full min-h-screen p-4 flex flex-col gap-y-3  " >
      <MontlyBarChart />
      <div className='w-full p-5 mx-auto   '>
      <ExpensePieChart />
      </div>
      <div  className="w-full p-2  border-1 rounded-lg border-black  " >
        <SavingLinBar />
      </div>
    </div>
  )
}

export default Analytics
