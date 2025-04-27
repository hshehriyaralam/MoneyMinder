import { useContext, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { Context } from "@/Context/TransactionContext.jsx";

const MonthlyBarChart = () => {
  const currentYear = new Date().getFullYear();
  const {totalAmount} = useContext(Context)
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [data, setData] = useState([]);
  const [yearsAvailable, setYearsAvailable] = useState([]);

  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const uniqueYears = Array.from(new Set(transactions.map((t) => new Date(t.date).getFullYear())));
    if (!uniqueYears.includes(currentYear)) {
      uniqueYears.push(currentYear);
    }
    uniqueYears.sort((a, b) => a - b);
    setYearsAvailable(uniqueYears);

    generateData(selectedYear);
  }, []);

  useEffect(() => {
    generateData(selectedYear);
  }, [selectedYear]);

  const generateData = (year) => {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString('default', { month: 'short' }),
      income: 0,
      expense: 0
    }));
    transactions.forEach((t) => {
      const tDate = new Date(t.date);
      if (tDate.getFullYear() === year) {
        const monthIndex = tDate.getMonth();
        if (t.type === 'income') {
          monthlyData[monthIndex].income += Number(t.amount);
        } else {
          monthlyData[monthIndex].expense += Number(t.amount);
        }
      }
    });
    setData(monthlyData);
  };

  return (
    <Card className="bg-background/50 shadow-xl">
      <CardHeader className="flex flex-col gap-4">
        <CardTitle className="text-xl font-bold text-center">Monthly Overview</CardTitle>

        <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(Number(value))}>
          <SelectTrigger className="w-28 mx-auto text-sm">{selectedYear}</SelectTrigger>
          <SelectContent>
            {yearsAvailable.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="30%" barSize={30}>
            <XAxis dataKey="month" stroke="#cbd5e1" fontSize={15} />
            <YAxis stroke="#cbd5e1" fontSize={15} />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.1)' }}
              contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#d1d5db" }}
            />
            <Bar dataKey="income" fill="#22c55e" radius={[10, 10, 0, 0]}>
              <LabelList dataKey="income" position="top" formatter={(value) => value !== 0 ? `+${value}` : ''} fill="#22c55e" fontSize={12} />
            </Bar>
            <Bar dataKey="expense" fill="#ef4444" radius={[10, 10, 0, 0]}>
              <LabelList dataKey="expense" position="top" formatter={(value) => value !== 0 ? `-${value}` : ''} fill="#ef4444" fontSize={12} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlyBarChart;
