import { createContext, useEffect, useState } from "react";

const Context = createContext();

const TransactionContext = ({ children }) => {
  const getStoredValue = (key, defaultValue) => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return defaultValue;
    }
  };

  const [transactions, setTransactions] = useState(() =>
    getStoredValue("transactions", [])
  );
  const [editTransaction, setEditTransaction] = useState(null);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    const newTransaction = { 
      ...transaction, 
      id: Date.now(),
      createdAt: new Date().toISOString()
    };

    if(editTransaction) {
      setTransactions(prev => 
        prev.map(t => t.id === editTransaction.id ? newTransaction : t)
      );
      setEditTransaction(null);
    } else {
      setTransactions(prev => [newTransaction, ...prev]); // Newest first
    }
  };

  const removeTransaction = (id) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  };


  const incomeTransaction = transactions.filter(t => t.type === "income");
  const expenseTransaction = transactions.filter(t => t.type === "expense");

  const incomeAmount = incomeTransaction.reduce(
    (total, transaction) => total + Number(transaction.amount),
    0
  );

  const expenseAmount = expenseTransaction.reduce(
    (total, transaction) => total + Number(transaction.amount),
    0
  );

  const BalanceAmount = incomeAmount - expenseAmount;
  const maxValue = transactions.length > 0 ? Math.max(...transactions.map( t => Number(t.amount))) : 0
  const minValue = transactions.length > 0 ? Math.min(...transactions.map( t => Number(t.amount))) : 0
  

  

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
  };

  return <Context.Provider value={ALL}>{children}</Context.Provider>;
};

export { Context, TransactionContext };