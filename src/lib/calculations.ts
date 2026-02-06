
export type TransactionType = "income" | "expense";

export interface Transaction {
  _id: string;
  amount: number | string;
  type: TransactionType;
  category: string;
  date: string;
  time: string;
  description: string;
  createdAt?: string;
}



//  Total Income
export const getTotalIncome = (transactions:  Transaction[]): number => {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((total, t) => total + Number(t.amount), 0);
}


//  Total Expense
export const getTotalExpense = (transactions:  Transaction[]): number => {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((total, t) => total + Number(t.amount), 0);
}

//  Total Expense For Pie Chart 
export const getTotalExpenseAmount = (
  transactions: Transaction[],
  selectedMonth: string
): number => {
  return transactions.reduce((total, t) => {
    const transactionMonth = t.createdAt
      ? t.createdAt.slice(0, 7)
      : t.date.slice(0, 7);

    if (t.type === "expense" && transactionMonth === selectedMonth) {
      return total + Math.abs(Number(t.amount));
    }
    return total;
  }, 0);
};

// Current Month Summary
export const getCurrentMonthSummary = (transactions: Transaction[]) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Filter transactions for current month/year
  const monthlyTransactions = transactions.filter((t) => {
    const tDate = new Date(t.date);
    return tDate.getFullYear() === currentYear && tDate.getMonth() === currentMonth;
  });

  const monthlyIncomeTransactions = monthlyTransactions.filter(t => t.type === "income");
  const monthlyExpenseTransactions = monthlyTransactions.filter(t => t.type === "expense");

  const monthlyIncomes = monthlyIncomeTransactions.reduce((total, t) => total + Number(t.amount), 0);
  const monthlyExpenses = monthlyExpenseTransactions.reduce((total, t) => total + Number(t.amount), 0);
  const monthlyBalance = monthlyIncomes - monthlyExpenses;

  // Expense summary per category
  const monthlyExpenseSummary: Record<string, number> = {};
  monthlyExpenseTransactions.forEach(t => {
    const cat = t.category;
    monthlyExpenseSummary[cat] = (monthlyExpenseSummary[cat] || 0) + Math.abs(Number(t.amount));
  });

  // Top Expense Category
  let topExpenseCategories: string | null = null;
  let topExpenseAmount = 0;
  for (const category in monthlyExpenseSummary) {
    if (monthlyExpenseSummary[category] > topExpenseAmount) {
      topExpenseAmount = monthlyExpenseSummary[category];
      topExpenseCategories = category;
    }
  }

  return {
    monthlyIncomes,
    monthlyExpenses,
    monthlyBalance,
    monthlyExpenseSummary,
    topExpenseCategories,
    topExpenseAmount,
  };
};
