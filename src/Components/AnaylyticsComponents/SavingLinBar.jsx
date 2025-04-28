import React, { useContext, useState, useEffect } from 'react';
import { Context } from '@/Context/TransactionContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select'; // Import Shadcn Select
import dayjs from 'dayjs';

const SavingLinBar = () => {
  const { transactions } = useContext(Context);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format('YYYY-MM')); // Default current month
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Filtering transactions by the selected month
    const filteredTransactions = transactions.filter(transaction => {
      const transactionMonth = dayjs(transaction.createdAt).format('YYYY-MM');
      return transactionMonth === selectedMonth;
    });

    // Grouping transactions by date and calculating daily savings
    const dailySavings = {};
    filteredTransactions.forEach((transaction) => {
      const date = dayjs(transaction.createdAt).format('YYYY-MM-DD'); // Grouping by date
      if (!dailySavings[date]) {
        dailySavings[date] = { income: 0, expense: 0 };
      }

      if (transaction.type === 'income') {
        dailySavings[date].income += Number(transaction.amount);
      } else if (transaction.type === 'expense') {
        dailySavings[date].expense += Number(transaction.amount);
      }
    });

    // Calculating daily savings (Income - Expense)
    const transformedData = Object.keys(dailySavings).map((date) => ({
      date,
      savings: dailySavings[date].income - dailySavings[date].expense,
    }));

    setChartData(transformedData);

  }, [selectedMonth, transactions]); // Re-run effect when selectedMonth or transactions change

  // Function to handle month change
  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  return (
    <div className="p-6 bg-transparent rounded-lg shadow-md">
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

      {/* Line Chart for Savings */}
      <div className="mt-6 bg-transparent rounded-lg shadow-md p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Highlighted Line with a Vibrant Color */}
            <Line type="monotone" dataKey="savings" stroke="#3498db" strokeWidth={3} dot={{ fill: '#3498db', strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SavingLinBar;
