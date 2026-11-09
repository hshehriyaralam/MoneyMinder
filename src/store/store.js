import { create } from "zustand";
import * as transactionApi from "./transaction.js";
import * as userApi from "./user.js";

let transactionsRequest;
let userRequest;
let sessionGeneration = 0;

const useAppStore = create((set, get) => ({
  transactions: [],
  transactionsLoaded: false,
  loading: false,
  fetchError: null,
  editTransaction: null,
  user: null,
  userLoaded: false,
  userLoading: false,
  userError: null,

  fetchTransactions: async ({ force = false } = {}) => {
    if (!force && get().transactionsLoaded) return get().transactions;
    if (transactionsRequest) return transactionsRequest;

    const generation = sessionGeneration;
    set({ loading: true, fetchError: null });
    const request = transactionApi.fetchTransactions()
      .then((transactions) => {
        if (generation === sessionGeneration) {
          set({ transactions, transactionsLoaded: true, loading: false, fetchError: null });
        }
        return transactions;
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        if (generation === sessionGeneration) {
          set({
            loading: false,
            fetchError: "Could not load transactions. Check your connection and try again.",
          });
        }
        return null;
      })
      .finally(() => {
        if (transactionsRequest === request) transactionsRequest = null;
      });

    transactionsRequest = request;
    return request;
  },

  fetchUser: async ({ force = false } = {}) => {
    if (!force && get().userLoaded) return get().user;
    if (userRequest) return userRequest;

    const generation = sessionGeneration;
    set({ userLoading: true, userError: null });
    const request = userApi.fetchUser()
      .then((user) => {
        if (generation === sessionGeneration) {
          set({ user, userLoaded: true, userLoading: false, userError: null });
        }
        return user;
      })
      .catch((error) => {
        if (generation !== sessionGeneration) return null;
        if (error.response?.status === 401 || error.response?.status === 404) {
          set({ user: null, userLoaded: true, userLoading: false, userError: null });
          return null;
        }
        console.error("Error fetching user:", error);
        set({ userLoading: false, userError: "Could not load your profile." });
        return null;
      })
      .finally(() => {
        if (userRequest === request) userRequest = null;
      });

    userRequest = request;
    return request;
  },

  signUp: (userData) => userApi.signUp(userData),

  logIn: async (credentials) => {
    get().resetSession();
    await userApi.logIn(credentials);
    await get().fetchUser({ force: true });
  },

  googleLogIn: async (accessToken) => {
    get().resetSession();
    const response = await userApi.googleLogIn(accessToken);
    const user = response.data?.user || response.data?.data?.user;
    if (user) {
      set({ user, userLoaded: true, userError: null });
    } else {
      await get().fetchUser({ force: true });
    }
  },

  updateUser: async (userData) => {
    const response = await userApi.updateUser(userData);
    const returnedUser = response.data?.user || response.data?.data?.user;
    const user = { ...get().user, ...returnedUser, ...userData };
    set({ user, userLoaded: true });
    return user;
  },

  uploadProfilePicture: async (formData) => {
    const response = await userApi.uploadProfilePicture(formData);
    const picture = response.data?.profilePicture || response.data?.user?.profilePicture;
    if (!picture) throw new Error("Profile picture response did not include the uploaded image.");
    const user = { ...get().user, profilePicture: picture };
    set({ user, userLoaded: true });
    return picture;
  },

  logOut: async () => {
    await userApi.logOut();
    get().resetSession();
  },

  deleteAccount: async () => {
    let accountDeleteRequested = false;
    let transactions = get().transactions;
    if (!get().transactionsLoaded) {
      transactions = await get().fetchTransactions();
      if (!transactions) throw new Error("Could not verify account transactions before deletion.");
    }

    for (const transaction of transactions) {
      if (!transaction?._id) {
        throw new Error("An account transaction is missing its identifier.");
      }
      await transactionApi.deleteTransaction(transaction._id);
      set((state) => ({
        transactions: state.transactions.filter((item) => item._id !== transaction._id),
      }));
    }

    accountDeleteRequested = true;
    try {
      await userApi.deleteUser();
    } catch (error) {
      if (!(accountDeleteRequested && error.response?.status === 404)) throw error;
    }

    get().resetSession();
  },

  addTransaction: async (transaction, showAlert) => {
    const { editTransaction } = get();
    try {
      if (editTransaction) {
        const updated = await transactionApi.updateTransaction(editTransaction._id, transaction);
        set((state) => ({
          transactions: state.transactions.map((item) =>
            item._id === updated._id ? updated : item,
          ),
          editTransaction: null,
        }));
        showAlert?.("success", "Transaction updated successfully!");
        return true;
      }

      const created = await transactionApi.createTransaction(transaction);
      set((state) => ({
        transactions: [created, ...state.transactions],
        transactionsLoaded: true,
      }));
      showAlert?.("success", "Transaction added successfully!");
      return true;
    } catch (error) {
      console.error("Error saving transaction:", error);
      showAlert?.("error", editTransaction ? "Update failed" : "Add Amount Failed");
      return false;
    }
  },

  removeTransaction: async (id, showAlert) => {
    try {
      await transactionApi.deleteTransaction(id);
      set((state) => ({
        transactions: state.transactions.filter((item) => item._id !== id),
      }));
      showAlert?.("success", "Transaction deleted successfully!");
      return true;
    } catch (error) {
      console.error("Error deleting transaction:", error);
      showAlert?.("error", "Failed to delete transaction");
      return false;
    }
  },

  setEditTransaction: (editTransaction) => set({ editTransaction }),
  clearEditTransaction: () => set({ editTransaction: null }),

  clearTransactions: () => set({
    transactions: [],
    transactionsLoaded: false,
    fetchError: null,
    loading: false,
    editTransaction: null,
  }),

  resetSession: () => {
    sessionGeneration += 1;
    transactionsRequest = null;
    userRequest = null;
    set({
      transactions: [],
      transactionsLoaded: false,
      loading: false,
      fetchError: null,
      editTransaction: null,
      user: null,
      userLoaded: true,
      userLoading: false,
      userError: null,
    });
  },
}));

export default useAppStore;
