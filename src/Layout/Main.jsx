import React from "react";
import Header from "../Pages/Shared/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import HeaderUpper from "../Pages/Shared/Header/HeaderUpper/HeaderUpper";
import GoToTop from "../Pages/Shared/GoToTop/GoToTop";
import DesktoHeader from "../Pages/Shared/Header/DesktoHeader/DesktoHeader";
import MobileHeader from "../Pages/Shared/Header/MobileHeader/MobileHeader";

const Main = () => {
  return (
    <div>
      <div className="">
        <HeaderUpper></HeaderUpper>
      </div>
      <div className="hidden md:block">
        <DesktoHeader />
      </div>
      <div className="md:hidden">
        <MobileHeader />
      </div>

      {/* <Header></Header> */}
      <div>
        <Outlet></Outlet>
      </div>
      {/* <Footer></Footer> */}
      <GoToTop />
    </div>
  );
};

export default Main;
