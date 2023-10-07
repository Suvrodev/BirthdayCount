import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import img from '../../../assets/Image/Image_.jpeg'
import { Helmet } from 'react-helmet-async';


const imageHosting_Token=import.meta.env.VITE_IMAGE_TOKEN
const AddFriend = () => {

    const {user,successfullToast,unSuccessfullToast}=useContext(AuthContext)

    //  console.log("Token: ",imageHosting_Token);
     const imageHostingUrl=`https://api.imgbb.com/1/upload?key=${imageHosting_Token}`
    //  console.log("URL: ",imageHostingUrl);

    const handleAddFriend=(event)=>{
        event.preventDefault()
        const form=event.target;

        const name=form.name.value;
        const dob=form.date.value;
        const photo=form.photo.files[0];
        const ratting=form.ratting.value;
        const phone=form.phone.value;
        const location=form.location.value;
        let image;
        let people={name,dob,ratting:parseInt(ratting),phone,location,ref:user?.email}
        console.log("People: ",people);


       
        if(photo){
            const formData=new FormData()
            formData.append('image',photo)

            fetch(imageHostingUrl,{
                method: 'POST',
                body: formData
            })
            .then(res=>res.json())
            .then(imageResponse=>{
                image=imageResponse.data.display_url
                console.log("Image Link Okay: ",image);

                people.image=image
                ////Post Data start
                fetch(`http://localhost:7000/bd`,{
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(people)
                    
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data)
                    if(data.insertedId){
                        successfullToast("Successfully Added")
                    }
                })
                ////Post Data end
                
            })
        }
    }
   
    return (
        <div>
            <Helmet>
                 <title>Add Friend || Birthday</title>
            </Helmet>
            <h1 className='w-4/12 bg-slate-500 p-4 text-center rounded-xl mx-auto font-bold'>Add Friend</h1>
        <form onSubmit={handleAddFriend} className="p-10">
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
                      required
                      />
              </div>
          </div>

            <div className="form-control mt-6">
                <input className="bg-orange-700 btn btn-block" type="submit" value="Add Friend" />
            </div>
        </form>
             
      </div>
    );
};

export default AddFriend;