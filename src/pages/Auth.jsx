import React from "react";
import "../styles/Auth.scss";
import Signup from "../components/Signup";
import building from "../assets/wp.jpeg";

const SignUp = () => {
  return (
    <div
      className="auth_wrapper"
      style={{
        position: "relative",
        backgroundImage: `url(${building})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <div className="overlay">
        <Signup />
      </div>
    </div>
  );
};

export default SignUp;
