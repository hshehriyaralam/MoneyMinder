import React, { useState } from "react";
import AnimatedAvatar from "@/Components/comman/AnimateAvtar";
import Input from "../comman/InputVerse";
import CustomDatePicker from "../comman/DatePicker";
import TextArea from "../comman/TextAreaVerse";
import CategoryDropdown from "../comman/Dropdown";

const IncomeForm = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("salary");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null); // State for selected date

  const handleSubmit = (e) => {
    e.preventDefault();
    const income = { amount, category, date, description };
    console.log("Income Added:", income);
  };

  return (
    <div className="h-auto flex border border-blue-900 items-center justify-center bg-transparent p-4">
      <div className="w-full max-w-4xl bg-transparent border border-gray-300 backdrop-blur-lg rounded-lg shadow-2xl p-2 flex flex-col">
        {/* Centered Heading */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mt-4">Add Income</h2>

        <div className="flex flex-col md:flex-row items-center">
          {/* Left Side - Animated Avatar */}
          <div className="flex items-center justify-center border border-gray-800 p-4">
            <AnimatedAvatar />
          </div>

          {/* Right Side - Form Inputs */}
          <form onSubmit={handleSubmit} className="flex-1 space-y-4 p-2">
            {/* Category Dropdown */}
            <div>
              <CategoryDropdown />
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <CustomDatePicker selectedDate={date} setSelectedDate={setDate} />
            </div>

            {/* Amount Input */}
            <div>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                label={"Amount"}
              />
            </div>

            {/* Description Textarea */}
            <div>
              <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                label={"Description"}
              />
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex gap-3">
              {/* <button
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
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IncomeForm;