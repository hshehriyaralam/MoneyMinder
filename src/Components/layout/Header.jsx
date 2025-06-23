import React from 'react';
import logo4 from "../../assets/images/Growth.png"
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className={`w-full p-3 flex justify-between items-center bg-[#FAF9F6] shadow-md md:p-3 lg:p-2`}>
      <div className="flex items-center  ">
        <Link to={'/Dashbaord'}>
        <img src={logo4} alt="Logo" className="w-20 md:w-16 lg:w-28 " />
        </Link>
        <h1 className={`text-2xl md:text-2xl font-extrabold  tracking-wide font-sans  text-[#1E293B]`}>
          MoneyMinder
        </h1>
      </div>
        <div className="flex mx-3 gap-2 sm:gap-2 md:gap-3">
      </div>
    </header>
  );
};

export default Header;