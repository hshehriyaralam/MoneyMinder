import React, { useContext } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, Label } from 'recharts';
import { Context } from '@/Context/TransactionContext';

const PieChartComponent = () => {
  const { expenseSummary, expenseAmount } = useContext(Context);
  const data = Object.keys(expenseSummary).map((key) => {
    const value = expenseSummary[key];
    const percentage = ((value / expenseAmount) * 100).toFixed(2); 
    return {
      name: key,
      value: value,
      percentage: percentage,
    };
  });

  const COLORS = ['#FF6347', '#FFD700', '#32CD32', '#FF4500', '#8A2BE2', '#20B2AA'];

  return (
    <div className="w-full h-full flex justify-center items-center bg-transparent p-6">
      <div className="p-6 bg-transparent rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-lg font-semibold text-white mb-4 text-center">Expense Distribution</h2>
        <div className="flex justify-center items-center">
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
              labelLine={true}
              labelPosition="outside" 
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              {data.map((entry, index) => (
                <Label
                  key={`label-${index}`}
                  position="inside"
                  fill="#FFF"
                  // value={`${entry.percentage}%`} // Show percentage on label
                  fontSize={14}
                  fontWeight="normal"
                  offset={20} 
                  dx={10} 
                  dy={-10}
                />
              ))}
            </Pie>
            <Tooltip
              wrapperStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.7)", 
                borderRadius: "8px", 
                padding: "10px 15px", 
                color: "white", 
                fontSize: "14px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", 
              }}
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.8)", 
                borderRadius: "8px",
                padding: "8px 12px",
                border: "none",
              }}
            />
            <Legend
              iconSize={12}
              layout="vertical"
              verticalAlign="top"
              wrapperStyle={{
                paddingTop: "10px",
                color: "white",
              }}
            />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;
