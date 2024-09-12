import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";

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
  console.log("Peoples: ", peoples);
  /**
   * Fetch All friends end
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
