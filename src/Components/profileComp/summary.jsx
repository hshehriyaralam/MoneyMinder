import React from "react";
import { money } from "../../ui/format";

const Summary = React.memo(function Summary({ financialData }) {
  const rows = [
    { label: "Monthly income", value: money(financialData.monthlyIncome), type: "income" },
    { label: "Monthly expenses", value: money(financialData.monthlyExpenses), type: "expense" },
    { label: "Monthly savings", value: money(financialData.monthlySavings), type: "balance" },
    {
      label: "Top spending",
      value: financialData.topCategory
        ? `${financialData.topCategory} · ${money(financialData.topExpenseAmount)}`
        : "No expenses yet",
      type: "spending",
    },
  ];

  return (
    <div className="summary-content">
      <h2 className="section-title">Financial Summary</h2>
      <div className="summary-stats">
        {rows.map((row) => (
          <div className={`summary-stat ${row.type}`} key={row.type}>
            <p className="label">{row.label}</p>
            <strong title={row.value}>{row.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Summary;
