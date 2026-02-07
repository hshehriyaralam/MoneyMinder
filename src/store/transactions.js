import { create } from "zustand";
import axios from "axios";

const useTransactionStore = create((set,get) => ({
  transactions: [],
  loading: false,
  editTransaction : null,





  // Setters 
  setEditTransaction: (transaction) => 
    set({editTransaction : transaction}),  

  clearEditTransaction: () => 
    set({editTransaction:  null}),


  // Fetch transactions
  fetchTransactions: async () => {
    set({ loading: true });

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/transactions/fetch-amounts`,
        {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
          },
        },
      );
      set({
        transactions: response.data.data,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching transactions:", error);
      set({ loading: false });
    }
  },

  // add transaction
addTransaction: async (transaction, showAlert) => {
  const { editTransaction } = get();

  try {
    // ✏️ EDIT TRANSACTION
    if (editTransaction) {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/transactions/edit/${editTransaction._id}`,
        transaction,
        { withCredentials: true }
      );

      const updatedTransaction = response.data.data;

      set((state) => ({
        transactions: state.transactions.map((t) =>
          t._id === updatedTransaction._id ? updatedTransaction : t
        ),
        editTransaction: null,
      }));
      showAlert?.("success", "Transaction updated successfully!");
    }

    // ➕ ADD TRANSACTION
    else {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/transactions/add-amount`,
        transaction,
        { withCredentials: true }
      );

      const newTransaction = response.data.data;

      set((state) => ({
        transactions: [newTransaction, ...state.transactions],
      }));
    showAlert?.("success", "Transaction added successfully!");

    }
  } catch (error) {
    console.error("Error adding transaction:", error.message);
    showAlert?.("error", "Add Amount Failed");
  }
},

// delete transaction
removeTransaction: async (id, showAlert) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/transactions/delete/${id}`,
        { withCredentials: true }
      );

      set((state) => ({
        transactions: state.transactions.filter((t) => t._id !== id),
      }));
      showAlert?.("success", "Transaction deleted successfully!");
    } catch (error) {
      console.error("Error deleting transaction:", error.message);
      showAlert?.("error", "Failed to delete transaction");
    }
},



}));

export default useTransactionStore;
