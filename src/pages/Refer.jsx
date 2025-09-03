import React, { useState } from "react";
import { IoShareSocialSharp } from "react-icons/io5";

const Refer = () => {
  const [message, setMessage] = useState("");

  const shareData = {
    title: "Tashaf",
    text: "Learn web development on MDN!",
    url: "https://developer.mozilla.org",
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log(err)
      }
    } else {
      setMessage("⚠️ Sharing not supported on this browser.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-lg font-semibold">Refer</div>

      <button
        onClick={share}
        className="w-14 h-14 bg-green-400 rounded-full flex items-center justify-center hover:bg-green-500 transition"
      >
        <IoShareSocialSharp size={32} className="text-white" />
      </button>

      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default Refer;
