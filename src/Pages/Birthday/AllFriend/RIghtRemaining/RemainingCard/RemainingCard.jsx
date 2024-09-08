import React from "react";

const RemainingCard = ({ people }) => {
  // console.log(people);
  const { name, remaining } = people;
  return (
    <div className="bg-fuchsia-500 m-2 p-2 rounded-xl">
      <h1 className="font-bold">Name: {name} </h1>
      {remaining === 0 ? (
        <>
          <p className="text-red-600 font-bold w-6/12 rounded-md p-1 bg-white">
            Today is Birthday
          </p>
        </>
      ) : (
        <p>Remining: {remaining} days </p>
      )}
    </div>
  );
};

export default RemainingCard;
