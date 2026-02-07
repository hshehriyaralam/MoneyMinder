import React from "react";
import { DollarSign, TrendingUp, TrendingDown, PieChart } from "lucide-react";

const Summary = React.memo(({ financialData }) => {
  return (
    <div className="space-y-6 ">
      <h2 className="text-[#1f2937] text-[24px]  font-bold">
        Financial Summary
      </h2>

      {/* Income */}
      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-700">
              Monthly Income
            </h3>
            <p className="text-sm text-gray-500">
              Your total earnings this month
            </p>
          </div>
        </div>
        <p className="text-xl font-bold text-blue-600">
          ${financialData.monthlyIncome.toLocaleString()}
        </p>
      </div>

      {/* Expenses */}
      <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="bg-red-100 p-3 rounded-full">
            <TrendingDown className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-700">
              Monthly Expenses
            </h3>
            <p className="text-sm text-gray-500">
              Your total spending this month
            </p>
          </div>
        </div>
        <p className="text-xl font-bold text-red-600">
          ${financialData.monthlyExpenses.toLocaleString()}
        </p>
      </div>

      {/* Savings */}
      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-full">
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-700">
              Monthly Savings
            </h3>
            <p className="text-sm text-gray-500">Amount saved this month</p>
          </div>
        </div>
        <p className="text-xl font-bold text-green-600">
          ${financialData.monthlySavings.toLocaleString()}
        </p>
      </div>

      {/* Top Spending */}
      <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <PieChart className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-700">
              Top Spending
            </h3>
            <p className="text-sm text-gray-500">Highest expense category</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-purple-600">
            {financialData.topCategory}
          </p>
          <p className="text-xs text-gray-500">
            ${financialData.topExpenseAmount.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
});

export default Summary;
