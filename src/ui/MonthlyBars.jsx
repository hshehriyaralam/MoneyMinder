import { useMemo } from "react";
import { monthKey } from "./format";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function recentMonths(count = 6, from = new Date()) {
  const items = [];
  for (let offset = count - 1; offset >= 0; offset -= 1) {
    const date = new Date(from.getFullYear(), from.getMonth() - offset, 1);
    items.push({
      key: `${date.getFullYear()}-${date.getMonth()}`,
      label: MONTHS[date.getMonth()],
      year: date.getFullYear(),
      month: date.getMonth(),
    });
  }
  return items;
}

export function MonthlyBars({ transactions, months = 6 }) {
  const slots = useMemo(() => recentMonths(months), [months]);
  const series = useMemo(() => {
    return slots.map((slot) => {
      let income = 0;
      let expense = 0;
      transactions.forEach((item) => {
        const key = monthKey(item.date);
        const slotKey = `${slot.year}-${String(slot.month + 1).padStart(2, "0")}`;
        if (key !== slotKey) return;
        if (item.type === "income") income += Number(item.amount) || 0;
        else expense += Number(item.amount) || 0;
      });
      return { ...slot, income, expense };
    });
  }, [transactions, slots]);

  const max = Math.max(1, ...series.flatMap((item) => [item.income, item.expense]));
  const empty = series.every((item) => item.income === 0 && item.expense === 0);

  if (empty) {
    return <p className="empty"><strong>No activity in these months</strong>Add an income or expense and the bars will fill in.</p>;
  }

  return (
    <div className="bars" role="img" aria-label="Income and expense by month">
      {series.map((item) => (
        <div className="bar-col" key={item.key}>
          <div className="bar-pair">
            {item.income > 0 ? (
              <div className="bar income" style={{ height: `${Math.max(8, (item.income / max) * 100)}%` }} title={`Income ${item.income}`} />
            ) : (
              <i className="bar-dot" />
            )}
            {item.expense > 0 ? (
              <div className="bar expense" style={{ height: `${Math.max(8, (item.expense / max) * 100)}%` }} title={`Expense ${item.expense}`} />
            ) : (
              <i className="bar-dot alt" />
            )}
          </div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
