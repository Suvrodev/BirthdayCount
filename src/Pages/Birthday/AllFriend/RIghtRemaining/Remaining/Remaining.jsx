import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../../Provider/AuthProvider';
import RemainingCard from '../RemainingCard/RemainingCard';

const Remaining = () => {

    ////Today Date Start
    // const currentDate = new Date();
    // const year = currentDate.getFullYear();
    // const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    // const day = String(currentDate.getDate()).padStart(2, '0');

    // const today = `${year}-${month}-${day}`;
    // console.log("Today Date: ",today);
    ////Today Date End


    const {user}=useContext(AuthContext)
    const [peoples,setPeoples]=useState([])
    const [newPeoples,setNewPeoples]=useState([])

    useEffect(()=>{
        fetch(`http://localhost:7000/bd?email=${user?.email}`)
        .then(res=>res.json())
        .then(data=>{
            // console.log("Data: ",data);
            // console.log("Length of Data: ",data.length);
            setPeoples(data)
        })
    },[])
    
    for (let i=0;i<peoples.length;i++){
        // console.log("In Loop: ",peoples[i].dob);
        

        ////Calculation start
        const currentDate = new Date(); // Current date
        const dob = new Date(peoples[i].dob); // Date of Birth

        // Calculate the next birthday
        const nextBirthday = new Date(currentDate.getFullYear(), dob.getMonth(), dob.getDate());

        if (currentDate > nextBirthday) {
        nextBirthday.setFullYear(currentDate.getFullYear() + 1);
        }

        // Calculate the number of days until the next birthday
        const daysUntilNextBirthday = Math.ceil((nextBirthday - currentDate) / (1000 * 60 * 60 * 24));

        ///console.log(`Your next birthday is ${daysUntilNextBirthday} days away.`);
        ////Calculation end
        peoples[i].remaining=daysUntilNextBirthday
    }


    ///Sorting Start
    peoples.sort(function (obj1, obj2) {
        return obj1.remaining - obj2.remaining;
    });
    ///Sorting End


    return (
        <div>
           {
            peoples.map(people=><RemainingCard
            key={people._id}
            people={people}
            ></RemainingCard>)
           }
        </div>
    );
};

export default Remaining;