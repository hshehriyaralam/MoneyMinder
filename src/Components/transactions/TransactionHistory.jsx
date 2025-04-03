import React, { useContext } from 'react'
import { Context } from '@/Context/TransactionContext'
import { useNavigate } from 'react-router-dom'
function TransactionHistory() {
  const Navigate = useNavigate()
    const {transactions,removeTransaction,setEditTransaction} = useContext(Context)
  return (
    <div className='w-full' >
      <h1>History</h1>
      <div className='py-2 px-6  border border-gray-500 flex   '>
        <ul className='flex gap-x-10 px-10' >
        <li>Amount</li>
        <li>Category</li>
        <li>Date</li>
        <li>Time</li>
        <li>Description</li>
        <li>Type</li>
        </ul>
        <div className='flex text-sm' >
          <button>Update</button>
          <button>Delete</button>
        </div>
      </div>
      <ul  className='mx-18'>
      {transactions.map((item) => (
        <li key={item.id}  className={item.type === "income" ? "text-green-500" :  "text-red-500"} >
          {item.amount} - {item.category} - {item.date} - {item.time} - {item.description} - {item.type}

          <button className='text-black mx-10' onClick={() => removeTransaction(item.id,item.type)}  >Delete</button>
          <button
          onClick={() => { setEditTransaction(item);
            Navigate(`/AddTransaction?type=${item.type}`);
            }
           }
          className='text-black-900' >
            Update
          </button>
        </li>
          
          
          
          
        ))}
        </ul>
    </div>
  )
}

export default TransactionHistory
