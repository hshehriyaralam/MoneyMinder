import React, { useState } from "react";

const IncomeModal = ({ closeModal, addIncome }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("salary");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const income = { amount, category, date, description };
    addIncome(income);
    closeModal(); 
  };

  return (
    <div className="modal">
      <h2>Add Income</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            required
          />
        </label>
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="salary">Salary</option>
            <option value="freelance">Freelance</option>
            <option value="investment">Investment</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            placeholder="Add a description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />
        </label>
        <div className="modal-buttons">
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit">Add Income</button>
        </div>
      </form>
    </div>
  );
};

export default IncomeModal;