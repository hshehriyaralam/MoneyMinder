import React, { useContext } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Context } from '@/Context/TransactionContext';

const ExpensePieChart = () => {
  const { expenseSummary, expenseAmount } = useContext(Context);
  const data = Object.keys(expenseSummary)
    .map((key) => {
      const value = expenseSummary[key];
      const percentage = ((value / expenseAmount) * 100).toFixed(2);
      return {
        name: key,
        value: value,
        percentage: percentage,
      };
    })
    .sort((a, b) => b.value - a.value);
    
  const COLORS = [
    '#FF6347', '#9d891f', '#1a841a', '#FF4500', '#8A2BE2', '#0c6863',
    '#FF8C00', '#9370DB', '#3CB371', '#FF69B4', '#1E90FF', '#FFD700',  
    '#DC143C', '#FF1493', '#FF6347', '#ADFF2F'
  ];

  return (
    <div className="w-full flex flex-col items-start items-center bg-background/50 shadow-xl p-10">
      <h2 className="text-2xl font-bold ">Expense Distribution</h2>
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
              label={({percentage}) => `${percentage}%`} 
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
                const categoryAmount = expenseSummary[entry.payload.name]
                return (
                  <span style={{ color: COLORS[entry.index % COLORS.length] }}>
                    {value} - ${categoryAmount}
                  </span>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpensePieChart;
