import React from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react';

const RecentTransaction = React.memo(({transactions}) => {
  return (
      <div className="px-6 pb-6  ">
          <h2 className="text-[#1f2937] text-[24px]   font-bold mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {transactions.slice(0,4).map((txn) => (
              <div
                key={txn._id}
                className={`p-4 rounded-lg flex justify-between items-center ${txn.type === 'income' ? 'bg-green-50' : 'bg-red-50'} shadow-sm hover:shadow-md transition`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${txn.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {txn.type === 'income' ? (
                      <ArrowUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-md font-medium">{txn.category}</p>
                    <p className="text-sm text-gray-500">{txn.date}</p>
                  </div>
                </div>
                <p className={`text-lg font-bold ${txn.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {txn.type === 'income' ? '+' : '-'}${Math.abs(txn.amount).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
  )
})

export default RecentTransaction
