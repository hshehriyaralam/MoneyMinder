import React, { useContext, useState } from 'react';
import { Context } from '@/Context/TransactionContext';
import { useNavigate } from 'react-router-dom';
import { TextAnimate } from '../magicui/text-animate';
import CountUp from '../comman/CountUp';
import DecryptedText from '../Reactbits/DecryptedText';
import ShinyText from '../Reactbits/ShinnyText';
import Button from "../UIverse/EditButtton";
import DeleteButton from "../UIverse/DeleteButton";
import Explore from '../UIverse/ExploreALL';
import { AnimatedList } from '../magicui/animated-list';

// Pagination Imports
import { Pagination, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '../ui/pagination';

function TransactionHistory({ limit, Name }) {
  const Navigate = useNavigate();
  const { transactions, removeTransaction, setEditTransaction } = useContext(Context);

  const [currentPage, setCurretPage] = useState(1);
  const itemsPerPage = 10;

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const hours12 = hours % 12 || 12;
    const ampm = hours >= 12 ? "PM" : "AM";
    return `${hours12}:${minutes} ${ampm}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      food: '🍔',
      transport: '🚗',
      salary: '💰',
      shopping: '🛍️',
      entertainment: '🎬',
      other: '🔹',
    };
    return icons[category.toLowerCase()] || icons.other;
  };
console.log(limit,"limit")
  if (limit === undefined) return null;

  const totalPage = Math.ceil(transactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const visibleTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPage) {
      setCurretPage(page);
    }
  };

  return (
    <div className="w-full p-4 sm:p-6">
    <TextAnimate
      delay={0.4}
      duration={1.9}
      animation="slideLeft"
      by="character"
      className="text-center text-2xl sm:text-3xl font-lexend font-bold text-[#082244]"
    >
      {Name}
    </TextAnimate>
  
    <div className="overflow-x-auto shadow-2xl mt-4">
      {/* Desktop headers (unchanged) */}
      <div className="hidden md:grid grid-cols-7 py-5 text-center border-b-2 border-gray-600 rounded-b-lg bg-transparent bg-opacity-80 backdrop-blur-sm p-3 font-semibold text-[17px] text-gray-100">
        <div>Amount</div>
        <div>Category</div>
        <div>Date</div>
        <div>Time</div>
        <div>Description</div>
        <div>Type</div>
        <div>Actions</div>
      </div>
  
      <div className="divide-y-1 py-3 divide-gray-200">
        {visibleTransactions.map((item) => (
          <div
            key={item.id}
            className="
              grid grid-cols-1 gap-3 p-4
              sm:grid-cols-2 sm:gap-4
              md:grid-cols-7 md:items-center md:gap-y-0
              text-[15px] sm:text-base
            "
          >
            {/* Row 1: Amount + Type (mobile) | Amount (desktop) */}
            <div className={`font-semibold text-[20px] sm:text-[17px] ${
              item.type === "income" ? "text-green-700" : "text-red-700"
            } md:col-span-1`}>
              {item.type === "income" ? "+" : "-"}$
              <CountUp from={0} to={item.amount} separator="," direction="up" duration={1} className="inline" />
              <span className="md:hidden ml-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  item.type === "income" ? "bg-green-700" : "bg-red-700"
                }`}>
                  <ShinyText text={`${item.type}`} disabled={false} speed={10} className="text-gray-200" />
                </span>
              </span>
            </div>
  
            {/* Row 1: Category */}
            <div className="flex items-center justify-center gap-2 sm:col-span-1 md:col-span-1">
              <span>{getCategoryIcon(item.category)}</span>
              {item.category}
            </div>
  
            {/* Row 1: Date (tablet+) | Combined Date/Time (mobile) */}
            <div className="text-black sm:col-span-1 md:col-span-1">
              <DecryptedText 
                text={formatDate(item.date)} 
                animateOn="view" 
                revealDirection="center" 
              />
              <span className="md:hidden"> | </span>
              <span className="md:hidden">
                <DecryptedText 
                  text={formatTime(item.time || "--:--")} 
                  animateOn="view" 
                  revealDirection="left" 
                />
              </span>
            </div>
  
            {/* Row 2: Time (tablet+) - hidden on mobile */}
            <div className="hidden sm:block text-black sm:col-span-1 md:col-span-1">
              <DecryptedText 
                text={formatTime(item.time || "--:--")} 
                animateOn="view" 
                revealDirection="left" 
              />
            </div>
  
            {/* Row 2: Type (tablet+) - hidden on mobile */}
            <div className="hidden sm:block md:col-span-1">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                item.type === "income" ? "bg-green-700" : "bg-red-700"
              }`}>
                <ShinyText text={`${item.type}`} disabled={false} speed={10} className="text-gray-200" />
              </span>
            </div>
  
            {/* Row 2: Actions */}
            <div className="flex justify-center space-x-3 sm:col-span-1 md:col-span-1">
              <Button
                Name={"Edit"}
                onClick={() => {
                  setEditTransaction(item);
                  Navigate(`/AddTransaction?type=${item.type}`);
                }}
              />
              <DeleteButton Name={"Delete"} onClick={() => removeTransaction(item.id, item.type)} />
            </div>
  
            {/* Row 3: Description (full width) */}
            <div className="text-black truncate sm:col-span-full md:col-span-1">
              {item.description}
            </div>
          </div>
        ))}
        
        {/* Rest of your existing code remains the same */}
        {limit === 6 && (
          <div className="flex justify-end pr-6 mt-5 my-5">
            <Explore Name={"Explore All"} onClick={() => Navigate('/Transactions')} />
          </div>
        )}
      </div>
    </div>
  
    {/* Pagination and empty state remain unchanged */}
    {limit === 'all' && transactions.length > itemsPerPage && (
      <div className="flex justify-center mt-4">
        <Pagination>
          {/* ... existing pagination code ... */}
        </Pagination>
      </div>
    )}
  
    {transactions.length === 0 && (
      <div className="text-center py-10 text-gray-700">
        No transactions found. Add your first transaction!
      </div>
    )}
  </div>
  );
}

export default TransactionHistory;
