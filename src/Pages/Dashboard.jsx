import React from "react";
import BalanceCard from "@/Components/transactions/BalnceCard";
import IncomeCard from "@/Components/transactions/IncomeCard";
import ExpenseCard from "@/Components/transactions/ExpenseCard";
import CategoryDropdown from "@/Components/comman/Dropdown";
import IncomeForm from "@/Components/layout/IncomeForm";



const Dashboard = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-4 space-y-6">
       <BalanceCard /> 
      <div className="w-full max-w-5xl flex flex-col gap-6 sm:flex-row sm:justify-center sm:gap-6 lg:gap-8">
        <IncomeCard className="w-full sm:w-1/2 lg:w-1/3" />
        <ExpenseCard className="w-full sm:w-1/2 lg:w-1/3" />
      </div> 
      
    </div>
  );
};

export default Dashboard;
