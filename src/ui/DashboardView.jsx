import { ArrowDown, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { getTotalExpense, getTotalIncome } from "../lib/calculations";
import { money } from "./format";
import { CoinStack, CountUp } from "./primitives";
import { MonthlyBars } from "./MonthlyBars";
import { TransactionsView } from "./TransactionsView";

function SummaryCard({ title, amount, type }) {
  const isIncome = type === "income";
  const Icon = isIncome ? ArrowUp : ArrowDown;

  return (
    <article className={`card ${isIncome ? "card-income" : "card-expense"} span-3 summary-card`}>
      <p className="label">{title}</p>
      <p className={`figure ${isIncome ? "pos" : "neg"}`}>
        {isIncome ? "+" : "−"}
        <CountUp value={amount} format={money} />
      </p>
      <Link
        className="icon-btn"
        to={`/AddTransaction?type=${type}`}
        aria-label={`Add ${type}`}
      >
        <Icon aria-hidden="true" />
      </Link>
    </article>
  );
}

export function DashboardView({ transactions }) {
  const totalIncome = getTotalIncome(transactions);
  const totalExpense = getTotalExpense(transactions);
  const balance = totalIncome - totalExpense;

  return (
    <section className="bento" aria-label="Dashboard">
      <article className="card card-ink span-6 balance-card">
        <p className="label">Total Balance</p>
        <h1 className="balance-num">
          <CountUp value={balance} format={money} />
        </h1>
        <div className="meta-row">
          <div>
            <small>Income</small>
            <span className="lime">+{money(totalIncome)}</span>
          </div>
          <div>
            <small>Expense</small>
            <span className="expense-value">−{money(totalExpense)}</span>
          </div>
        </div>
        <CoinStack />
      </article>

      <SummaryCard title="Total Income" amount={totalIncome} type="income" />
      <SummaryCard title="Total Expense" amount={totalExpense} type="expense" />

      <article className="card card-chart span-5">
        <header className="card-head">
          <h2>Monthly Overview</h2>
        </header>
        <MonthlyBars transactions={transactions} />
      </article>

      <TransactionsView limit={5} title="Transactions" explore fetchOnMount={false} />
    </section>
  );
}
