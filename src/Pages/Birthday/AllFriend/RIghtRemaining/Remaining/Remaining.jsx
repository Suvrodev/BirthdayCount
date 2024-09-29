import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../Provider/AuthProvider";
import RemainingCard from "../RemainingCard/RemainingCard";
import { DataContext } from "../../../../../Provider/BirthDayDataProvider";

const Remaining = () => {
  const { user, baseUrl } = useContext(AuthContext);
  const { peoples, isLoading } = useContext(DataContext);

  for (let i = 0; i < peoples.length; i++) {
    // console.log("In Loop: ",peoples[i].dob);

    ////Calculation start
    const currentDate = new Date(); // Current date
    const dob = new Date(peoples[i].dob); // Date of Birth

    // Calculate the next birthday
    const nextBirthday = new Date(
      currentDate.getFullYear(),
      dob.getMonth(),
      dob.getDate()
    );

    if (currentDate > nextBirthday) {
      nextBirthday.setFullYear(currentDate.getFullYear() + 1);
    }

    // Calculate the number of days until the next birthday
    let daysUntilNextBirthday = Math.ceil(
      (nextBirthday - currentDate) / (1000 * 60 * 60 * 24)
    );

    ///console.log(`Your next birthday is ${daysUntilNextBirthday} days away.`);
    ////Calculation end

    ///In here convert 366 to 365
    if (daysUntilNextBirthday == 365) {
      daysUntilNextBirthday = 0;
    }
    peoples[i].remaining = daysUntilNextBirthday;
  }

  ///Sorting Start
  peoples.sort(function (obj1, obj2) {
    return obj1.remaining - obj2.remaining;
  });
  ///Sorting End

  return (
    <div>
      {peoples.map((people) => (
        <RemainingCard key={people._id} people={people}></RemainingCard>
      ))}
    </div>
  );
};

export default Remaining;
