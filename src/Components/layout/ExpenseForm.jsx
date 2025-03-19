import React, { useState } from "react";
import AnimatedAvatar from "@/Components/comman/AnimateAvtar";
import Input from "../comman/InputVerse";
import DatetimePickerDemo from "../comman/DatePicker";
import CategoryDropdown from "../ExpenseComponents/Dropdown";
import Button from "../UIverse/IncomeBuuton"
import CancellButton from "../UIverse/CancellBtn";



const ExpenseForm = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("salary");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const income = { amount, category, date, description };
    console.log("Income Added:", income);
  };

  return (
    <div className="h-auto flex  items-center justify-center bg-transparent p-4">
      <div className="w-full max-w-4xl bg-transparent  backdrop-blur-lg rounded-lg shadow-2xl p-1 flex flex-col">
      <h1 className="text-[#0c2e5e] text-[28px] text-center mt-2 font-bold">Add Expense</h1>
        <div className="flex flex-col md:flex-row items-center">
               <div className="flex items-center justify-center p-2  "> 
            <AnimatedAvatar />
          </div>
          <form onSubmit={handleSubmit} className="flex-1 space-y-6 ">
               <CategoryDropdown  selectedCategory={category} setSelectedCategory={setCategory} />
            <div>
              <label className="block text-sm font-medium text-gray-300">Date</label>
              <DatetimePickerDemo selectedDate={date} setSelectedDate={setDate} />
            </div>
            <div>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                label={"Amount"}
              />
            </div>
            <div>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                label={"Description"}
              />
            </div>
            <div className="flex gap-3">
          <CancellButton />
          <Button />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;