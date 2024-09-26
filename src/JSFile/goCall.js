import React from "react";

const goCall = (phoneNumber) => {
  // const phoneNumber = "+8801951912997";
  window.location.href = `tel:${phoneNumber}`;
};

export default goCall;
