import React from 'react'
import TransactionHistory from '@/Components/transactions/TransactionHistory'
const Transaction = () => {
  return (
    <div className='w-full p-0 m-0' >
      <TransactionHistory Name={"ALL Transactions"}  limit={'all'}  />
    </div>
  )
}

export default Transaction
