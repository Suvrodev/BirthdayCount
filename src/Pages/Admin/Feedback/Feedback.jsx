import React, { useContext, useRef } from "react";
import emailjs from "@emailjs/browser";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const Feedback = () => {
  const { successfullToast } = useContext(AuthContext);
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    // console.log("form: ",form.current.name);

    emailjs
      .sendForm(
        "service_fup4rjf",
        "template_aovt5cz",
        form.current,
        "_kzTXrFfQk2uFNUe9"
      )
      .then(
        (result) => {
          console.log(result);
          if (result.status === 200) {
            successfullToast("Sent your feedback");
          }
        },
        (error) => {
          console.log("Error:");
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <Helmet>
        <title>Feedback || Birthday</title>
      </Helmet>

      <div className="border-orange-600 border-2 m-2 p-5 rounded-xl w-full md:w-8/12 mx-auto">
        <h1 className="bg-orange-500 text-center p-2 w-full md:w-4/12 mx-auto font-bold rounded-md text-white mb-4">
          Send Your Feedback
        </h1>
        <form ref={form} onSubmit={sendEmail}>
          <label className="font-bold">Name</label> <br />
          <input
            className="w-full p-4 rounded-md my-4"
            type="text"
            name="user_name"
            placeholder="Write Your Name"
          />{" "}
          <br />
          <label className="font-bold">Email</label> <br />
          <input
            className="w-full p-4 rounded-md my-4"
            type="email"
            name="user_email"
            placeholder="Write Your Mail"
          />{" "}
          <br />
          <label>Feedback</label> <br />
          <textarea
            className="w-full h-[125px] p-4 rounded-md my-4 resize-none"
            name="message"
            placeholder="Write Message"
          />{" "}
          <br />
          <input className="btn btn-primary" type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
};

export default Feedback;
