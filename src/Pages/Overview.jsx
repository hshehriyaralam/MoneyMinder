import React, { useEffect, useMemo, useCallback ,lazy, Suspense  } from "react";
import { TextAnimate } from "../Components/magicui/text-animate";
import SavingCard from "../Components/OverviewComponents/SavingCard";
import useTransactionStore from "@/store/transactions.js";
import { getTotalExpense, getTotalIncome } from "@/lib/calculations.js";

const  CategoriesCard = lazy(() => import("../Components/OverviewComponents/CategoriesCard"));

const Overview = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const fetchTransactions = useTransactionStore(
    (state) => state.fetchTransactions,
  );

  const totalIncome = useMemo(
    () => getTotalIncome(transactions),
    [transactions],
  );

  const totalExpense = useMemo(
    () => getTotalExpense(transactions),
    [transactions],
  );

  const balanceAmount = useMemo(
    () => totalIncome - totalExpense,
    [totalIncome, totalExpense],
  );

  const buildCategoryMap = useCallback(() => {
    const map = {};

    transactions.forEach((t) => {
      const key = `${t.category}-${t.type}`;
      map[key] = (map[key] || 0) + Number(t.amount);
    });

    return map;
  }, [transactions]);

  const categoryWithPercentage = useMemo(() => {
    const categoryMap = buildCategoryMap();

    return Object.entries(categoryMap).map(([key, amount]) => {
      const [category, type] = key.split("-");

      const base = type === "income" ? totalIncome : totalExpense;

      const percentage = base > 0 ? Math.round((amount / base) * 100) : 0;

      return {
        category,
        type,
        amount,
        percentage: `${percentage}`,
      };
    });
  }, [buildCategoryMap, totalIncome, totalExpense]);

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <div className="min-h-screen w-full flex flex-col p-6 md:p-10 bg-transparent space-y-4  mb-14 md:mb-4">
      <TextAnimate
        delay={0.4}
        duration={1.9}
        animation="slideLeft"
        by="character"
        className="text-center text-4xl  font-lexend font-bold text-[#2d5385]"
      >
        {"Overview"}
      </TextAnimate>
      <div className="w-full flex justify-center">
        <SavingCard
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          BalanceAmount={balanceAmount}
        />
      </div>
      <div className="w-full flex flex-wrap gap-6 ">
        {categoryWithPercentage.length > 0 ? (
          categoryWithPercentage.map((item, index) => (
            <div key={index} className="flex-1 min-w-[250px] max-w-[400px]">

              
                    <Suspense fallback={<p>Loading...</p>}>
              <CategoriesCard
                category={item.category}
                type={item.type}
                amount={item.amount}
                percentage={item.percentage}
              />
                    </Suspense>
      
            </div>
          ))
        ) : (
          <p className="text-center w-full text-[#2d5385]">
            No transaction history.
          </p>
        )}
      </div>
    </div>
  );
};

export default Overview;
