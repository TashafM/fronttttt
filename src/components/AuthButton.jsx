
import React from "react";
import { Link } from "react-router-dom";

const AuthButton = ({ title, login, buttonPress, disabled = false }) => {
  return (
    <>
      <div
        onClick={!disabled ? buttonPress : null}
        className={`py-2 px-4 mt-10 flex items-center justify-center rounded-full font-semibold 
        ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#ED0057] hover:bg-opacity-75 cursor-pointer"}`}
        style={{ pointerEvents: disabled ? "none" : "auto" }}
      >
        <div className="text-white">{title}</div>
      </div>

      <div className="flex items-center justify-center mt-3">
        {login ? (
          <Link
            to="/login"
            className="text-sm text-white underline cursor-pointer w-fit"
          >
            Already have an account? <span className="font-bold">Login</span>
          </Link>
        ) : (
          <div className="text-sm cursor-pointer w-fit">
            <Link to="/signup">
              Don&apos;t have an account? <span className="font-bold">Sign Up</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default AuthButton;
