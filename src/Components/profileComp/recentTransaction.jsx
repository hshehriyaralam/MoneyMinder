import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { formatDate, money } from "../../ui/format";

const RecentTransaction = React.memo(function RecentTransaction({ transactions }) {
  const recent = transactions.slice(0, 4);

  return (
    <section className="recent-content">
      <h2 className="section-title">Recent Transactions</h2>
      {recent.length ? (
        <ul className="recent-list">
          {recent.map((transaction) => {
            const isIncome = transaction.type === "income";
            const Icon = isIncome ? ArrowUp : ArrowDown;

            return (
              <li className="recent-row" key={transaction._id}>
                <span className={`recent-icon ${isIncome ? "pos" : "neg"}`}>
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span className="recent-detail">
                  <strong title={transaction.category}>{transaction.category}</strong>
                  <small>{formatDate(transaction.date)}</small>
                </span>
                <strong className={`recent-amount ${isIncome ? "pos" : "neg"}`}>
                  {isIncome ? "+" : "−"}{money(transaction.amount)}
                </strong>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="label">No transactions yet. Your latest activity will appear here.</p>
      )}
    </section>
  );
});

export default RecentTransaction;
