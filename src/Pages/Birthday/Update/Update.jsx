import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Update = () => {
    const {id}=useParams()
    const [friend,setfriend]=useState("")
    useEffect(()=>{
        fetch(`http://localhost:7000/bd/${id}`)
        .then(res=>res.json())
        .then(data=>setfriend(data))
    },[])
    const {_id,name,image,dob,phone,ratting,location}=friend


    const handleUpdate=(event)=>{
        event.preventDefault()
    }
    return (
        <div>
            <h1 className='w-4/12 bg-slate-500 p-4 text-center rounded-xl mx-auto font-bold'>Update Friend</h1>
            <img className='w-[155px] block mx-auto my-5 rounded-xl' src={image} alt="" />
            <form onSubmit={handleUpdate} className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="form-control">
                        <label className="label">
                        <span className="label-text">Name</span>
                        </label>
                        <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="input input-bordered"
                        defaultValue={name}
                        required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text">Date</span>
                        </label>
                        <input
                        type="date"
                        name="date"
                        className="input input-bordered"
                        defaultValue={dob}
                        required
                        />
                </div>
                <div className="form-control">
                        <label className="label">
                        <span className="label-text">Image</span>
                        </label>
                        <input
                        type="file"
                        name="photo"
                        placeholder="Image"
                        className="file-input file-input-bordered w-full "
                        required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text">Ratting</span>
                        </label>
                        <input
                        type="number"
                        name="ratting"
                        placeholder="Ratting"
                        max={5}
                        min={1}
                        className="input input-bordered"
                        defaultValue={ratting}
                        required
                        />
                </div>
                <div className="form-control">
                        <label className="label">
                        <span className="label-text">Phone</span>
                        </label>
                        <input
                        type="number"
                        name="phone"
                        placeholder="Phone Number"
                        className="input input-bordered"
                        defaultValue={phone}
                        required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text">Location</span>
                        </label>
                        <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        className="input input-bordered"
                        defaultValue={location}
                        required
                        />
                </div>
            </div>

                <div className="form-control mt-6">
                    <input className="bg-orange-700 btn btn-block" type="submit" value="Update Friend" />
                </div>
            </form>
             
      </div>
    );
};

export default Update;