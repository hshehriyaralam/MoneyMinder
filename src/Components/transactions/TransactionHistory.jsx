import React, { useContext, useState } from 'react';
import { Context } from '../../Context/TransactionContext.jsx';
import { useNavigate } from 'react-router-dom';
import CountUp from '../comman/CountUp';
import DecryptedText from '../Reactbits/DecryptedText';
import ShinyText from '../Reactbits/ShinnyText';
import Button from "../UIverse/EditButtton";
import DeleteButton from "../UIverse/DeleteButton";
import Explore from '../UIverse/ExploreALL';
import { Pagination, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '../ui/pagination';
import Filters from '../layout/Filters';
import SplitText from "../Reactbits/SplitText.jsx"



function TransactionHistory({ limit, Name }) {
  const Navigate = useNavigate();
  const { transactions, removeTransaction, setEditTransaction,triggerTransactionRefresh } = useContext(Context);
  const [filterValue, setFilterValue] = useState(100);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const sortedTransactions = React.useMemo(() => {
    return [...transactions].sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return b.id - a.id;
    });
  }, [transactions]);
  
  const filteredTrnsaction = React.useMemo(() => {
    return sortedTransactions.filter((tnx) => {
      const isAboveAmount = tnx.amount >= filterValue;
      const isCategoryMatch =
        selectedCategory === "All" || tnx.type?.toLowerCase() === selectedCategory?.toLowerCase();
      return isAboveAmount && isCategoryMatch;
    });
  }, [sortedTransactions, filterValue, selectedCategory]);

  const getVisibleTransactions = () => {
    if (limit === 6) {
      return sortedTransactions.slice(0, 6);
    } else {
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      return filteredTrnsaction.slice(indexOfFirstItem, indexOfLastItem);
    }
  };

  const formatTime = (time) => {
    if (!time) return "--:--";
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
    return icons[category?.toLowerCase()] || icons.other;
  };

  if (limit === undefined) return null;

  const visibleTransactions = getVisibleTransactions();
  const totalPage = Math.ceil(filteredTrnsaction.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full p-4 sm:p-6   md:mb-2 mb-15">
      <div className='flex justify-center'>
      <SplitText
        text={`${Name}`}
        className="text-3xl md:text-[32px] font-lexend font-bold text-[#2d5385]"
        delay={150}
        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
        easing="easeOutCubic"
        threshold={0.2}
        rootMargin="-50px"
        />md:mb-0  mb-15
        </div>
      <div className='mx-10'>
        { limit === 'all' &&   (<Filters 
        onSelectValue={setFilterValue} 
        selectedCategory={selectedCategory} 
        setSelectCategory={setSelectedCategory}
      />)}
      </div>

      <div className="overflow-x-auto  mt-4 ">
        <div className="hidden md:grid grid-cols-7 py-5 text-center border-b-2 border-[#4b5563] rounded-b-lg bg-transparent bg-opacity-80 backdrop-blur-sm p-3 font-semibold text-[17px] text-[#4b5563]">
          <div>Category</div>
          <div>Amount</div>
          <div>Type</div>
          <div>Date</div>
          <div>Time</div>
          <div>Description</div>
          <div>Actions</div>
        </div>

        <div className="divide-y-1 py-3 divide-[#4b5563] text-[#4b5563]   ">
          {visibleTransactions.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-1 md:grid-cols-7 gap-y-3 rounded-b-lg md:gap-y-0 md:items-end   md:mt-3 p-4 md:text-[15px] text-1xl  mx-8 md:mx-0 text-center "
            >
      

              {/* Category */}
              <div className="flex items-start justify-center md:justify-start md:mx-8 mx-0 text-[#4b5563]">
                <span>{getCategoryIcon(item.category)}</span>
                {item.category}
              </div>

                   {/* amount */}
                   <div className={`font-semibold md:text-[17px] text-[18px] ${
                item.type === "income" ? "text-[#11bb52]" : "text-[#e70c0c]"
              }`}>
                {item.type === "income" ? "+" : "-"}$
                <CountUp 
                  from={0} 
                  to={item.amount} 
                  separator="," 
                  direction="up" 
                  duration={1} 
                  className="inline" 
                />
              </div>

               {/* Type */}
               <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  item.type === "income" ? "bg-[#11bb52]" : "bg-[#e70c0c]"
                }`}>
                  <ShinyText 
                    text={`${item.type}`} 
                    disabled={false} 
                    speed={10} 
                    className="text-gray-200" 
                  />
                </span>
              </div>

              {/* Date */}
              <div className="text-[#4b5563]">
                <DecryptedText 
                  text={formatDate(item.date)} 
                  animateOn="view" 
                  revealDirection="center" 
                />
              </div>
              {/* Time */}
              <div className="text-[#4b5563]">
                <DecryptedText 
                  text={formatTime(item.time)} 
                  animateOn="view" 
                  revealDirection="left" 
                />
              </div>

              {/* Description */}
              <div className="text-[#4b5563] text-sm truncate">
                {item.description}
              </div>
             

              {/* Actions */}
              <div className="flex md:justify-center  items-center justify-center space-x-3">
                <Button
                  Name={"Edit"}
                  onClick={() => {
                    setEditTransaction(item);
                    Navigate(`/AddTransaction?type=${item.type}`);
                  }}
                />
                <DeleteButton 
                  Name={"Delete"} 
                  onClick={() => removeTransaction(item._id)} 
                />
              </div>
            </div>
          ))}

          {limit === 6 && (
            <div
            onClick={() => Navigate('/Transactions')}
            className="flex justify-end pr-6 mt-5 my-2 cursor-pointer z-[9999]">
              <Explore 
                Name={"Explore All"} 
                onClick={() => Navigate('/Transactions')} 
              />
            </div>
          )}
        </div>
      </div>

      {limit === 'all' && sortedTransactions.length > itemsPerPage && (
        <div className="flex list-none text-[#1f2937] font-bold justify-center mt-4 z-[9999]">
          <Pagination>
            <PaginationItem>
              <PaginationPrevious 
              className={`z-[9999]`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1} 
              />
            </PaginationItem>

            {Array.from({ length: totalPage }, (_, index) => (
              <PaginationItem className="cursor-pointer " key={index}>
                <PaginationLink
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                  className={"font-semibold z-[9999] "}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPage} 
              />
            </PaginationItem>
          </Pagination>
        </div>
      )}

      {sortedTransactions.length === 0 && (
        <div className="text-center py-10 text-[#4b5563]">
          No transactions found. Add your first transaction!
        </div>
      )}
    </div>
  );
}

export default TransactionHistory;