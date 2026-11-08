import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getTotalExpenseAmount } from "../lib/calculations";
import { money, monthKey, monthLabel } from "./format";
import { EmptyState } from "./primitives";

const PIE = [
  "var(--ink)",
  "var(--neg-soft)",
  "var(--lime)",
  "var(--pos)",
  "var(--muted)",
  "var(--chart-bg)",
  "var(--neg)",
  "var(--income-bg)",
];
const tip = {
  contentStyle: {
    background: "var(--ink)",
    border: "none",
    borderRadius: 12,
    color: "var(--bg)",
    fontSize: 12,
  },
  labelStyle: { color: "var(--bg)" },
  itemStyle: { color: "var(--bg)" },
};

function useReduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function lastMonths(count = 12) {
  const now = new Date();
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - index, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    return key;
  });
}

export function YearBars({ transactions }) {
  const reduced = useReduced();
  const currentYear = new Date().getFullYear();
  const years = useMemo(() => {
    const set = new Set(
      transactions
        .map((item) => Number(monthKey(item.date).slice(0, 4)))
        .filter((year) => Number.isFinite(year) && year > 0),
    );
    set.add(currentYear);
    return [...set].sort((a, b) => a - b);
  }, [transactions, currentYear]);
  const [year, setYear] = useState(currentYear);

  const data = useMemo(() => {
    const rows = Array.from({ length: 12 }, (_, index) => ({
      month: new Date(0, index).toLocaleString("en-US", { month: "short" }),
      income: 0,
      expense: 0,
    }));
    transactions.forEach((item) => {
      const [transactionYear, transactionMonth] = monthKey(item.date).split("-").map(Number);
      if (transactionYear !== Number(year)) return;
      const bucket = rows[transactionMonth - 1];
      if (!bucket) return;
      if (item.type === "income") bucket.income += Number(item.amount) || 0;
      else bucket.expense += Number(item.amount) || 0;
    });
    return rows;
  }, [transactions, year]);

  const empty = data.every((row) => row.income === 0 && row.expense === 0);

  return (
    <article className="card card-chart span-12" id="analytics-bars">
      <header className="card-head">
        <h2>Monthly overview</h2>
        <label className="field" style={{ width: 120 }}>
          <span className="sr">Year</span>
          <select aria-label="Year" value={year} onChange={(event) => setYear(Number(event.target.value))}>
            {years.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
      </header>
      {empty ? (
        <EmptyState title="No transactions this year" body="Pick another year, or add a transaction dated in this one." />
      ) : (
        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <BarChart data={data} barCategoryGap="28%">
              <CartesianGrid vertical={false} stroke="var(--hairline)" />
              <XAxis dataKey="month" interval="preserveStartEnd" tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
              <Tooltip {...tip} formatter={(value) => money(value)} />
              <Bar dataKey="income" fill="var(--ink)" radius={[6, 6, 2, 2]} isAnimationActive={!reduced} animationDuration={600} />
              <Bar dataKey="expense" fill="var(--neg-soft)" radius={[6, 6, 2, 2]} isAnimationActive={!reduced} animationDuration={600} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </article>
  );
}

export function ExpensePie({ transactions }) {
  const reduced = useReduced();
  const months = lastMonths(12);
  const [selected, setSelected] = useState(months[0]);

  const data = useMemo(() => {
    const summary = new Map();
    transactions.forEach((item) => {
      const key = monthKey(item.createdAt || item.date);
      if (item.type !== "expense" || key !== selected) return;
      summary.set(
        item.category,
        (summary.get(item.category) || 0) + Math.abs(Number(item.amount) || 0),
      );
    });
    return [...summary].map(([name, value]) => ({ name, value }));
  }, [transactions, selected]);

  const total = useMemo(() => getTotalExpenseAmount(transactions, selected), [transactions, selected]);

  return (
    <article className="card span-6">
      <header className="card-head">
        <h2>Expense insights</h2>
        <label className="field" style={{ width: 170 }}>
          <span className="sr">Month</span>
          <select aria-label="Expense month" value={selected} onChange={(event) => setSelected(event.target.value)}>
            {months.map((key) => <option key={key} value={key}>{monthLabel(key)}</option>)}
          </select>
        </label>
      </header>
      {!data.length ? (
        <EmptyState title="No expenses this month" body="Food, rent, and the rest will split this chart once they’re logged." />
      ) : (
        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={2} isAnimationActive={!reduced} animationDuration={650}>
                {data.map((entry, index) => <Cell key={entry.name} fill={PIE[index % PIE.length]} />)}
              </Pie>
              <Tooltip {...tip} formatter={(value) => money(value)} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <p className="label" style={{ textAlign: "center" }}>Spent {money(total)}</p>
        </div>
      )}
    </article>
  );
}

export function SavingsLine({ transactions }) {
  const reduced = useReduced();
  const months = lastMonths(12);
  const [selected, setSelected] = useState(months[0]);

  const data = useMemo(() => {
    const daily = {};
    transactions.forEach((item) => {
      const source = item.createdAt || item.date;
      if (monthKey(source) !== selected) return;
      const day = String(source).slice(0, 10);
      if (!daily[day]) daily[day] = { income: 0, expense: 0 };
      if (item.type === "income") daily[day].income += Number(item.amount) || 0;
      else daily[day].expense += Number(item.amount) || 0;
    });
    return Object.entries(daily)
      .map(([date, values]) => ({
        date: date.slice(8),
        savings: values.income - values.expense,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [transactions, selected]);

  return (
    <article className="card span-6">
      <header className="card-head">
        <h2>Savings</h2>
        <label className="field" style={{ width: 170 }}>
          <span className="sr">Month</span>
          <select aria-label="Savings month" value={selected} onChange={(event) => setSelected(event.target.value)}>
            {months.map((key) => <option key={key} value={key}>{monthLabel(key)}</option>)}
          </select>
        </label>
      </header>
      {!data.length ? (
        <EmptyState title="No savings to plot" body="Once this month has income and expenses, the line shows what you kept." />
      ) : (
        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid vertical={false} stroke="var(--hairline)" />
              <XAxis dataKey="date" interval="preserveStartEnd" tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
              <Tooltip {...tip} formatter={(value) => money(value)} />
              <Line type="monotone" dataKey="savings" stroke="var(--ink)" strokeWidth={2.5} dot={false} isAnimationActive={!reduced} animationDuration={700} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </article>
  );
}
