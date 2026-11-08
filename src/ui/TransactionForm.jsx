import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useTransactionStore from "../store/transactions";
import { useAlert } from "../Context/AlertContext";
import { Segmented } from "./primitives";

const INCOME = ["salary", "freelance", "investment", "gift"];
const EXPENSE = ["food", "transport", "shopping", "bills", "entertainment"];
const STORAGE_KEY = "mm-categories";

function readCustom() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      income: Array.isArray(parsed.income) ? parsed.income : [],
      expense: Array.isArray(parsed.expense) ? parsed.expense : [],
    };
  } catch {
    return { income: [], expense: [] };
  }
}

export function TransactionForm({ lockedType, onSuccess, navigateOnSuccess = true }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showAlert } = useAlert();
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const editTransaction = useTransactionStore((state) => state.editTransaction);
  const clearEditTransaction = useTransactionStore((state) => state.clearEditTransaction);
  const editing = Boolean(editTransaction);
  const queryType = searchParams.get("type");
  const initialType =
    lockedType ||
    (editTransaction?.type === "expense"
      ? "expense"
      : queryType === "expense"
        ? "expense"
        : "income");

  const [type, setType] = useState(initialType);
  const [amount, setAmount] = useState(editTransaction?.amount ?? "");
  const [category, setCategory] = useState(editTransaction?.category ?? (initialType === "income" ? "salary" : ""));
  const [description, setDescription] = useState(editTransaction?.description ?? "");
  const [date, setDate] = useState(editTransaction?.date ? String(editTransaction.date).slice(0, 10) : "");
  const [time, setTime] = useState(editTransaction?.time ?? "");
  const [custom, setCustom] = useState(readCustom);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      if (!editing) return;
      clearEditTransaction();
    };
  }, [editing, clearEditTransaction]);

  const options = useMemo(() => {
    const base = type === "income" ? INCOME : EXPENSE;
    const extra = custom[type] || [];
    const current = category && ![...base, ...extra].includes(category) ? [category] : [];
    return [...base, ...extra, ...current];
  }, [type, custom, category]);

  const switchType = (next) => {
    setType(next);
    setCategory(next === "income" ? "salary" : "");
    setErrors({});
  };

  const saveCustom = () => {
    const name = draft.trim().toLowerCase();
    if (!name) return;
    const next = {
      ...custom,
      [type]: custom[type].includes(name) ? custom[type] : [...custom[type], name],
    };
    setCustom(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setCategory(name);
    setDraft("");
    setAdding(false);
  };

  const validate = () => {
    const next = {};
    if (!amount || Number(amount) <= 0) next.amount = "Enter an amount greater than 0.";
    if (!category) next.category = "Choose a category, or add your own.";
    if (!date) next.date = "Pick a date.";
    if (!time) next.time = "Pick a time.";
    if (!description.trim()) next.description = "Add a short description.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    if (!validate()) return;
    const before = JSON.stringify(useTransactionStore.getState().transactions);
    setSubmitting(true);
    try {
      await addTransaction(
        {
          category,
          date,
          time,
          amount,
          description: description.trim(),
          type: editing ? editTransaction.type : type,
        },
        (kind, message) => showAlert(kind, message),
      );
      const after = JSON.stringify(useTransactionStore.getState().transactions);
      if (before === after) return;
      if (navigateOnSuccess) navigate("/");
      onSuccess?.();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid" noValidate>
      {!editing && (
        <Segmented
          value={type}
          onChange={switchType}
          options={[
            { value: "income", label: "Income" },
            { value: "expense", label: "Expense" },
          ]}
        />
      )}

      <label className="field">
        <span>Category</span>
        <div className="chips" role="listbox" aria-label="Category">
          {options.map((item) => (
            <button
              key={item}
              type="button"
              role="option"
              aria-selected={category === item}
              className={`chip${category === item ? " on" : ""}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
          <button type="button" className="chip add" onClick={() => setAdding((open) => !open)}>
            + Add category
          </button>
        </div>
        {adding && (
          <div className="btn-row" style={{ marginTop: 8 }}>
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Category name"
              aria-label="New category"
              style={{ flex: 1, minHeight: 44, borderRadius: 16, border: "1px solid var(--hairline)", padding: "0 12px", background: "var(--surface)" }}
            />
            <button type="button" className="btn" onClick={saveCustom}>Add</button>
          </div>
        )}
        {errors.category && <em className="error" role="alert">{errors.category}</em>}
      </label>

      <div className="form-grid two">
        <label className="field">
          <span>Date</span>
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          {errors.date && <em className="error" role="alert">{errors.date}</em>}
        </label>
        <label className="field">
          <span>Time</span>
          <input type="time" value={time} onChange={(event) => setTime(event.target.value)} />
          {errors.time && <em className="error" role="alert">{errors.time}</em>}
        </label>
      </div>

      <label className="field">
        <span>Amount</span>
        <input
          inputMode="decimal"
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="0.00"
        />
        {errors.amount && <em className="error" role="alert">{errors.amount}</em>}
      </label>

      <label className="field">
        <span>Description</span>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="What was this for?"
        />
        {errors.description && <em className="error" role="alert">{errors.description}</em>}
      </label>

      <div className="btn-row sticky-actions">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            clearEditTransaction();
            if (onSuccess) onSuccess();
            else navigate("/");
          }}
        >
          Go back
        </button>
        <button type="submit" className="btn" disabled={submitting}>
          {submitting ? "Saving…" : editing ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}
