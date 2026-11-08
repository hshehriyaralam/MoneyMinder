import { useEffect } from "react";
import useTransactionStore from "@/store/transactions.js";
import { DashboardView } from "../ui/DashboardView";

const Dashboard = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const fetchTransactions = useTransactionStore((state) => state.fetchTransactions);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <DashboardView transactions={transactions} />
  );
};

export default Dashboard;
