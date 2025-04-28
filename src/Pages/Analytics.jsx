import React from 'react'
import MontlyBarChart from '../Components/AnaylyticsComponents/BarChart'
import ExpensePieChart from '../Components/AnaylyticsComponents/ExpensePieChart'
import IncomePieChart from '@/Components/AnaylyticsComponents/IncomePieChart'

const Analytics = () => {
  return (
    <div  className="w-full min-h-screen p-4 flex flex-col gap-y-3  " >
      <MontlyBarChart />
      <div className='w-3xl p-5 mx-auto   '>
      <ExpensePieChart />
      </div>
    </div>
  )
}

export default Analytics
