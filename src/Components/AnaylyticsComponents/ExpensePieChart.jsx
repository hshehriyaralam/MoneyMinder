import React, { useState, useMemo, useCallback } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { getTotalExpenseAmount } from "@/lib/calculations.js";

const COLORS = [
  "#FF6347",
  "#9d891f",
  "#1a841a",
  "#FF4500",
  "#8A2BE2",
  "#0c6863",
  "#FF8C00",
  "#9370DB",
  "#3CB371",
  "#FF69B4",
  "#1E90FF",
  "#FFD700",
  "#DC143C",
  "#FF1493",
  "#FF6347",
  "#ADFF2F",
];

const ExpensePieChart = ({ transactions }) => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("YYYY-MM"));

  /* ---------------- Month Change Handler ---------------- */
  const handleMonthChange = useCallback((value) => {
    setSelectedMonth(value);
  }, []);

  /* ---------------- Filtered Transactions ---------------- */
  const monthTransactions = useMemo(() => {
    return transactions.filter(
      (txn) => dayjs(txn.createdAt).format("YYYY-MM") === selectedMonth,
    );
  }, [transactions, selectedMonth]);

  /* ---------------- Expense Exists Check ---------------- */
  const noTransactions = useMemo(() => {
    return !monthTransactions.some((txn) => txn.type === "expense");
  }, [monthTransactions]);

  /* ---------------- Expense Summary ---------------- */
  const filteredExpenseSummary = useMemo(() => {
    const summary = {};
    monthTransactions.forEach((txn) => {
      if (txn.type === "expense") {
        const amount = Math.abs(Number(txn.amount));
        summary[txn.category] = (summary[txn.category] || 0) + amount;
      }
    });
    return summary;
  }, [monthTransactions]);

  /* ---------------- Total Expense Amount ---------------- */
  const expenseAmount = useMemo(() => {
    return getTotalExpenseAmount(transactions, selectedMonth);
  }, [transactions, selectedMonth]);

  /* ---------------- Pie Chart Data ---------------- */
  const data = useMemo(() => {
    return Object.entries(filteredExpenseSummary)
      .map(([category, amount]) => ({
        name: category,
        value: amount,
        percentage: expenseAmount
          ? ((amount / expenseAmount) * 100).toFixed(2)
          : "0",
      }))
      .sort((a, b) => b.value - a.value);
  }, [filteredExpenseSummary, expenseAmount]);

  return (
    <div className="max-w-full rounded-2xl shadow-2xl bg-[#FAF9F6] border  p-4">
      <h1 className="text-xl font-bold text-left m-3 text-[#1f2937]">
        Monthly Expense Insights
      </h1>
      <div className="my-5 ">
        <Select onValueChange={handleMonthChange} value={selectedMonth}>
          <SelectTrigger className="w-48 mx-auto text-sm text-black backdrop-blur">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent
            className="rounded-md shadow-lg bg-transparent backdrop-blur"
            style={{
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {Array.from({ length: 12 }).map((_, index) => {
              const month = dayjs().subtract(index, "month");
              const monthStr = month.format("YYYY-MM");
              return (
                <SelectItem
                  key={monthStr}
                  value={monthStr}
                  style={{
                    padding: "6px 12px",
                    fontSize: "14px",
                  }}
                >
                  {month.format("MMMM YYYY")}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      {noTransactions ? (
        <div className="text-xl font-bold text-[#2d5385]">
          No Expense transactions available for this month.
        </div>
      ) : (
        <div className="max-w-full h-[450px] ">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Legend
                iconSize={12}
                layout="vertical"
                verticalAlign="right"
                align="middle"
                wrapperStyle={{
                  fontSize: "14px",
                  color: "white",
                  margin: "10px 10px",
                }}
                formatter={(value, entry) => {
                  const categoryAmount =
                    filteredExpenseSummary[entry.payload.name];
                  return (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "0px 6px",
                        borderRadius: "8px",
                        color: "#581845",
                        fontSize: "14px",
                        fontWeight: "bold",
                        boxShadow: "none",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      <span
                        style={{
                          color: COLORS[entry.index % COLORS.length],
                          fontSize: "14px",
                          paddingRight: "5px",
                        }}
                      >
                        {value}
                      </span>
                      {"  -  "}
                      <span
                        style={{
                          color: "#a4f01c",
                          fontSize: "14px",
                          paddingLeft: "5px",
                        }}
                      >
                        ${categoryAmount}
                      </span>
                    </span>
                  );
                }}
              />
              <Pie
                isAnimationActive={true}
                animationDuration={1200}
                animationEasing="ease-in-out"
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="70%"
                outerRadius={100}
                innerRadius={6}
                fill="#8884d8"
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  percent,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius =
                    innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#fff"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={10}
                    >
                      {(percent * 100).toFixed(0)}%
                    </text>
                  );
                }}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    style={{
                      transition: "all 0.3s ease-in-out",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => {
                  const formattedValue = Number(value) ? `₹${value}` : "";
                  return [formattedValue, name];
                }}
                contentStyle={{
                  backgroundColor: "white",
                  borderColor: "#a4f01c",
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "13px",
                  padding: "10px",
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
