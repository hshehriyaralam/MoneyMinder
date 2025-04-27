import React from 'react'
import MontlyBarChart from '../Components/AnaylyticsComponents/BarChart'
import ExpensePieChart from '../Components/AnaylyticsComponents/PieChart'

const Analytics = () => {
  return (
    <div  className="w-full min-h-screen p-4 flex flex-col  " >
      <MontlyBarChart />
      <ExpensePieChart />
    </div>
  )
}

export default Analytics
