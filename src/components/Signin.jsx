import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthInputField from "./AuthInputField";
import AuthButton from "./AuthButton";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const Signin = ({ onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .matches(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          "Please enter a valid email address"
        )
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        // ✅ Step 1: Login API
        const loginRes = await axiosInstance.post("/auth/login", {
          email: values.email.trim(),
          password: values.password,
        });

        // ✅ Step 2: Verify Token via /auth/user
        // const res = await axiosInstance.get("/auth/user");
        // if (res.data?.email) {
        //   navigate("/dashboard");
        // } else {
        //   alert("Token verification failed");
        // }

        // ✅ No need to call /auth/user again
        onLoginSuccess();
      } catch (error) {
        if (error.response?.data?.message) {
          setErrors({ email: error.response.data.message });
        } else {
          alert("Login failed. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="text-white text-4xl mt-4 font-semibold">Signin</div>

      <AuthInputField
        title="Email Address"
        type="email"
        value={formik.values.email}
        onChange={(val) => {
          formik.setFieldTouched("email", true);
          formik.setFieldValue("email", val);
        }}
        error={formik.touched.email && formik.errors.email}
      />

      <AuthInputField
        title="Password"
        type={showPassword ? "text" : "password"}
        value={formik.values.password}
        onChange={(val) => {
          formik.setFieldTouched("password", true);
          formik.setFieldValue("password", val);
        }}
        error={formik.touched.password && formik.errors.password}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      <AuthButton
        title="Login"
        buttonPress={formik.handleSubmit}
        disabled={!formik.isValid || !formik.dirty}
        login={false}
      />
    </form>
  );
};

export default Signin;
