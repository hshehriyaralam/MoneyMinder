import React from 'react';
import BalanceCard from '@/Components/transactions/BalnceCard';
import IncomeCard from '@/Components/transactions/IncomeCard';
import ExpenseCard from '@/Components/transactions/ExpenseCard';

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-4 space-y-8">
      <BalanceCard />
      <div className="w-full max-w-5xl flex flex-col gap-y-8 md:flex-row md:gap-x-8 md:justify-center">
        <IncomeCard />
        <ExpenseCard />
      </div>
    </div>
  );
};
export default Dashboard;