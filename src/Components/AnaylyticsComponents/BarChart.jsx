import { useMemo, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const MonthlyBarChart = ({ transactions }) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // ✅ Available Years
  const yearsAvailable = useMemo(() => {
    const years = new Set(
      transactions.map((t) => new Date(t.date).getFullYear())
    );
    years.add(currentYear);
    return Array.from(years).sort((a, b) => a - b);
  }, [transactions, currentYear]);

  // ✅ Filter by Selected Year
  const filteredTransactions = useMemo(() => {
    return transactions.filter(
      (t) => new Date(t.date).getFullYear() === selectedYear
    );
  }, [transactions, selectedYear]);

  // ✅ Monthly Data Generator
  const generateMonthlyData = useCallback((list) => {
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString("default", { month: "short" }),
      income: 0,
      expense: 0,
    }));

    list.forEach((t) => {
      const monthIndex = new Date(t.date).getMonth();
      if (t.type === "income") {
        monthlyData[monthIndex].income += Number(t.amount);
      } else {
        monthlyData[monthIndex].expense += Number(t.amount);
      }
    });

    return monthlyData;
  }, []);

  // ✅ Final Chart Data
  const { chartData, noTransactions } = useMemo(() => {
    if (filteredTransactions.length === 0) {
      return {
        chartData: generateMonthlyData([]),
        noTransactions: true,
      };
    }

    return {
      chartData: generateMonthlyData(filteredTransactions),
      noTransactions: false,
    };
  }, [filteredTransactions, generateMonthlyData]);

  return (
    <Card className="bg-background/900 shadow-xl">
      <CardHeader className="flex flex-col gap-4">
        <CardTitle className="text-xl font-bold text-center text-[#1f2937]">
          Monthly Overview
        </CardTitle>

        <Select
          value={selectedYear.toString()}
          onValueChange={(value) => setSelectedYear(Number(value))}
        >
          <SelectTrigger className="w-28 mx-auto text-sm">
            {selectedYear}
          </SelectTrigger>
          <SelectContent>
            {yearsAvailable.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      {noTransactions ? (
        <div className="text-xl font-bold mx-20 text-[#2d5385]">
          No transactions available for this year.
        </div>
      ) : (
        <CardContent className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barCategoryGap="30%" barSize={30}>
              <XAxis dataKey="month" fontSize={14} />
              <YAxis fontSize={14} />
              <Tooltip />
              <Bar dataKey="income" fill="#11bb52" radius={[8, 8, 0, 0]}>
                <LabelList
                  dataKey="income"
                  position="top"
                  formatter={(v) => (v ? `+${v}` : "")}
                />
              </Bar>
              <Bar dataKey="expense" fill="#ef4444" radius={[8, 8, 0, 0]}>
                <LabelList
                  dataKey="expense"
                  position="top"
                  formatter={(v) => (v ? `-${v}` : "")}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      )}
    </Card>
  );
};

export default MonthlyBarChart;
