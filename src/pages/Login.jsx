import React, { useEffect, useState } from "react";
import Signin from "../components/Signin";
import building from "../assets/wp.jpeg";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getauth = async () => {
      try {
        const res = await axiosInstance.get("/auth/user");

        console.log(res, "res...");
        if (res?.status == 200) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error, "error...");
        setLoader(false);
      }
    };

    getauth();
  }, []);

  if (loader) {
    return <Loading/>;
  }

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
        <Signin onLoginSuccess={() => navigate("/dashboard")} />
      </div>
    </div>
  );
};

export default Login;
