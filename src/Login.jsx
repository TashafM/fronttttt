import { useEffect, useState } from "react";
import axios from "./axiosInstance";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";

export default function Login() {
  const [step, setStep] = useState(1); // 1: send OTP, 2: verify OTP
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  const getReferralCodeFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("ref");
  };

  const sendOtp = async () => {
    try {
      await axios.post("/auth/send-otp", {
        email,
        referredByCode: getReferralCodeFromURL(),
      });
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post("/auth/verify-otp", { email, otp });

      // Confirm token is valid before redirecting
      const res = await axios.get("/auth/user");
      if (res.data?.email) {
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  useEffect(() => {
    const getauth = async () => {
      try {
        const res = await axiosInstance.get("/auth/user");
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
    return <div>CHeckING progress.....</div>;
  }
  return (
    <div>
      <h2>{step === 1 ? "Login with Email" : "Enter OTP"}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        disabled={step === 2}
        onChange={(e) => setEmail(e.target.value)}
      />
      {step === 2 && (
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      )}
      <button onClick={step === 1 ? sendOtp : verifyOtp}>
        {step === 1 ? "Send OTP" : "Verify OTP"}
      </button>
    </div>
  );
}
