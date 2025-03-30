import React, { useContext, useState } from "react";
import AnimatedAvatar from "@/Components/comman/AnimateAvtar";
import Input from "../comman/InputVerse";
import DatetimePickerDemo from "../comman/DatePicker";
import CategoryDropdown from "../comman/Dropdown";
import Button from "../UIverse/IncomeBuuton"
import CancellButton from "../UIverse/CancellBtn";
import { useNavigate } from "react-router-dom";
import { Context } from "@/Context/TransactionContext";



const IncomeForm = () => {
  const Navigate = useNavigate()
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("salary");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const {incomeUpdate} = useContext(Context)
  const {CategoryUpdate} = useContext(Context)

  const handleSubmit = (e) => {
    e.preventDefault();
    incomeUpdate(amount)
    CategoryUpdate(category)
    setAmount('')
    setDescription('')
    setCategory('')
    setDate('')
    setTime('')
    Navigate('/')

    const income = { amount, category, date, description, time};
    console.log("Income Added:", income);
  };

  return (
    <div className="h-auto flex  items-center justify-center bg-transparent p-4 mb-20">
      <div className="w-full max-w-4xl bg-transparent  backdrop-blur-lg rounded-lg shadow-2xl p-1 flex flex-col">
      <h1 className="text-[#0c2e5e] text-[28px] text-center mt-2 font-bold">Add Income</h1>
        <div className="flex flex-col md:flex-row items-center">
               <div className="flex items-center justify-center p-2  "> 
            <AnimatedAvatar />
          </div>
          <form onSubmit={handleSubmit} className="flex-1 space-y-6 ">
               <CategoryDropdown  selectedCategory={category} setSelectedCategory={setCategory} />
            <div className="flex gap-x-4" >
              <div>
              <label className=" block text-sm font-medium text-gray-300">Date :</label>
              <input
              className="w-[100%]  border-b  text-sm  border-gray-300 rounded-xl mt-1  py-1 px-3
              outline-none text-gray-300 focus:border-1   focus:border-blue-900
              "
              type="Date"
              value={date} 
      
              onChange={(e) => setDate(e.target.value)}  />
              </div>
              <div>

               <label className=" block  text-sm font-medium text-gray-300">Time :</label>
              <input
              className="w-[100%] space-y-2 border-b text-sm border-gray-300 rounded-xl mt-1  py-1 px-3
              outline-none text-gray-300 focus:border-1   focus:border-blue-900
              "
              type="Time"
              value={time} 
              onChange={(e) => setTime(e.target.value)}  />
              </div>
            </div>
            
            <div>
              <Input
              type={'number'}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                label={"Amount"}
                
              />
            </div>
            <div>
              <Input
              type={'text'}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                label={"Description"}
              />
            </div>
            <div className="flex gap-3 justify-center md:justify-start md:mx-8 py-5">
          <CancellButton  Navigate={() => Navigate('/')} />
          <Button  onclick={handleSubmit} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IncomeForm;