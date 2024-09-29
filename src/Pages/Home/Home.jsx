import React from "react";
import img1 from "../../assets/Gallery/1.png";
import img2 from "../../assets/Gallery/2.jpg";
import img3 from "../../assets/Gallery/3.png";
import img4 from "../../assets/Gallery/4.png";
import img5 from "../../assets/Gallery/5.png";
import img6 from "../../assets/Gallery/6.png";
import HomeGallery from "./HomeGallery/HomeGallery";
const Home = () => {
  const setMail = () => {
    localStorage.setItem("brtd", "suvrodevhowlader1408@gmail.com");
  };
  return (
    <div className="  overflow-auto ">
      <h1 className="bg-green-600 p-2 md:p-5 m-5 w-8/12 md:w-6/12 text-white text-[16px] md:text-xl text-center rounded-lg mx-auto">
        WelCome To Birthday Count
      </h1>

      {/* <div className="hidden">
        <button className="btn btn-primary" onClick={() => setMail()}>
          Developing Login
        </button>
      </div> */}
      <HomeGallery />
      {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-5  p-5">
        <img
          className="w-[250px] flex items-center justify-center"
          src={img1}
          alt=""
        />
        <img
          className="w-[250px] flex items-center justify-center"
          src={img2}
          alt=""
        />
        <img
          className="w-[250px] flex items-center justify-center"
          src={img3}
          alt=""
        />
        <img
          className="w-[250px] flex items-center justify-center"
          src={img4}
          alt=""
        />
        <img
          className="w-[250px] flex items-center justify-center"
          src={img5}
          alt=""
        />
        <img
          className="w-[250px] flex items-center justify-center"
          src={img6}
          alt=""
        />
      </div> */}
    </div>
  );
};

export default Home;
