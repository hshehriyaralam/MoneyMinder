import { useEffect, useMemo } from "react";
import useTransactionStore from "@/store/transactions.js";
import { getTotalExpense, getTotalIncome } from "@/lib/calculations.js";
import { money } from "../ui/format";
import { EmptyState, Ring } from "../ui/primitives";

const Overview = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const fetchTransactions = useTransactionStore((state) => state.fetchTransactions);
  const fetchError = useTransactionStore((state) => state.fetchError);
  const totalIncome = useMemo(() => getTotalIncome(transactions), [transactions]);
  const totalExpense = useMemo(() => getTotalExpense(transactions), [transactions]);
  const balance = totalIncome - totalExpense;

  const categories = useMemo(() => {
    const totals = new Map();
    transactions.forEach(({ category, type, amount }) => {
      const key = JSON.stringify([type, category]);
      totals.set(key, (totals.get(key) || 0) + (Number(amount) || 0));
    });

    return [...totals].map(([key, amount]) => {
      const [type, category] = JSON.parse(key);
      const base = type === "income" ? totalIncome : totalExpense;
      return {
        type,
        category,
        amount,
        percentage: base > 0 ? Math.round((amount / base) * 100) : 0,
      };
    });
  }, [transactions, totalIncome, totalExpense]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <section className="bento overview-page">
      {fetchError && <div className="data-error span-12" role="alert">{fetchError}</div>}
      <article className="card card-income span-4">
        <p className="label">Total Income</p>
        <p className="figure pos">{money(totalIncome)}</p>
      </article>
      <article className="card card-expense span-4">
        <p className="label">Total Expense</p>
        <p className="figure neg">{money(totalExpense)}</p>
      </article>
      <article className="card card-ink span-4">
        <p className="label">Total Savings</p>
        <p className="figure">{money(balance)}</p>
      </article>

      {categories.length ? (
        categories.map((item) => (
          <article
            className="card span-4 category-card"
            key={JSON.stringify([item.type, item.category])}
          >
            <header className="card-head">
              <div>
                <span className={`tag tag-${item.type}`}>{item.type}</span>
                <h2 className="category-name" title={item.category}>{item.category}</h2>
              </div>
              <Ring
                value={item.percentage}
                color={item.type === "income" ? "var(--pos)" : "var(--neg)"}
              />
            </header>
            <p className={`figure ${item.type === "income" ? "pos" : "neg"}`}>
              {money(item.amount)}
            </p>
            <p className="label">{item.percentage}% of {item.type}</p>
          </article>
        ))
      ) : (
        <article className="card span-12">
          <EmptyState
            title="No category activity yet"
            body="Add an income or expense to see how your finances are split."
          />
        </article>
      )}
    </section>
  );
};

export default Overview;
