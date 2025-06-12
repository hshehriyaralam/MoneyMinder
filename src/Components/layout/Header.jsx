import React from 'react';
import { theme } from '../theme/theme.js';
import InteractiveHoverButtonDemo from "../comman/InteractiveHover.jsx";
import ButtonComponent from "../comman/VerseButton.jsx";
import logo4 from "../../assets/images/Growth.png"
import { Link } from 'react-router-dom';
import { color } from 'framer-motion';
import logo from "../../assets/images/logo2.png"

const Header = () => {
  return (
    <header className={`w-full p-3 flex justify-between items-center bg-[#f7f7fa] shadow-md md:p-3 lg:p-2`}>
      <div className="flex items-center  ">
        <Link to={'/'}>
        <img src={logo4} alt="Logo" className="w-20 md:w-16 lg:w-28 " />
        </Link>
        <h1 className={`text-2xl md:text-2xl font-extrabold  tracking-wide font-sans  text-[#1E293B]`}>
          MoneyMinder
        </h1>
      </div>
        <div className="flex mx-3 gap-2 sm:gap-2 md:gap-3">
        {/* <InteractiveHoverButtonDemo Name={'Sign Up'} /> */}
        {/* <ButtonComponent Name={'Login'} /> */}
      </div>
    </header>
  );
};

export default Header;