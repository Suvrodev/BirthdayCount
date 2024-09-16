import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import { useGetFriendsQuery } from "../Pages/Birthday/AllFriend/AllFriendsApi";

export const DataContext = createContext("");
const BirthDayDataProvider = ({ children }) => {
  const { databseUser, baseUrl } = useContext(AuthContext);

  /**
   * Fetch All friends start
   */
  const [peoples, setpeoples] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (databseUser) {
      axios.get(`${baseUrl}bds?email=${databseUser?.email}`).then((res) => {
        setpeoples(res.data);
        setIsLoading(false);
      });
    }
  }, [databseUser]);
  // console.log("Peoples (Auth) : ", peoples);
  /**
   * Fetch All friends end
   */

  /**
   * For RTK query start
   */
  // const [peoples, setPeoples] = useState([]);
  // const { isLoading, data } = useGetFriendsQuery(databseUser?.email);
  // useEffect(() => {
  //   if (data) {
  //     setPeoples(data);
  //   }
  // }, [data]);
  // console.log("Peoples from RTK-Query-(Auth)", peoples);
  /**
   * For RTK query end
   */
  const authInfo = {
    peoples,
    isLoading,
  };

  return (
    <DataContext.Provider value={authInfo}> {children} </DataContext.Provider>
  );
};

export default BirthDayDataProvider;
