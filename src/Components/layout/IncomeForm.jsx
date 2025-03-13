import React, { useState } from "react";
import AnimatedAvatar from '@/Components/comman/AnimateAvtar'



const IncomeForm = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("salary");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const income = { amount, category, date, description };
    console.log("Income Added:", income);
  };

  return (
    <div className="h-96 flex items-center justify-center bg-transparent p-4">
      <div className="w-full max-w-4xl bg-transparent mt-10  backdrop-blur-lg rounded-lg shadow-2xl p-6 flex flex-col md:flex-row">
        {/* Avatar Section */}
        <div className="flex items-center justify-center md:justify-start md:items-start">
               <AnimatedAvatar  />
         
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add Income</h2>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              min="0"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              required
            >
              <option value="salary">Salary</option>
              <option value="freelance">Freelance</option>
              <option value="investment">Investment</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              required
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              placeholder="Add a description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              rows="2"
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 px-3 py-1.5 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            >
              Add Income
            </button>
            <button
              type="button"
              className="flex-1 px-3 py-1.5 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncomeForm;