import React, { useContext, useState } from 'react';
import { Context } from '@/Context/TransactionContext';
import { useNavigate } from 'react-router-dom';
import { TextAnimate } from '../magicui/text-animate';
import CountUp from '../comman/CountUp';
import DecryptedText from '../Reactbits/DecryptedText';
import ShinyText from '../Reactbits/ShinnyText';
import Button from "../UIverse/EditButtton"
import  DeleteButton from "../UIverse/DeleteButton"
import Explore from '../UIverse/ExploreALL';



function TransactionHistory({showDesc}) {
  const Navigate = useNavigate();
  const { transactions, removeTransaction, setEditTransaction } = useContext(Context);
  const [showDescription, setShowDescription] = useState(() => showDesc)

  const getCategoryIcon = (category) => {
    const icons = {
      food: '🍔',
      transport: '🚗',
      salary: '💰',
      shopping: '🛍️',
      entertainment: '🎬',
      other: '🔹'
    };
    return icons[category.toLowerCase()] || icons.other;
  };

  return (
    <div className=" w-full p-5 my-5">
    <TextAnimate animation="slideLeft" by="character"  className={`text-center text-[30px] font-lexend font-bold my-3 text-[#1E3A5F] `} >
      Transactions
    </TextAnimate>
 
 
    <div className="overflow-x-auto text-center  rounded-b-lg  shadow-2xl">
  <div className="grid grid-cols-7   border-b-2 border-gray-500 rounded-b-lg  bg-transparent bg-opacity-80 backdrop-blur-sm p-3 font-semibold text-[17px] text-gray-100  ">
    <div className="px-3 py-1.5">Amount</div>
    <div className="px-3 py-1.5">Category</div>
    <div className="px-3 py-1.5">Date</div>
    <div className="px-3 py-1.5">Time</div>
    {showDescription && <div className="px-3 py-1.5">Description</div>}
    <div className="px-3 py-1.5">Type</div>
    <div className="px-3 py-1.5 text-center">Actions</div>
  </div>

  
        <div className="divide-y-2  my-5 divide-gray-200">
          {transactions.map((item) => (
            <div 
              key={item.id} 
               className="grid grid-cols-7 rounded-b-lg text-[15px] transition-colors items-end mt-4  "
            >
              
              <div className={`px-4 py-3 text-[17px] ${item.type === "income" ? "text-green-700 font-semibold" : "text-red-700 font-semibold"}`}>
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

              <div className="px-4 py-3 flex text[15px] items-center">
                <span className="mr-2">{getCategoryIcon(item.category)}</span>
                {item.category}
              </div>

              <div className="px-4 py-3 text-gray-800">
                   <DecryptedText
                   text={`${item.date}`}
                   animateOn="view"
                   revealDirection="center"
                    />
              </div>

              <div className="px-4 py-3 text-gray-800">
              <DecryptedText
                   text={`${item.time || "--:--"}`}
                   animateOn="view"
                   revealDirection="left"
                    />
               
              </div>

            
                {showDescription &&  <div className="px-4 py-3 text-[16px] text-gray-700 truncate">
                  {item.description}
                </div>}

              <div className="px-4 py-3">
                <span className={`inline-flex items-center px-2.5  py-0.5 rounded-full text-[10px] font-semibold ${
                  item.type === "income" 
                    ? "bg-green-700"  
                    : "bg-red-700"
                }`}>
                 <ShinyText text={`${item.type}`} disabled={false} speed={10} className='text-gray-200'  />
                </span>
              </div>


              <div className="px-4 py-3  flex justify-center items-center space-x-5">
                <Button Name={"Edit"}  onClick={() => {
                  setEditTransaction(item);
                  Navigate(`/AddTransaction?type=${item.type}`);
                  }} />
                    <DeleteButton  Name={'Delete'}  onClick={() => removeTransaction(item.id, item.type)} />
              </div>
            </div>
          ))}
          <div className='flex justify-end pr-6 mt-5'  >
              <Explore Name={'Explore All'} onClick={() => Navigate('/Transactions')}  />
          </div>
        </div>
      </div>

      {transactions.length === 0 && (
        <div className="text-center py-10 text-gray-700">
          No transactions found. Add your first transaction!
        </div>
      )}
    </div>
  );
}

export default TransactionHistory;