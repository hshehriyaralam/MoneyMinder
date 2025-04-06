import React, { useContext, useState,useEffect } from "react";
import AnimatedAvatar from "@/Components/comman/AnimateAvtar";
import Input from "../comman/InputVerse";
import CategoryDropdown from "../ExpenseComponents/Dropdown";
import Button from "../UIverse/IncomeBuuton"
import CancellButton from "../UIverse/CancellBtn";
import { Context } from "@/Context/TransactionContext";
import { useNavigate } from "react-router-dom";
import AnimatedContent from "../comman/AnimatedContent";

const ExpenseForm = () => {
  const Navigate = useNavigate()
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(""); 
  const [time, setTime] = useState("")
  const {addExpenseTransaction,editTransaction,setEditTransaction} = useContext(Context)

   useEffect(() => {
       if(editTransaction){
         setAmount(editTransaction.amount)
         setCategory(editTransaction.category)
         setDescription(editTransaction.description)
         setDate(editTransaction.date)
         setTime(editTransaction.time)
       }
     },[editTransaction])

 


  const handleSubmit = (e) => {
    e.preventDefault();
    if(!amount || !category || !date || !time || !description){
      alert('please filll in the form')
      return
    }
    


    addExpenseTransaction(category, date, time, amount, description)
    setAmount('')
    setDescription('')
    setCategory('')
    setDate('')
    setTime('')
    setEditTransaction(null)
    Navigate('/')
  };


  const handleBack = (e) => {
    e.preventDefault()
    setEditTransaction(null)
    Navigate('/')
   }

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
    <div className="h-auto flex  items-center justify-center bg-transparent p-4 mb-20">
      <div className="w-full max-w-4xl bg-transparent  backdrop-blur-lg rounded-lg shadow-2xl p-1 flex flex-col ">
      <h1 className="text-[#0c2e5e] text-[28px] text-center mt-2 font-bold">{editTransaction ? "Edit Expense" : "Add Expense"}</h1>
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
              type="time"
              value={time} 
              onChange={(e) => setTime(e.target.value)}/>
              </div>
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
            <div className="flex gap-3 justify-center md:justify-start md:mx-8 py-5">
          <CancellButton  handleBack={handleBack}  />
          <Button onclick={handleSubmit} Name={editTransaction ? 'Update' : 'Add'} />
            </div>
          </form>
        </div>
      </div>
    </div>
    </AnimatedContent>
  );
};

export default ExpenseForm;