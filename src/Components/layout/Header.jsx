import React from 'react';
import { theme } from '../theme/theme.js';
import InteractiveHoverButtonDemo from "../comman/InteractiveHover.jsx";
import ButtonComponent from "../comman/VerseButton.jsx";
import Logo from "../../assets/images/Finace_logo.png";

const Header = () => {
  return (
    <header className="w-full p-3 flex justify-between items-center bg-gradient-to-l from-[#34E89E] to-[#0F3443] shadow-md md:p-3 lg:p-3">
      <div className="flex items-center">
        <img src={Logo} alt="Logo" className="w-12 md:w-14 lg:w-18" />
        <h1 className="text-lg md:text-2xl font-extrabold text-[#1E40AF] tracking-wide font-sans  text-[#009087]">
          MoneyMinder
        </h1>
      </div>
        <div className="flex gap-2 sm:gap-2 md:gap-3">
        <InteractiveHoverButtonDemo Name={'Sign Up'} />
        <ButtonComponent Name={'Login'} />
      </div>
    </header>
  );
};

export default Header;