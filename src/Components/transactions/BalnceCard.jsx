import React from 'react'
import CashPick from "../../assets/images/CashAmount.png"
import CashPick1 from "../../assets/images/cash-amount2.png"


const BalnceCard = () => {
  return (
<div class="bg-gradient-to-b from-[#EDEAFC] to-[#CFDEF5] rounded-lg p-6 shadow-lg w-full md:w-4xl h-80 flex flex-col md:flex-row items-center justify-center">
<div class="flex-1">
    <h3 class="text-xl font-bold text-[#1E3A5F]">Total Balance</h3>
    <p     class="text-3xl font-semibold text-[#1E3A5F] mt-2">$5,000</p>
  </div>
  <img src={CashPick1} alt="Balance-Vector"  width={500} />
</div>
  )
}

export default BalnceCard
  