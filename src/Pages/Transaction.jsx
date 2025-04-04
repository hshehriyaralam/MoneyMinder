import React from 'react'
import TransactionHistory from '@/Components/transactions/TransactionHistory'
const Transaction = () => {
  return (
    <div className='w-full' >
      <TransactionHistory Name={"ALL Transactions"} showDesc={true} limit={'all'} />
    </div>
  )
}

export default Transaction
