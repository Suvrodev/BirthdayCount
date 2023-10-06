import React from 'react';

const RemainingCard = ({people}) => {
    console.log(people);
    const {name,remaining}=people
    return (
        <div className='bg-fuchsia-500 m-2 p-2 rounded-xl'>
            <h1>Name: {name} </h1>
            <p>Remining: {remaining} days </p>
        </div>
    );
};

export default RemainingCard;