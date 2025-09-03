import React from "react";
import show from "./../assets/icons/showeye.svg";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const AuthInputField = ({
  title = "Name",
  type = "text",
  otp,
  onChange,
  value,
  onPress,
  error,
  showPassword,
  setShowPassword,
}) => {
  return (
    <div className="mt-[20px]">
      <div className="font-medium text-white">{title}</div>
      {!otp ? (
        // <div>
        //   <input
        //     type={type}
        //     value={value}
        //     className="w-full h-[40px] border-none outline-none rounded-[6px] mt-[2px] px-2 text-[#212121]"
        //     onChange={(e) => onChange(e.target.value)} // ✅ VERY IMPORTANT
        //   />

        //   {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        // </div>
        <div className="relative">
          <input
            type={showPassword && title === "Password" ? "text" : type}
            value={value}
            className="w-full h-[40px] border-none outline-none rounded-[6px] mt-[2px] px-2 text-[#212121]"
            onChange={(e) => onChange(e.target.value)}
          />

          {/* 👁 Show/hide password icon (only for password field) */}
          {title === "Password" && (
            <div
              className="absolute right-3 top-2 text-blue-600 cursor-pointer"
              onClick={() => setShowPassword?.((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </div>
          )}

          {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
      ) : (
        <div className="relative flex mt-[2px]">
          <input
            type={type}
            className="w-full h-[40px] border-none outline-none rounded-[6px] px-2 text-[#212121]"
            value={value}
            onChange={(e) => onChange(e.target.value)} // ✅ VERY IMPORTANT
          />
          <div
            className="right-0 text-white text-sm font-semibold cursor-pointer bg-blue-600 hover:bg-blue-800 h-[40px] w-[100px] absolute flex items-center justify-center rounded-tr-[6px] rounded-br-[6px]"
            onClick={onPress}
          >
            SEND OTP
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthInputField;
