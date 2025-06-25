import React, { useContext, useState, useEffect } from "react";
import AnimatedAvatar from "../comman/AnimateAvtar";
import Input from "../comman/InputVerse";
import CategoryDropdown from "../ExpenseComponents/Dropdown";
import Button from "../UIverse/IncomeBuuton";
import CancellButton from "../UIverse/CancellBtn";
import { Context } from "../../Context/TransactionContext.jsx";
import { useNavigate } from "react-router-dom";
import AnimatedContent from "../comman/AnimatedContent";
import { Context } from "../../Context/TransactionContext.jsx";

const ExpenseForm = () => {
  const Navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const { addTransaction, editTransaction, setEditTransaction,triggerTransactionRefresh } = useContext(Context);

  useEffect(() => {
    if (editTransaction) {
      setAmount(editTransaction.amount);
      setCategory(editTransaction.category);
      setDescription(editTransaction.description);
      setDate(editTransaction.date);
      setTime(editTransaction.time);
    }
  }, [editTransaction]);

  useEffect(() => {
    return () => {
      setEditTransaction(null);
      resetForm();
    };
  }, []);

  const resetForm = () => {
    setAmount('');
    setDescription('');
    setCategory('');
    setDate('');
    setTime('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyFields = [];

    if (!amount) emptyFields.push("Amount");
    if (!category) emptyFields.push("Category");
    if (!date) emptyFields.push("Date");
    if (!time) emptyFields.push("Time");
    if (!description) emptyFields.push("Description");

    if (emptyFields.length > 0) {
      setMissingFields(emptyFields);
      setShowErrorModal(true);
      return;
    }

    addTransaction({
      category,
      date,
      time,
      amount,
      description,
      type: "expense"
    });

    resetForm();
    triggerTransactionRefresh()
    Navigate('/Dashbaord');
  };

  const handleBack = (e) => {
    e.preventDefault();
    setEditTransaction(null);
    Navigate('/Dashbaord');
  };

  return (
    <AnimatedContent
      distance={300}
      direction="vertical"
      reverse={false}
      config={{ tension: 80, friction: 20 }}
      initialOpacity={0.2}
      animateOpacity
      scale={1.1}
      threshold={0.2}
    >
      <div className={`h-auto flex items-center justify-center bg-transparent p-4 mb-35 md:mb-5 ${showErrorModal ? "blur-sm pointer-events-none" : ""}`}>
        <div className="w-full max-w-4xl bg-transparent backdrop-blur-lg rounded-lg  p-1 flex flex-col">
          <h1 className="text-[#1f2937] text-[26px] text-center mt-2 font-bold">
            {editTransaction ? "Edit Expense" : "Add Expense"}
          </h1>
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex items-center justify-center p-2">
              <AnimatedAvatar />
            </div>
            <form onSubmit={handleSubmit} className="flex-1 space-y-6">
              <CategoryDropdown selectedCategory={category} setSelectedCategory={setCategory} />
              <div className="flex gap-x-4">
                <div>
                  <label className="block text-sm font-medium text-[#4b5563]">Date :</label>
                  <input
                    className="w-[100%] border-b-2 text-sm border-gray-900 rounded-xl mt-1 py-1 px-3 outline-none text-black focus:border-1 focus:border-blue-900"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4b5563]">Time :</label>
                  <input
                    className="w-[100%] space-y-2 border-b-2 text-sm border-gray-900 rounded-xl mt-1 py-1 px-3 outline-none text-black focus:border-1 focus:border-blue-900"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  label={"Amount"}
                />
              </div>
              <div>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  label={"Description"}
                />
              </div>
              <div className="flex gap-3 justify-center md:justify-start md:mx-8 py-5">
                <CancellButton handleBack={handleBack} value={'Go Back'} />
                <Button onclick={handleSubmit} Name={editTransaction ? 'Update' : 'Add'} />
              </div>
            </form>
          </div>
        </div>
      </div>

      {showErrorModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-intent rounded-lg p-6 shadow-xl w-96">
            <h2 className="text-xl font-bold text-[#1f2937] mb-4 text-center">
              Please Fill in All Required Fields
            </h2>
            <ul className="list-disc list-inside text-left text-[#4b5563]">
              {missingFields.map((field, index) => (
                <li key={index}>{field}</li>
              ))}
            </ul>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowErrorModal(false)}
                className="bg-[#149a65] hover:bg-[#1E3A5F] text-gray-100 hover:text-gray-300 px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AnimatedContent>
  );
};

export default ExpenseForm;