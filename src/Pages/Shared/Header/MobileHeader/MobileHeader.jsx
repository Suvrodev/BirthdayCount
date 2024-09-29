import React, { useState } from "react";
import "./MobileHeader.css";
import logo from "../../../../assets/logo/logo.png";
import MobileHeaderOption from "./MobileHeaderOption/MobileHeaderOption";

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="absolute w-full  flex justify-between items-center py-2 px-5 ">
        <img src={logo} alt="" className=" w-[50px] h-[50px] rounded-full" />
        <div className="">
          <div
            className={`menu-icon ${isOpen ? "open" : ""}`}
            onClick={handleClick}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      {/* <div
        className={`absolute z-10  w-full transition-all duration-700 ${
          isOpen ? "top-[66px]" : "-top-[500px] "
        }`}
      >
        <MobileHeaderOption handleClick={handleClick} />
      </div> */}
      <div
        className={`absolute z-10  w-full transition-all duration-700 top-[66px] ${
          isOpen ? "left-0" : "-left-[500px] "
        }`}
      >
        <MobileHeaderOption handleClick={handleClick} />
      </div>
    </div>
  );
};

export default MobileHeader;
