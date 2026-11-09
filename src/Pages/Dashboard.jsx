import { useEffect } from "react";
import useAppStore from "@/store/store.js";
import { DashboardView } from "../ui/DashboardView";

const Dashboard = () => {
  const transactions = useAppStore((state) => state.transactions);
  const fetchTransactions = useAppStore((state) => state.fetchTransactions);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <DashboardView transactions={transactions} />
  );
};

export default Dashboard;
