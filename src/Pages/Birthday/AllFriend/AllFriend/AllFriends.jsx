import React, { useContext, useEffect, useState } from 'react';
import './AllFriends.css'
import SingleFriend from '../SingleFriend/SingleFriend';
import { AuthContext } from '../../../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Remaining from '../RIghtRemaining/Remaining/Remaining';
import { Helmet } from 'react-helmet-async';

const AllFriends = () => {

    const {user,successfullToast}=useContext(AuthContext)

    ///For Total Janogon start
    const [check,setCheck]=useState(true)
    const [totalJonogon,setTotalJonogon]=useState([])
    useEffect(()=>{
        fetch(`https://birthday-count-server-m5zoggazj-suvrodev.vercel.app/bds?email=${user?.email}`)
        .then(res=>res.json())
        .then(data=>setTotalJonogon(data))
    },[check])
    //console.log("Total Janogon:",totalJonogon);
    ///For Total Janogon end

    // console.log("Mail: ",user?.email);
    const [friends,setFriends]=useState([])
    const [sort,setSort]=useState(0)
    const [search,setSearch]=useState("")

    
    //sort Start
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange=(e)=>{
        const selectedValue = e.target.value;
        console.log("SelectedValue: ",selectedValue);
        setSelectedOption(selectedValue)
        if(selectedValue==""){
            console.log("Default");
            setSort(0)
        }
        if(selectedValue=="1"){
            console.log("1-10");
            setSort(1)
        }
        if(selectedValue=="-1"){
            console.log("10-1");
            setSort(-1)
        }
    }
    //sort End

    //Search Start
    const handleSearch=(event)=>{
        event.preventDefault()
        const search=event.target.search.value;
        setSearch(search)
        console.log(search);
    }
    //sort End


    




    ///Delete Work start
    const handleDelete=(_id)=>{
        // console.log("Delete: ",_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {

              ///Delete Start
              fetch(`https://birthday-count-server-m5zoggazj-suvrodev.vercel.app/bd/${_id}`,{
                method: 'DELETE'
            })
            .then(res=>res.json())
            .then(data=>{
               if(data.deletedCount>0){
                    successfullToast("Deleted Successfully")
                    setCheck(!check)
               }
            })
              //Delete End
            }
          })
    }
     ///Delete work End

     ///Pagination start
     const [currentPage,setCurrentPage]=useState(0)
     console.log("Current Page: ",currentPage);

     const peoplePerPage=5
     const totalPage=Math.ceil(totalJonogon.length/peoplePerPage)
    // console.log("Total Page: ",totalPage);

     const pageNumbers=[...Array(totalPage).keys()]
    // console.log("Page Numbers: ",pageNumbers);
     ///Pagination End


     ///Load data start
     useEffect(()=>{
        fetch(`https://birthday-count-server-m5zoggazj-suvrodev.vercel.app/bd?email=${user?.email}&sort=${sort}&search=${search}&page=${currentPage}&limit=${peoplePerPage}`)
        .then(res=>res.json())
        .then(data=>setFriends(data))
    },[check,sort,search,currentPage,peoplePerPage])
    // console.log(friends);
    ///Load Data end

    return (
        
        <div className='bg-purple-500 w-[98%] mx-auto p-5 m-2 rounded-xl'>
            <Helmet>
                 <title>People List || Birthday</title>
            </Helmet>
        <h1 className='bg-orange-500 w-4/12 mx-auto text-center p-2 mb-5 rounded-lg font-bold'>Your All Friend: {totalJonogon.length}</h1>
        {
            friends.length==0?
            <>
              <h1 className='bg-red-600 rounded-lg p-2 font-bold text-white text-center w-4/12 mx-auto'>You have not added Any Friend</h1>
              <Link to={'/addfriend'}> <button className='btn btn-warning text-white block mx-auto my-4'>Add Friend</button> </Link>
            </>
            :
            <>
            {/* Main Work Start */}

            <div className='flex gap-5 my-2'>
                <select onChange={handleSelectChange} value={selectedOption} className="p-2 rounded-md font-bold border-0 outline-0">
                    <option value="" disabled>Select an option</option>
                    <option value="">Default</option>
                    <option value="1">Ascending(0-1) </option>
                    <option value="-1">Descending(1-0) </option>
                </select>
            </div>

             {/* Search Start */}
             <div className='flex justify-center my-5'>
                
                <form onSubmit={handleSearch} className="form-control">
                    <div className="input-group">
                        <input type="text" placeholder="Search…" name="search" className="input input-bordered " />
                       
                        <button className="btn btn-primary">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </form>
                </div>
            {/* Search End */}
           
            
                <div className='birthdayContainder'>

                    <div className='birthdayContainderLeft'>
                       <div>
                            {
                                friends.map(friend=><SingleFriend
                                key={friend._id}
                                friend={friend}
                                handleDelete={handleDelete}
                                ></SingleFriend>)
                            }
                       </div>
                       {/* Pagination start */}
                       <div className='pagination text-center'>
                       <p className='font-bold'>Current Page: {currentPage} </p>

                         {
                            pageNumbers.map((number,idx)=> <button 
                            key={number}
                            className={`btn mr-2 ${currentPage==number?`btn-success`:``} `}
                            onClick={()=>setCurrentPage(number)}
                            >{number}
                            </button> )
                         }
                       </div>
                       {/* Pagination End */}
                    </div>
                    <div className='birthdayContainderRight'>
                        <h1 className='bg-green-500 p-2 text-center text-white font-bold rounded-md'>Remaining Days</h1> 
                        <div>
                            <Remaining></Remaining>
                        </div>
                    </div>
                </div>
                 {/* Main Work End */}
            </>

        }
    </div>
    );
};

export default AllFriends;