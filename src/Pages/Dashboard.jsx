import React, { useEffect } from "react";
import BalanceCard from "../Components/transactions/BalnceCard.jsx";
import IncomeCard from "../Components/transactions/IncomeCard.jsx";
import ExpenseCard from '../Components/transactions/ExpenseCard.jsx'
import TransactionHistory from "../Components/transactions/TransactionHistory.jsx";
import useTransactionStore from "@/store/transactions.js";




const Dashboard = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const fetchTransactions = useTransactionStore((state ) => state.fetchTransactions)


  useEffect(() => {
    fetchTransactions();
  },[transactions])

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-2 space-y-6">
       <BalanceCard transactions={transactions} /> 
      <div className="w-full max-w-5xl flex flex-col gap-6 sm:flex-row sm:justify-center sm:gap-6 lg:gap-8">
        <IncomeCard   transactions={transactions}  className="w-full sm:w-1/2 lg:w-1/3" />
        <ExpenseCard  transactions={transactions} className="w-full sm:w-1/2 lg:w-1/3" />
      </div> 
      <TransactionHistory limit={6} Name={'Transactions'} />
    </div>
  );
};

export default Dashboard;
