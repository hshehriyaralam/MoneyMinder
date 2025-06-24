import React, { useContext } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Context } from '../../Context/TransactionContext.jsx';

const ExpensePieChart = () => {
  const { IncomeSummary, incomeAmount } = useContext(Context);
  const data = Object.keys(IncomeSummary)
    .map((key) => {
      const value = IncomeSummary[key];
      const percentage = ((value / incomeAmount) * 100).toFixed(2);
      return {
        name: key,
        value: value,
        percentage: percentage,
      };
    })
    .sort((a, b) => b.value - a.value);

  const COLORS = [
    '#32CD32', '#FFD700', '#1E90FF', '#8A2BE2', '#FF6347', '#FFA500',
    '#00FA9A', '#40E0D0', '#7B68EE', '#20B2AA', '#FF1493', '#FF4500',
    '#DAA520', '#FF8C00', '#00BFFF', '#ADFF2F'
  ];

  return (
    <div className="w-full flex flex-col items-center bg-transparent p-10">
      <h2 className="text-md font-semibold text-white mb-1">Income Distribution</h2>
      <div className="w-full h-[700px]"> 
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={180} 
              innerRadius={100}
              fill="#8884d8"
              labelLine={true}  // Label line visible
              label={({percentage}) => `${percentage}%`}  // Add label text
              labelLineStyle={{ stroke: '#ffffff', strokeWidth: 10 }}  // Adjust label line style
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
                const categoryAmount = IncomeSummary[entry.payload.name]; // Fetching the amount for each category
                return (
                  <span style={{ color: COLORS[entry.index % COLORS.length] }}>
                    {value} --- {categoryAmount}
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
