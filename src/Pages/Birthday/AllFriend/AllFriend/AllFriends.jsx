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
import { useGetFriendsQuery } from "../AllFriendsApi";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { useInView } from "react-intersection-observer";

const AllFriends = () => {
  const { user, successfullToast, baseUrl, databseUser } =
    useContext(AuthContext);
  // const { peoples, isLoading } = useContext(DataContext);

  /**
   * Intersection observer start
   */
  // const { ref, inView } = useInView({
  //   threshold: 0,
  // });

  // const [page, setPage] = useState(0);
  // useEffect(() => {
  //   if (inView) {
  //     setPage((page) => page + 1);
  //   }
  // }, [inView]);
  // console.log("Inview: ", inView);
  // console.log("Page(component): ", page);

  /**
   * Intersection observer end
   */

  /**
   * Search Start
   */

  const [checkDelete, setCheckDelete] = useState(false);
  const [searchText, setSearchText] = useState("");
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchText(value);
  };
  console.log("Search Text: ", searchText);

  /**
   * Search End
   */

  /**
   * For RTK query start
   */
  const { isLoading, data: peoples } = useGetFriendsQuery({
    email: databseUser?.email,
    searchText,
    checkDelete,
    // page: page,
  });
  console.log("Data from RTK Query: ", peoples);

  /**
   * For RTK query end
   */

  // const [peoples, setPeoples] = useState([]);
  // useEffect(() => {
  //   if (data) {
  //     setPeoples((prevPeople) => [...prevPeople, ...data]);
  //   }
  // }, [data]);
  // console.log("All Peoples from RTK-Query", peoples);

  /**
   *  Total people from specific id start
   */
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    axios.get(`${baseUrl}total?email=${databseUser?.email}`).then((res) => {
      setTotalCount(res.data?.total);
    });
  }, []);
  /**
   *  Total people from specific id end
   */

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
              setCheckDelete(!checkDelete);
            }
          });
        //Delete End
      }
    });
  };
  ///Delete work End

  /**
   * Remove Search Box Text start
   */
  const handleRemoveSearchText = () => {
    setSearchText("");
  };
  /**
   * Remove Search Box Text end
   */

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
      <h1 className="bg-orange-500 text-white w-full md:w-4/12 mx-auto text-center p-2 mb-5 rounded-lg font-bold">
        Your All Friend: {totalCount}
      </h1>
      {peoples.length > 0 ? (
        <div>
          {/* Main Work Start */}

          <div className="birthdayContainder">
            <div className="birthdayContainderLeft">
              {/*Searching start */}
              <div className="w-full flex justify-center  items-center gap-2 ">
                <div className="relative bg-green-40">
                  <input
                    type="text"
                    placeholder="Search…"
                    className="input input-bordered"
                    onChange={handleSearch}
                    value={searchText ? searchText : ""}
                  />
                  <div
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                      searchText.length > 0 ? "" : "hidden"
                    }`}
                  >
                    <CloseIcon onClick={handleRemoveSearchText} />
                  </div>
                </div>
                <button className="btn bg-green-600 hover:bg-green-700 border-0 btn-square">
                  <SearchIcon />
                </button>
              </div>
              {/*Searching end*/}

              <div>
                {peoples.map((friend, idx) => (
                  <div key={idx}>
                    <SingleFriend
                      key={friend._id}
                      friend={friend}
                      handleDelete={handleDelete}
                    ></SingleFriend>
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                {/* <span className="loading loading-spinner loading-lg bg-warning"></span> */}
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
      ) : (
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
      )}
    </div>
  );
};

export default AllFriends;
