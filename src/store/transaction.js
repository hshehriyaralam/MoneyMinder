import axios from "axios";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

export async function fetchTransactions() {
  const response = await axios.get(`${API_BASE_URL}/api/transactions/fetch-amounts`, {
    withCredentials: true,
    headers: { "Cache-Control": "no-cache" },
  });
  if (!Array.isArray(response.data?.data)) {
    throw new Error("Unexpected transactions response");
  }
  return response.data.data;
}

export async function createTransaction(transaction) {
  const response = await axios.post(
    `${API_BASE_URL}/api/transactions/add-amount`,
    transaction,
    { withCredentials: true },
  );
  return response.data.data;
}

export async function updateTransaction(id, transaction) {
  const response = await axios.put(
    `${API_BASE_URL}/api/transactions/edit/${id}`,
    transaction,
    { withCredentials: true },
  );
  return response.data.data;
}

export async function deleteTransaction(id) {
  return axios.delete(`${API_BASE_URL}/api/transactions/delete/${id}`, {
    withCredentials: true,
  });
}
