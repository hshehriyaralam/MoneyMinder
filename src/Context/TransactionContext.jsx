import { createContext, useDebugValue, useEffect, useState } from "react";

const Context = createContext() 

const TransactionContext = ({children}) =>{

    const getStoreValue = (key, defaultValue) => {
        const storedValue = localStorage.getItem(key)
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    }
    const [incomeAmount,setIncomeAmount] = useState(() => getStoreValue('income',0) )
    const [expenseAmount,setExpenseAmount] = useState(() => getStoreValue('expense', 0))
    const [category, setCategory] = useState(() => getStoreValue ('category', []))

    useEffect(() => {
        localStorage.setItem('income', JSON.stringify(incomeAmount)   )
    },[incomeAmount])


    useEffect(() => {
        localStorage.setItem('expense', JSON.stringify(expenseAmount))
    },[expenseAmount])
    
    useEffect(() => {
        localStorage.setItem('category', JSON.stringify(category))
    },[category])
   const incomeUpdate  = (value) => {
    setIncomeAmount((prev) => prev + Number(value) )
   }
   const ExpenseUpdate  = (value) => {
    setExpenseAmount((prev) => prev + Number(value) )
   }
   const CategoryUpdate = (value) => {
    setCategory((prev) =>  prev + String(value))
   }
   const BalanceAmount = incomeAmount - expenseAmount

   const ALL ={incomeAmount, expenseAmount,incomeUpdate,ExpenseUpdate,BalanceAmount,CategoryUpdate,category}

return(
    <Context.Provider value={ALL}   >
        {children}
    </Context.Provider>
)
}

export {Context, TransactionContext}