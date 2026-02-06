import React, { useState, useMemo, useCallback } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import dayjs from 'dayjs';

const SavingLinBar = ({ transactions }) => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format('YYYY-MM'));

  /* ------------ Month Change Handler ------------ */
  const handleMonthChange = useCallback((value) => {
    setSelectedMonth(value);
  }, []);

  /* ------------ Filtered Transactions (Month-wise) ------------ */
  const monthTransactions = useMemo(() => {
    return transactions.filter(txn =>
      dayjs(txn.createdAt).format('YYYY-MM') === selectedMonth
    );
  }, [transactions, selectedMonth]);

  /* ------------ Chart Data (Daily Savings) ------------ */
  const chartData = useMemo(() => {
    const dailySavings = {};

    monthTransactions.forEach(txn => {
      const date = dayjs(txn.createdAt).format('YYYY-MM-DD');

      if (!dailySavings[date]) {
        dailySavings[date] = { income: 0, expense: 0 };
      }

      if (txn.type === 'income') {
        dailySavings[date].income += Number(txn.amount);
      } else if (txn.type === 'expense') {
        dailySavings[date].expense += Number(txn.amount);
      }
    });

    return Object.entries(dailySavings)
      .map(([date, values]) => ({
        date,
        savings: values.income - values.expense,
      }))
      .sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());
  }, [monthTransactions]);

  return (
 <div className="p-6 bg-[#FAF9F6] rounded-lg shadow-md">
      <h1 className='text-2xl font-bold md:text-left  text-center m-3 text-[#1f2937]'>Savings Analytics</h1>
      
      <div className="mb-6">
        <Select onValueChange={handleMonthChange} value={selectedMonth}>
          <SelectTrigger className="w-40  mx-auto border border-black text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-0">
            <SelectValue placeholder="Select Month"/>
          </SelectTrigger>
          <SelectContent className="rounded-md shadow-lg  bg-transparent backdrop-blur" 
          style={{
            maxHeight: '200px',
            overflowY: 'auto', 
          }}>
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

      <div className="mt-6 bg-transparent rounded-lg shadow-xl p-4 text-black">
  {chartData.length === 0 ? (
    <p className="text-center text-[#2d5385] font-bold text-lg">
      No Transaction available for this month
    </p>
  ) : (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#737673" />
        <XAxis dataKey="date" tick={{ fill: "black" }} stroke="#000000" />
        <YAxis tick={{ fill: "black" }} stroke="#000000" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="savings"
          stroke="#36ca24"
          strokeWidth={3}
          dot={{ fill: 'blue', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )}
</div>

    </div>
  );
};

export default SavingLinBar;
