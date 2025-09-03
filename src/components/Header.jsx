import React from "react";
import logo from "../assets/logo.svg";
import { RiMenuFoldLine } from "react-icons/ri";


const Header = () => {
  return (
    <div className="bg-[#f3fff7] flex justify-between px-3 py-1 sticky top-0 items-center z-40 shadow-md">
      <img src={logo} alt="" />
      <RiMenuFoldLine size={24} className="cursor-pointer"/>
    </div>
  );
};

export default Header;
