import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useAlert } from "./AlertContext.jsx";


const Context = createContext();


const TransactionContext = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null)
    const { showAlert } = useAlert();
  

 
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/fetch-amounts`, {
        withCredentials : true
      });
      setTransactions(response.data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
    }
  };

  const addTransaction = async (transaction) => {
   try{

    
    if(editTransaction){
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/edit/${editTransaction._id}`, 
      transaction,
      {withCredentials : true}
    )
    const updatedTransaction  = response.data.data;
    setTransactions((prev) => prev.map((t) => t._id === updatedTransaction._id ? updatedTransaction : t ))
    setEditTransaction(null)
    }else{
       const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/add-amount`,transaction, {
      withCredentials : true,
    } )
    const newTransaction = response.data.data
    setTransactions((prev) => [newTransaction , ...prev])
    }
   }catch(error){
    console.error("Error adding transaction:", error.message);
    showAlert('error', "add Amount Failed")
   }
  }


  const removeTransaction = async (id) => {
    try{
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/delete/${id}`, {
        withCredentials : true
      })
      setTransactions((prev) => prev.filter((t) => t._id !== id))
    }catch(error){
      console.error("Error deleting transaction:", error.message)
      alert("Failed to delete transaction")
    }
  }

  useEffect(() => {
    fetchTransactions()
  },[transactions])

  const incomeTransaction = transactions.filter((t) => t.type === "income");
  const expenseTransaction = transactions.filter((t) => t.type === "expense");

  const incomeAmount = incomeTransaction.reduce(
    (total, transaction) => total + Number(transaction.amount),
    0
  );

  const expenseAmount = expenseTransaction.reduce(
    (total, transaction) => total + Number(transaction.amount),
    0
  );

  const BalanceAmount = incomeAmount - expenseAmount;
  const maxValue = transactions.length > 0 ? Math.max(...transactions.map(t => Number(t.amount))) : 0;
  const minValue = transactions.length > 0 ? Math.min(...transactions.map(t => Number(t.amount))) : 0;

  
  const Percentage = transactions.map((t) => {
    if (t.type.toLowerCase() === 'income') {
      return Math.floor((t.amount / incomeAmount) * 100);
    } else if (t.type.toLowerCase() === 'expense') {
      return Math.floor((t.amount / expenseAmount) * 100);
    } else {
      return 0;
    }
  });
  
  // const GetCategories = transactions.map((t) => t.category);
  // const ExpenseCategories = expenseTransaction.map((t) => t.category)
  const ExpenseCategoriesAmount  = expenseTransaction.map((t) => t.amount)

  const expenseSummary = {}
  expenseTransaction.forEach((t) => {
    if(expenseSummary[t.category]){
      expenseSummary[t.category]  += Math.abs(t.amount)
    }else{
      expenseSummary[t.category] = Math.abs(t.amount)

    }
  })

  const IncomeCategoriesAmount = incomeTransaction.map(t => t.amount)
  const IncomeSummary = {}
  incomeTransaction.forEach((t) => {
    if(IncomeSummary[t.category]){
      IncomeSummary[t.category] += Math.abs(t.amount)
    }else{
      IncomeSummary[t.category] = Math.abs(t.amount)
    }
  })




  const ALL = {
    transactions,
    incomeTransaction,
    expenseTransaction,
    addTransaction,
    removeTransaction,
    incomeAmount,
    expenseAmount,
    BalanceAmount,
    editTransaction,
    setEditTransaction,
    maxValue,
    minValue,
    // GetCategories,
    Percentage,
    expenseSummary,
    ExpenseCategoriesAmount,
    IncomeCategoriesAmount,
    IncomeSummary,
  };

  return <Context.Provider value={ALL}>{children}</Context.Provider>;
};

export { Context, TransactionContext };
