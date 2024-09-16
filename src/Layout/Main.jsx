import React from "react";
import Header from "../Pages/Shared/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import HeaderUpper from "../Pages/Shared/Header/HeaderUpper/HeaderUpper";

const Main = () => {
  return (
    <div>
      <HeaderUpper></HeaderUpper>
      <Header></Header>
      <Outlet></Outlet>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default Main;
