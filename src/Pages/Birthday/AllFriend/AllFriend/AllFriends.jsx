import React, { useContext, useEffect, useState } from "react";
import "./AllFriends.css";
import SingleFriend from "../SingleFriend/SingleFriend";
import { AuthContext } from "../../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Remaining from "../RIghtRemaining/Remaining/Remaining";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { DataContext } from "../../../../Provider/BirthDayDataProvider";

const AllFriends = () => {
  const { user, successfullToast, baseUrl, databseUser } =
    useContext(AuthContext);
  const { peoples, isLoading } = useContext(DataContext);
  ///For Total Janogon start
  const [check, setCheck] = useState(true);
  // const [peoples, setpeoples] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   axios.get(`${baseUrl}bds?email=${databseUser?.email}`).then((res) => {
  //     setpeoples(res.data);
  //     setIsLoading(false);
  //   });
  // }, [check]);
  // console.log("Total Peoples: ", peoples);
  ///For Total Janogon end

  ///Delete Work start
  const handleDelete = (_id) => {
    // console.log("Delete: ",_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        ///Delete Start
        fetch(`${baseUrl}bd/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              successfullToast("Deleted Successfully");
              setCheck(!check);
            }
          });
        //Delete End
      }
    });
  };
  ///Delete work End

  if (isLoading) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="bg-purple-500 w-[98%] mx-auto p-5 m-2 rounded-xl">
      <Helmet>
        <title>People List || Birthday</title>
      </Helmet>
      <h1 className="bg-orange-500 w-4/12 mx-auto text-center p-2 mb-5 rounded-lg font-bold">
        Your All Friend: {peoples.length}
      </h1>
      {peoples.length == 0 ? (
        <div>
          <h1 className="bg-red-600 rounded-lg p-2 font-bold text-white text-center w-4/12 mx-auto">
            You have not added Any Friend
          </h1>
          <Link to={"/addfriend"}>
            {" "}
            <button className="btn btn-warning text-white block mx-auto my-4">
              Add Friend
            </button>{" "}
          </Link>
        </div>
      ) : (
        <div>
          {/* Main Work Start */}

          <div className="birthdayContainder">
            <div className="birthdayContainderLeft">
              <div>
                {peoples.map((friend) => (
                  <SingleFriend
                    key={friend._id}
                    friend={friend}
                    handleDelete={handleDelete}
                  ></SingleFriend>
                ))}
              </div>
            </div>
            <div className="birthdayContainderRight">
              <h1 className="bg-green-500 p-2 text-center text-white font-bold rounded-md">
                Remaining Days
              </h1>
              <div>
                <Remaining />
              </div>
            </div>
          </div>
          {/* Main Work End */}
        </div>
      )}
    </div>
  );
};

export default AllFriends;
