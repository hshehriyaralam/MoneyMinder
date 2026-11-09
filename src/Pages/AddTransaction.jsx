import useAppStore from "@/store/store.js";
import { TransactionForm } from "../ui/TransactionForm";

const AddTransaction = () => {
  const editTransaction = useAppStore((state) => state.editTransaction);

  return (
    <section className="card form-card">
      <header className="card-head">
        <h1 className="section-title">
          {editTransaction ? "Edit Transaction" : "Add Transaction"}
        </h1>
      </header>
      <TransactionForm />
    </section>
  );
};

export default AddTransaction;
