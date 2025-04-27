import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Context } from '@/Context/TransactionContext';

const PieChartComponent = () => {
  const { expenseCategories } = useExpenseContext(); // Assuming expenseCategories is an array of objects with category and value

  // Colors for each pie segment
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6F61', '#6B8E23'];

  // Format data to match Recharts format
  const data = expenseCategories.map(category => ({
    name: category.name,
    value: category.amount,
  }));

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Expense Distribution</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default PieChartComponent;
