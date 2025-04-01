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

  const [incomeTransaction, setIncomeTransaction] = useState(() =>
    getStoredValue("incomeTransaction", [])
  );

  const [expenseTransaction, setExpenseTransaction] = useState(() =>
    getStoredValue("expenseTransaction", [])
  );
  const [editTransaction, setEditTransaction] = useState(null)

  useEffect(() => {
    localStorage.setItem("incomeTransaction", JSON.stringify(incomeTransaction));
  }, [incomeTransaction]);

  useEffect(() => {
    localStorage.setItem("expenseTransaction", JSON.stringify(expenseTransaction));
  }, [expenseTransaction]);

  const addIncomeTransaction = (category, date, time, amount, description) => {
    const newIncome = { id:Date.now(), category, date, time, amount, description, type: "income" };


    if(editTransaction){
      setIncomeTransaction((prev) => prev.map((t) => (t.id === editTransaction.id ? newIncome : t)));

      setEditTransaction(null)
    }else{
      setIncomeTransaction((prev) => [...prev, newIncome ])
    }
  };

  const addExpenseTransaction = (category, date, time, amount, description) => {
    const newExpense = { id:Date.now(),  category, date, time, amount, description, type: "expense" };

    if(editTransaction){
      setExpenseTransaction((prev) => prev.map((t) => (t.id === editTransaction ? newIncome : t)))

      setEditTransaction(null)
    }else{
       setExpenseTransaction((prev) => [...prev, newExpense]);
    }
  };


  const removeTransaction = (id,type) => {
    if(type === "income"){
      setIncomeTransaction((prev) => prev.filter((transaction) => transaction.id !== id ))
    } else if(type === "expense" ) {
      setExpenseTransaction((prev) => prev.filter((transaction) => transaction.id !== id) )
    }
  }

  const incomeAmount = incomeTransaction.reduce(
    (total, transaction) => total + Number(transaction.amount),
    0
  );

  const expenseAmount = expenseTransaction.reduce(
    (total, transaction) => total + Number(transaction.amount),
    0
  );

  const BalanceAmount = incomeAmount - expenseAmount;

  const transactions = [...incomeTransaction, ...expenseTransaction];
  
  const ALL = {
    incomeTransaction,
    expenseTransaction,
    addIncomeTransaction,
    addExpenseTransaction,
    removeTransaction,
    incomeAmount,
    expenseAmount,
    BalanceAmount,
    transactions,
    editTransaction,
    setEditTransaction
  };

  return <Context.Provider value={ALL}>{children}</Context.Provider>;
};

export { Context, TransactionContext };
