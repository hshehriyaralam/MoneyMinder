import { useContext, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { Context } from "../../Context/TransactionContext.jsx";

const MonthlyBarChart = () => {
  const currentYear = new Date().getFullYear();
  const {transactions} = useContext(Context)
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [data, setData] = useState([]);
  const [yearsAvailable, setYearsAvailable] = useState([]);
  const [noTransactions, setNoTransactions] = useState(false); 


  
  
  
  useEffect(() => {
    if (transactions.length > 0) {
      const uniqueYears = Array.from(new Set(transactions.map((t) => new Date(t.date).getFullYear())));
    if (!uniqueYears.includes(currentYear)) {
      uniqueYears.push(currentYear);
    }
    uniqueYears.sort((a, b) => a - b);
    setYearsAvailable(uniqueYears);

    generateData(selectedYear);
  }
}, [transactions]);

  useEffect(() => {
    generateData(selectedYear);
  }, [selectedYear]);

  const generateData = (year) => {

    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString('default', { month: 'short' }),
    income: 0,
    expense: 0
  }));
  
  const filteredTransactions = transactions.filter((t) => new Date(t.date).getFullYear() === year)
  
  if (filteredTransactions.length === 0) {
    setNoTransactions(true);
    setData(monthlyData); 
    return;
  } else {
    setNoTransactions(false);
  }
  
  filteredTransactions.forEach((t) => {
    const tDate = new Date(t.date);
    const monthIndex = tDate.getMonth();
    if (t.type === 'income') {
      monthlyData[monthIndex].income += Number(t.amount);
    } else {
      monthlyData[monthIndex].expense += Number(t.amount);
    }
  });

  setData(monthlyData);
};


  return (
    <Card className="bg-background/900 shadow-xl">
      <CardHeader className="flex flex-col gap-4">
        <CardTitle className="text-xl font-bold text-center text-[#1f2937]">Monthly Overview</CardTitle>

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
        {noTransactions ? (
          <div className="text-xl font-bold mx-20 text-[#2d5385]">
          No transactions available for this year.
        </div>
      ) : (
        <CardContent className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="30%" barSize={30}>
            <XAxis dataKey="month" stroke="black" fontSize={15} />
            <YAxis stroke="black" fontSize={15} />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ backgroundColor: "transparent", borderColor: "#2d5385", borderRadius: "20px" }}
              labelStyle={{ color: "#4b5563" }}
              itemStyle={{ color: "#2d5385"  }}
            />
            <Bar dataKey="income" fill="#11bb52" radius={[10, 10, 0, 0]}>
              <LabelList dataKey="income" position="top" formatter={(value) => value !== 0 ? `+${value}` : ''} fill="#11bb52" fontSize={12} fontWeight={600} />
            </Bar>
            <Bar dataKey="expense" fill="#ef4444" radius={[10, 10, 0, 0]}>
              <LabelList dataKey="expense" position="top" formatter={(value) => value !== 0 ? `-${value}` : ''} fill="#e70c0c" fontSize={12} fontWeight={600} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
        )}
    </Card>
  );
};

export default MonthlyBarChart;
