import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import { Helmet } from 'react-helmet-async';

const imageHosting_Token=import.meta.env.VITE_IMAGE_TOKEN

const Update = () => {

    //console.log("Token: ",imageHosting_Token);
    const imageHostingUrl=`https://api.imgbb.com/1/upload?key=${imageHosting_Token}`
    //console.log("URL: ",imageHostingUrl);

    const {user,successfullToast,unSuccessfullToast}=useContext(AuthContext)
    const {id}=useParams()
    const [friend,setfriend]=useState("")
    useEffect(()=>{
        fetch(`https://birthday-count-server-hsliz7t8q-suvrodev.vercel.app/bd/${id}`)
        .then(res=>res.json())
        .then(data=>setfriend(data))
    },[])
    const {_id,name,image,dob,phone,ratting,location}=friend


    const handleUpdate=(event)=>{
        event.preventDefault()
        const form=event.target;

        const name=form.name.value;
        const dob=form.date.value;
        const photo=form.photo.files[0];
        const ratting=form.ratting.value;
        const phone=form.phone.value;
        const location=form.location.value;
        let people;
        
        ///didn't upload new photo
        if(!photo){
            console.log("Didn't Uploaded New Photo");
            people={name,dob,ratting:parseInt(ratting),phone,location,ref:user?.email,image}
            console.log("People: ",people);

            fetch(`https://birthday-count-server-hsliz7t8q-suvrodev.vercel.app/bd/${_id}`,{
                method: 'PATCH',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify(people)
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.modifiedCount>0){
                    successfullToast('Updated Successfully')
                }
            })
        }else{
            console.log("New Photo Uploaded");
            const formData=new FormData()
            formData.append('image',photo)

            fetch(imageHostingUrl,{
                method: 'POST',
                body: formData
            })
            .then(res=>res.json())
            .then(imageResponse=>{
                let newImage=imageResponse.data.display_url
                console.log("Update Image Link Okay: ",image);

                people={name,dob,ratting:parseInt(ratting),phone,location,ref:user?.email,image:newImage}
                console.log("People: ",people);
    

                ////Patch Data start
                fetch(`https://birthday-count-server-hsliz7t8q-suvrodev.vercel.app/bd/${_id}`,{
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(people)
                    
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data)
                    if(data.modifiedCount>0){
                        successfullToast("Successfully Updated")
                    }
                })
                ////Patch Data end
                
            })
        }

    }
    return (
        <div>
            <Helmet>
                 <title>Update || Birthday</title>
             </Helmet>
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