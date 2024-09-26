import React from "react";
import "./SingleFriend.css";
import { FaTrash, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "@smastrom/react-rating/style.css";
import { Rating } from "@smastrom/react-rating";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import goCall from "../../../../JSFile/goCall";

const SingleFriend = ({ friend, handleDelete }) => {
  // console.log(friend);
  const { _id, name, image, dob, phone, ratting } = friend;
  return (
    <div className="mainCard bg-gray-500">
      <div className="cardImage">
        <img className="" src={image} alt="" />
      </div>
      <div className="text-center midPortionCard">
        <h1 className="font-bold text-green-500 italic text-[12px] md:text-[16px]">
          {name}
        </h1>
        <h1 className="font-bold text-orange-600 text-[12px] md:text-[16px]">
          {dob}
        </h1>
        <div className="flex gap-5 font-bold">
          <div>
            <Rating style={{ maxWidth: 90 }} value={ratting} readOnly />
          </div>
        </div>
        <p className="font-bold text-[12px] md:text-[16px]">
          Phone:{" "}
          <span className="text-yellow-500 " onClick={() => goCall(phone)}>
            {phone}
          </span>
        </p>
      </div>

      <div className="rightPortionOfCard">
        <Link to={`/birthday/${_id}`}>
          <button className="btn btn-group">
            {" "}
            <ManageAccountsIcon className="myIcon" />
          </button>
        </Link>
        <button
          className="btn btn-group bg-red-600 border-0"
          onClick={() => handleDelete(_id)}
        >
          {" "}
          <FaTrash className="myIcon" />{" "}
        </button>
      </div>
    </div>
  );
};

export default SingleFriend;
