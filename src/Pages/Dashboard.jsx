import React, { useEffect , lazy, Suspense, useState } from "react";
import BalanceCard from "../Components/transactions/BalnceCard.jsx";
import useTransactionStore from "@/store/transactions.js";
import IncomeCard from "@/Components/transactions/IncomeCard.jsx";
import ExpenseCard from "@/Components/transactions/ExpenseCard.jsx";
import { useLoggedInUser }from "@/hooks/loggedInUser.js";

const TransactionHistory = lazy(() => import("../Components/transactions/TransactionHistory.jsx"));




const Dashboard = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const fetchTransactions = useTransactionStore((state ) => state.fetchTransactions)
  const {  fetchUser , navigateToAddTransaction} = useLoggedInUser();

  



  useEffect(() => {
    fetchUser()
    fetchTransactions();
  }, []);




  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center lg:p-2 p-6  space-y-6">
       <BalanceCard transactions={transactions} /> 
      <div className="w-full max-w-5xl flex flex-col gap-6 sm:flex-row sm:justify-center sm:gap-6 lg:gap-8">
        <IncomeCard 
        navigation={navigateToAddTransaction}
          transactions={transactions}  
         className="w-full sm:w-1/2 lg:w-1/3" />
        <ExpenseCard 
        navigation={navigateToAddTransaction}
        transactions={transactions} className="w-full sm:w-1/2 lg:w-1/3" />
      </div> 


      <Suspense fallback={<p>Loading...</p>}>
      <TransactionHistory limit={6} Name={'Transactions'} />
      </Suspense>
    </div>
  );
};

export default Dashboard;
