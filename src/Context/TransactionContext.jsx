import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useAlert } from "./AlertContext.jsx";


const Context = createContext();

const TransactionContext = ({ children }) => {

  // UI States
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null)
  const [refreshKey, setrefreshKey] = useState(0)
  const { showAlert } = useAlert();
  

  // Triger Function for Refersh  Key
  const triggerTransactionRefresh  = () => {
    setrefreshKey(prev => prev + 1)
  }


  // Tranasctions Get From DB 
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/fetch-amounts`, {
        withCredentials : true,
          headers: {
          'Cache-Control': 'no-cache',
  },
      });
      setTransactions(response.data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
    }
  };

  // Add Transactions in DB
  const addTransaction = async (transaction) => {
   try{
    // Edit tarnsactions Condition
    if(editTransaction){
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/edit/${editTransaction._id}`, 
      transaction,
      {withCredentials : true}
    )
    const updatedTransaction  = response.data.data;
    setTransactions((prev) => prev.map((t) => t._id === updatedTransaction._id ? updatedTransaction : t ))
    setEditTransaction(null)
    }else{
      // Just Add Tranactions
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

  // Delete Transactions
  const removeTransaction = async (id) => {
    try{
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/delete/${id}`, {
        withCredentials : true
      })
      setTransactions((prev) => prev.filter((t) => t._id !== id))
      triggerTransactionRefresh()
    }catch(error){
      console.error("Error deleting transaction:", error.message)
      alert("Failed to delete transaction")
    }
  }

  useEffect(() => {
    fetchTransactions()
  },[refreshKey])

  // Income , Expense , income Amount, expense amounts and Balance  Variables
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


  // Max Amount , Min Amount and create Percentage Both Categories 
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

  
  // Filter expense Caetgories Amount and Expense Summary
  const ExpenseCategoriesAmount  = expenseTransaction.map((t) => t.amount)
  const expenseSummary = {}
  expenseTransaction.forEach((t) => {
    if(expenseSummary[t.category]){
      expenseSummary[t.category]  += Math.abs(t.amount)
    }else{
      expenseSummary[t.category] = Math.abs(t.amount)

    }
  })


  // Filter income Caetgories Amount and incomes Summary
  const IncomeCategoriesAmount = incomeTransaction.map(t => t.amount)
  const IncomeSummary = {}
  incomeTransaction.forEach((t) => {
    if(IncomeSummary[t.category]){
      IncomeSummary[t.category] += Math.abs(t.amount)
    }else{
      IncomeSummary[t.category] = Math.abs(t.amount)
    }
  })

  //Craete Current Month and Year Variable
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  //Filtered Transactions By Months and Years
  const monthlyTransactions = transactions.filter((t) => {
    const tDate = new Date(t.date);
    return tDate.getFullYear() === currentYear && tDate.getMonth() === currentMonth
  })

  // Monthly income and expense transactions
  const monthlyIncomeTransactions = monthlyTransactions.filter((t) => t.type === 'income')
  const monthlyExpenseTransactions = monthlyTransactions.filter((t) => t.type === 'expense')


  // Monthly Totals
  const monthlyIncomes = monthlyIncomeTransactions.reduce(
    (total,t) => total + Number(t.amount), 0
  )
  const monthlyExpenses = monthlyExpenseTransactions.reduce(
    (total,t) => total + Number(t.amount), 0
  )

  const monthlyBalance = monthlyIncomes - monthlyExpenses

// Top Epxnese Categories in Current Months
  const monthlyExpenseSummary = {};
 monthlyExpenseTransactions.forEach((t) => {
  if (monthlyExpenseSummary[t.category]) {
    monthlyExpenseSummary[t.category] += Math.abs(t.amount);
  } else {
    monthlyExpenseSummary[t.category] = Math.abs(t.amount);
  }
});

    let  topExpenseCategories = null;
    let topExpenseAmount = 0;

    for(const category in monthlyExpenseSummary){
      if(monthlyExpenseSummary[category] > topExpenseAmount ){
          topExpenseAmount = monthlyExpenseSummary[category]
          topExpenseCategories = category
      }
    }


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
    setTransactions,
    maxValue,
    minValue,
    Percentage,
    expenseSummary,
    ExpenseCategoriesAmount,
    IncomeCategoriesAmount,
    IncomeSummary,
    monthlyIncomes,
    monthlyExpenses,
    topExpenseCategories,
    topExpenseAmount,
    monthlyBalance,
    triggerTransactionRefresh
  };

  return <Context.Provider value={ALL}>{children}</Context.Provider>;
};

export { Context, TransactionContext };
