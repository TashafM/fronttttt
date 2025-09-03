import React from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import coins from '../assets/icons/coins.svg'

const PurchasePlan = ({data, planId}) => {

  const {planName, amount, reward, durationDays, plan} = data;

  return (
    <div className="w-[215px] flex-shrink-0 h-[315px] bg-custom-gradient rounded-xl shadow-custom-drop p-[14px] relative" key={planId}>
      <div className="text-white">
        <div className="font-extralight text-shadow-custom">Plan {plan}</div>
        <div className="text-2xl font-bold text-shadow-custom">{planName}</div>
      </div>
      <img src={coins} alt="" className="z-10 absolute top-8 right-0" />
      <div className="bg-white absolute bottom-0 left-0 rounded-xl h-[215px] w-full p-[10px]">
        <div className="bg-custom-gradient shadow-custom-drop text-[10px] font-medium w-[44px] text-center rounded-lg text-white">
          Invest
        </div>
        <div className="usdt_plan text-[#0F0F0F] font-extrabold text-4xl mt-[10px] text-shadow-custom">
          {amount} USDT
        </div>
        <div className="mt-[10px] flex flex-col gap-[2px] ml-2">
          <div className="flex items-center gap-2">
            <IoCheckmarkSharp color="#2AC18C" />
            <div className="text-[#808080] font-light text-[10px]">
              Returns <span className="font-bold">{reward}</span> USDT
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IoCheckmarkSharp color="#2AC18C" />
            <div className="text-[#808080] font-light text-[10px]">
              Total profit of <span className="font-bold">{reward - amount}</span> USDT
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IoCheckmarkSharp color="#2AC18C" />
            <div className="text-[#808080] font-light text-[10px]">
              Duration <span className="font-bold">10</span> Days
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IoCheckmarkSharp color="#2AC18C" />
            <div className="text-[#808080] font-light text-[10px]">
              Earn extra USDT by referral
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <div className="m-[16px] bg-custom-gradient text-white shadow-custom-drop text-[12px] font-semibold rounded-full h-7 flex items-center justify-center">
          Purchase Plan
        </div>
      </div>
    </div>
  );
};

export default PurchasePlan;
