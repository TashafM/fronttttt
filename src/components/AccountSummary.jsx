import React from "react";
import userDp from '../assets/icons/user.svg'

const AccountSummary = () => {
  return (
    <div className="bg-custom-gradient px-[10px] py-[14px] rounded-lg shadow-custom-drop h-[64px] flex items-center justify-between text-white">
      <div className="flex items-center gap-2">
        <img src={userDp} alt="" className="text-shadow-custom" />
        <div>
          <div className="welcome_txt text-[13px] text-shadow-custom">
            Welcome
          </div>
          <div className="text-xl font-bold text-shadow-custom">Tashaf</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end text-[12px] gap-[2px] text-shadow-custom font-medium ">
          <div>Main Balance</div>
          <div>Bonus Balance</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-[10px] text-primary-green font-bold shadow-custom-drop bg-white rounded-full w-fit px-1">
            500 USDT
          </div>
          <div className="text-[10px] text-primary-green font-bold shadow-custom-drop bg-white rounded-full w-fit px-1">
            500 USDT
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;
