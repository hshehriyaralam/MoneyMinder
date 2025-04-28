import React, { useContext, useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Context } from '@/Context/TransactionContext';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select'; // Import Shadcn Select
import dayjs from 'dayjs';

const ExpensePieChart = () => {
  const { transactions, expenseSummary, expenseAmount } = useContext(Context);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format('YYYY-MM')); // Default current month
  const [filteredExpenseSummary, setFilteredExpenseSummary] = useState(expenseSummary);
  const [noTransactions, setNoTransactions] = useState(false); // New state to track if there are no transactions

  useEffect(() => {
    // Filtering transactions by the selected month
    const filteredTransactions = transactions.filter((transaction) => {
      const transactionMonth = dayjs(transaction.createdAt).format('YYYY-MM');
      return transactionMonth === selectedMonth;
    });

    if (filteredTransactions.length === 0) {
      setNoTransactions(true); // Set to true if there are no transactions for the selected month
    } else {
      setNoTransactions(false); // Otherwise, set it to false
    }

    // Grouping expenses by category for the selected month
    const newExpenseSummary = {};
    filteredTransactions.forEach((transaction) => {
      if (transaction.type === 'expense') {
        const category = transaction.category;
        const amount = Math.abs(Number(transaction.amount));

        if (newExpenseSummary[category]) {
          newExpenseSummary[category] += amount;
        } else {
          newExpenseSummary[category] = amount;
        }
      }
    });

    setFilteredExpenseSummary(newExpenseSummary);

  }, [selectedMonth, transactions]); // Re-run effect when selectedMonth or transactions change

  const COLORS = [
    '#FF6347', '#9d891f', '#1a841a', '#FF4500', '#8A2BE2', '#0c6863',
    '#FF8C00', '#9370DB', '#3CB371', '#FF69B4', '#1E90FF', '#FFD700',  
    '#DC143C', '#FF1493', '#FF6347', '#ADFF2F'
  ];

  // Function to handle month change
  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  const data = Object.keys(filteredExpenseSummary)
    .map((key) => ({
      name: key,
      value: filteredExpenseSummary[key],
      percentage: ((filteredExpenseSummary[key] / expenseAmount) * 100).toFixed(2),
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="w-full flex flex-col border border-black rounded-lg items-start items-center bg-background/50 shadow-xl p-10">
      {/* Shadcn Dropdown for selecting month */}
      <div className="mb-6">
        <Select onValueChange={handleMonthChange} value={selectedMonth}>
          <SelectTrigger className="w-56 border-2 border-gray-300 rounded-md p-2 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent className="rounded-md shadow-lg">
            {/* Generating the last 12 months */}
            {Array.from({ length: 12 }).map((_, index) => {
              const month = dayjs().subtract(index, 'month');
              const monthStr = month.format('YYYY-MM');
              return (
                <SelectItem key={monthStr} value={monthStr}>
                  {month.format('MMMM YYYY')}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* If there are no transactions for the selected month, show a message */}
      {noTransactions ? (
        <div className="text-xl font-bold text-red-500">
          No transactions available for this month.
        </div>
      ) : (
        <div className="w-full h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={160}
                innerRadius={80}
                fill="#8884d8"
                labelLine={true}
                label={({ percentage }) => `${percentage}%`}
                labelLineStyle={{ stroke: '#ffffff', strokeWidth: 10 }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [
                  `₹${value} (${props.payload.percentage}%)`,
                  name,
                ]}
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  borderRadius: "8px",
                  border: "none",
                  color: "white",
                  fontSize: "12px",
                }}
              />
              <Legend
                iconSize={10}
                layout="vertical"
                verticalAlign="middle"
                align="left"
                wrapperStyle={{
                  fontSize: "18px",
                  color: "white",
                }}
                formatter={(value, entry) => {
                  const categoryAmount = filteredExpenseSummary[entry.payload.name];
                  return (
                    <span style={{ color: COLORS[entry.index % COLORS.length] }}>
                      {value} - ₹{categoryAmount}
                    </span>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ExpensePieChart;
