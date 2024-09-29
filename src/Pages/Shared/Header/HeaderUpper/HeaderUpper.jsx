import React from "react";
import "./HeaderUpper.css";
import moment from "moment/moment";

const HeaderUpper = () => {
  return (
    <div className="upper">
      <div className="z-30 ">
        <div className="text-center ">
          <h1 className="headerTitle">Birthday Count</h1>
          <p>
            <small>Count remaining day of your friends birthday</small>
          </p>
          <p className="font-bold">{moment().format("dddd, MMMM D, YYYY")}</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderUpper;
