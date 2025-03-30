import React, { useContext } from 'react'
import { Context } from '@/Context/TransactionContext'
function TransactionHistory() {
    const {category} = useContext(Context)
  return (
    <div>
      <h1>History</h1>
      <p>Category : {category}</p>
    </div>
  )
}

export default TransactionHistory
