import { memo, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import useTransactionStore from "../store/transactions";
import { useAlert } from "../Context/AlertContext";
import { formatDate, formatTime, money } from "./format";
import { EmptyState, Modal, Segmented } from "./primitives";
import { TransactionForm } from "./TransactionForm";

function useDebounced(value, delay = 200) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

const RowActions = memo(function RowActions({ onEdit, onDelete }) {
  return (
    <>
      <button type="button" className="mini" onClick={onEdit}>Edit</button>
      <button type="button" className="mini danger" onClick={onDelete}>Delete</button>
    </>
  );
});

export function TransactionsView({
  limit = "all",
  title = "Transactions",
  explore = false,
  fetchOnMount = true,
}) {
  const { showAlert } = useAlert();
  const transactions = useTransactionStore((state) => state.transactions);
  const fetchError = useTransactionStore((state) => state.fetchError);
  const fetchTransactions = useTransactionStore((state) => state.fetchTransactions);
  const removeTransaction = useTransactionStore((state) => state.removeTransaction);
  const setEditTransaction = useTransactionStore((state) => state.setEditTransaction);

  const [type, setType] = useState("all");
  const [floor, setFloor] = useState(0);
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [editing, setEditing] = useState(null);
  const debouncedFloor = useDebounced(floor);
  const pageSize = 10;

  useEffect(() => {
    if (fetchOnMount) fetchTransactions();
  }, [fetchOnMount, fetchTransactions]);

  const bounds = useMemo(() => {
    if (!transactions.length) return { min: 0, max: 0 };
    const amounts = transactions.map((item) => Number(item.amount) || 0);
    return { min: Math.min(...amounts), max: Math.max(...amounts) };
  }, [transactions]);

  useEffect(() => {
    setFloor(bounds.min);
  }, [bounds.min]);

  const sorted = useMemo(() => {
    return [...transactions].sort((a, b) => {
      const aKey = a.createdAt || `${a.date || ""}T${a.time || "00:00"}`;
      const bKey = b.createdAt || `${b.date || ""}T${b.time || "00:00"}`;
      return String(bKey).localeCompare(String(aKey));
    });
  }, [transactions]);

  const filtered = useMemo(() => {
    if (limit !== "all") return sorted.slice(0, limit);
    return sorted.filter((item) => {
      const amountOk = Number(item.amount) >= Number(debouncedFloor || 0);
      const typeOk = type === "all" || item.type === type;
      return amountOk && typeOk;
    });
  }, [sorted, limit, debouncedFloor, type]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = limit === "all" ? filtered.slice((page - 1) * pageSize, page * pageSize) : filtered;

  useEffect(() => {
    setPage(1);
  }, [type, debouncedFloor]);

  const askDelete = (item) => setPendingDelete(item);
  const confirmDelete = () => {
    if (!pendingDelete) return;
    removeTransaction(pendingDelete._id, (kind, message) => showAlert(kind, message));
    setPendingDelete(null);
  };

  const openEdit = (item) => {
    setEditTransaction(item);
    setEditing(item);
  };

  return (
    <article className={`card ${explore ? "span-7" : "span-12"}`}>
      <header className="card-head">
        <h2>{title}</h2>
      </header>

      {fetchError && <p className="data-error" role="alert">{fetchError}</p>}

      {limit === "all" && (
        <div className="filters">
          <label className="field">
            <span>Minimum amount · {money(floor)}</span>
            <input
              className="range"
              type="range"
              min={bounds.min}
              max={bounds.max || 0}
              step="1"
              value={floor}
              onChange={(event) => setFloor(Number(event.target.value))}
              aria-label="Minimum amount"
            />
          </label>
          <Segmented
            value={type}
            onChange={setType}
            options={[
              { value: "all", label: "All" },
              { value: "income", label: "Income" },
              { value: "expense", label: "Expense" },
            ]}
          />
        </div>
      )}

      {!visible.length && fetchError ? (
        <EmptyState
          title="Transactions couldn’t be loaded"
          body="Check your connection, then try again."
          action={<button type="button" className="btn" onClick={fetchTransactions}>Try again</button>}
        />
      ) : !visible.length ? (
        <EmptyState
          title="No transactions yet"
          body={limit === "all" ? "Nothing matches these filters. Lower the amount or switch type." : "Add your first income or expense and it will show up here."}
          action={explore ? <Link className="btn" to="/AddTransaction">Add a transaction</Link> : null}
        />
      ) : (
        <>
          <table className="tx-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Date</th>
                {limit === "all" && <th>Time</th>}
                {limit === "all" && <th>Description</th>}
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((item) => (
                <tr key={item._id}>
                  <td><span className="clip" title={item.category}>{item.category}</span></td>
                  <td className={`num tabular ${item.type === "income" ? "pos" : "neg"}`}>
                    {item.type === "income" ? "+" : "−"}{money(item.amount)}
                  </td>
                  <td><span className={`tag tag-${item.type}`}>{item.type}</span></td>
                  <td className="tabular">{formatDate(item.date)}</td>
                  {limit === "all" && <td className="tabular">{formatTime(item.time)}</td>}
                  {limit === "all" && <td><span className="clip" title={item.description}>{item.description}</span></td>}
                  <td className="actions">
                    <RowActions onEdit={() => openEdit(item)} onDelete={() => askDelete(item)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="tx-list">
            {visible.map((item) => (
              <div className="tx-row" key={item._id}>
                <div>
                  <strong title={item.category}>{item.category}</strong>
                  <em>{formatDate(item.date)}{item.time ? ` · ${formatTime(item.time)}` : ""}</em>
                  <div className="row-actions">
                    <RowActions onEdit={() => openEdit(item)} onDelete={() => askDelete(item)} />
                  </div>
                </div>
                <div className="right">
                  <div className={`tabular ${item.type === "income" ? "pos" : "neg"}`}>
                    {item.type === "income" ? "+" : "−"}{money(item.amount)}
                  </div>
                  <span className={`tag tag-${item.type}`}>{item.type}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {explore && (
        <div className="card-foot">
          <Link className="pill" to="/Transactions">
            Explore All <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {limit === "all" && filtered.length > pageSize && (
        <div className="pager">
          <button type="button" className="mini" disabled={page === 1} onClick={() => setPage((n) => n - 1)}>Prev</button>
          <span className="tabular">{page} / {pages}</span>
          <button type="button" className="mini" disabled={page === pages} onClick={() => setPage((n) => n + 1)}>Next</button>
        </div>
      )}

      {pendingDelete && (
        <Modal title="Delete this transaction?" onClose={() => setPendingDelete(null)}>
          <p>
            {pendingDelete.category} · {money(pendingDelete.amount)} will be removed. This can’t be undone.
          </p>
          <div className="btn-row">
            <button type="button" className="btn btn-ghost" onClick={() => setPendingDelete(null)}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
          </div>
        </Modal>
      )}

      {editing && (
        <Modal
          title={`Edit ${editing.type}`}
          onClose={() => setEditing(null)}
          className="edit-transaction-modal"
        >
          <TransactionForm
            lockedType={editing.type}
            navigateOnSuccess={false}
            onSuccess={() => setEditing(null)}
          />
        </Modal>
      )}
    </article>
  );
}
