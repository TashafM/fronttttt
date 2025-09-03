import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "./InputField";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormikContext } from "formik";
import OTPverify from "./OTPverify";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const ref = queryParams.get("ref"); // Get the value of ?ref=...

  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      setCanResend(false);
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: ["", "", "", "", "", ""],
  };
  const stepOneSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    // email: Yup.string().email("Invalid email").required("Email is required"),
    email: Yup.string()
      .required("Email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Enter a valid email address"),
    password: Yup.string()
      .min(6, "Min 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const stepTwoSchema = Yup.object({
    otp: Yup.array().test(
      "is-complete-otp",
      "OTP must be 6 digits",
      (value) => {
        return value && value.join("").match(/^\d{6}$/);
      }
    ),
  });

  const handleContinue = async (values, actions) => {
    setLoading(true);
    console.log("Step 1 Data:", values);

    toast.loading("Sending OTP to your email...", { id: "toast-msg" });

    const payload = {
      email: values.email,
      referredByCode: ref,
      purpose: "signup",
      name: values.name
    };
    try {
      const res = await axiosInstance.post("/auth/send-otp", payload);
      toast.dismiss();
      setLoading(false);
      setStep(2);
    } catch (error) {
      if (error?.response?.data?.errorCode === 1) {
        setLoading(false);
        return toast.error("Email already in use. Login now!", {
          id: "toast-msg",
        });
      }
      console.log(error, "ERROR...");
      toast.error("Failed to send OTP. Please try again.", { id: "toast-msg" });
      toast.dismiss();
      setLoading(false);
    }
  };

  const handleFinalSubmit = async (values) => {
    const fullOtp = values.otp.join("");

    // Clean payload
    const payload = {
      name:
        values.name.trim().charAt(0).toUpperCase() +
        values.name.trim().slice(1).toLowerCase(),
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword, // or omit if not needed
      otp: fullOtp,
    };

    try {
      const res = await axiosInstance.post("/auth/signup", payload);
      console.log(res, "RESPONSE");

      if (res?.status == 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      if (error?.response?.data?.errorCode === 1) {
        toast.error("Email already registered. Please login.", {
          id: "user-registered",
        });
      }
    }
  };

  const handleResend = () => {
    // Trigger OTP resend logic (API call etc.)
    console.log("Resending OTP...");
    setTimer(60);
  };

  return (
    <div className="mx-auto w-full ">
      <h1 className="text-4xl font-semibold mb-6 text-center text-white">
        {step === 1 ? "Signup Now" : "Enter OTP"}
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={step === 1 ? stepOneSchema : stepTwoSchema}
        onSubmit={step === 1 ? handleContinue : handleFinalSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ isValid, dirty }) => (
          <Form className="space-y-5">
            {step === 1 && (
              <>
                <InputField name={"name"} label="Name" />
                <InputField name={"email"} label={"Email ID"} type="email" />
                <InputField
                  name={"password"}
                  label={"Password"}
                  type="password"
                />
                <InputField
                  name={"confirmPassword"}
                  label={"Confirm Password"}
                  type="password"
                />

                {/* <button
                  onClick={() =>
                    toast.success("Here is your toast.", {
                      position: "top-center",
                      id: "single-toast",
                    })
                  }
                >
                  Click Here
                </button> */}
              </>
            )}
            {step === 2 && (
              <OTPverify
                canResend={canResend}
                handleResend={handleResend}
                timer={timer}
              />
            )}

            {/* Continue / Submit */}
            <button
              type="submit"
              disabled={!(isValid && dirty) || loading}
              className={`w-full py-2 px-4 text-white font-semibold transition duration-300 rounded-full signup-btn ${
                !(isValid && dirty) || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {step === 1 ? "Continue" : "Submit"}
            </button>
          </Form>
        )}
      </Formik>

      <div className="mt-3 text-center">
        <Link
          to="/login"
          className="text-sm text-white underline cursor-pointer w-fit"
        >
          Already have an account? <span className="font-bold">Login</span>
        </Link>
      </div>
    </div>
  );
};
export default SignupForm;
