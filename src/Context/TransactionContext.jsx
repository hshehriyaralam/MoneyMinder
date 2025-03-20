import { createContext, useState } from "react";

const Context = createContext() 

const TransactionContext = ({children}) =>{
    const [incomeAmount,setIncomeAmount] = useState(0)
    const [expenseAmount,setExpenseAmount] = useState(0)

   const incomeUpdate  = (value) => {
    setIncomeAmount((prev) => prev + Number(value) )
   }
   const ExpenseUpdate  = (value) => {
    setExpenseAmount((prev) => prev + Number(value) )
   }
   const BalanceAmount = incomeAmount - expenseAmount

   const All = {incomeAmount,expenseAmount, incomeUpdate, ExpenseUpdate, BalanceAmount}
return(
    <Context.Provider   value={All} >
        {children}
    </Context.Provider>
)
}

export {Context, TransactionContext}