import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AllUser = () => {
  const { user, successfullToast, unSuccessfullToast, baseUrl, Logout_ } =
    useContext(AuthContext);

  /**
   * Check Admin start
   */
  // const navigate=useNavigate()
  // let EMAIL=user?.email;
  // console.log("All User Mail: ",EMAIL);

  // const [checkAdmin,setCheckAdmin]=useState("")
  // useEffect(()=>{
  //    if(EMAIL){
  //     fetch(`${baseUrl}allusers/${EMAIL}`)
  //     .then(res=>res.json())
  //     .then(data=>setCheckAdmin(data))
  //    }
  // },[EMAIL])
  // console.log("Check User(AllUSer): ",checkAdmin);

  // let isAdmin=checkAdmin?.role;
  // console.log("IS ADminnnnnnnnnnnnnnnnnnn: ",isAdmin);
  // if(!isAdmin){
  //     navigate('/home',true)
  // }

  // console.log("AllUser isAdmin: ",isAdmin);

  /**
   * Check Admin End
   */

  const [check, setCheck] = useState(true);
  const [alluser, setAllUser] = useState([]);
  useEffect(() => {
    fetch(`${baseUrl}alluser`)
      .then((res) => res.json())
      .then((data) => setAllUser(data));
  }, [check]);

  ///Delete Start
  const handleDelete = (id) => {
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
        fetch(`${baseUrl}user/${id}`, {
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
  ////Delete End

  ///Update start
  const handleMakeAdmin = (user) => {
    //  console.log("Update: ",user);
    user.role = "admin";
    //  console.log("Make admin: ",user);
    fetch(`${baseUrl}user/${user._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setCheck(!check);
          successfullToast("Made an admin");
        }
      });
  };
  ///Update en
  return (
    <div className="w-full">
      <h3 className="text-3xl font-semibold my-4">
        Total users: {alluser.length}{" "}
      </h3>
      <div className="overflow-x-auto">
        <table className="table  w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {alluser.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td className="text-orange-400 font-bold">{user.name}</td>
                <td className="text-orange-400 font-bold">{user.email}</td>
                <td className="text-orange-400 font-bold">
                  {" "}
                  {user.role == "admin" ? (
                    "admin"
                  ) : (
                    <button
                      onClick={() => {
                        handleMakeAdmin(user);
                      }}
                      className="btn btn-ghost btn-lg bg-orange-600 text-white"
                    >
                      {" "}
                      <FaUserShield />{" "}
                    </button>
                  )}{" "}
                </td>
                <td className="">
                  <button
                    onClick={() => {
                      handleDelete(user._id);
                    }}
                    className="btn btn-ghost btn-lg bg-red-600 text-white"
                  >
                    {" "}
                    <FaTrashAlt />{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
