import React from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import usdt from "../assets/icons/usdt.svg";
import coins from '../assets/icons/coins.svg'
import moment from "moment";

const ActivePlan = ({data, progress, planId}) => {
  const {planName, reward, endDate, plan} = data;
  
  return (
    <div className="w-[215px] flex-shrink-0 h-[315px] bg-white rounded-xl shadow-custom-drop p-[14px] pt-6 relative" key={planId}>
      <div className="absolute top-2 right-2 h-[16px] text-[8px] bg-[#0F9965] text-white font-semibold px-2 rounded-full flex items-center justify-center shadow-custom-drop">ACTIVE</div>
      <div className="flex flex-col items-center">
        <img src={usdt} alt="" className="animate-bounce -mb-2" />
        <div className="text-[26px] font-bold text-shadow-custom text-[#0f0f0f]">
          {/* $0.00052121 */}
          ${progress}
        </div>
      </div>
      <img src={coins} alt="" className="absolute top-[114px] z-10 -right-1" width={160} />
      <div className="bg-active-plan-gradient absolute bottom-0 left-0 rounded-xl h-[175px] w-full p-[10px]">
        <div className="text-white">
          <div className="font-extralight text-shadow-custom">Plan {plan}</div>
          <div className="text-2xl font-bold text-shadow-custom">{planName}</div>
        </div>

        <div className="text-[10px] flex gap-2 text-white font-semibold justify-center mt-[8px]">
          <div className="font-medium">
            <div>Withdrawl Amount</div>
            <div>Withdrawl Date</div>
            <div>Withdrawl Time</div>
          </div>
          <div>
            <div>-</div>
            <div>-</div>
            <div>-</div>
          </div>
          <div>
            <div>{reward} USDT</div>
            <div>{moment(endDate).format("DD MMMM YYYY")}</div>
            <div>{moment(endDate).format("hh:mm A")}</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <div className="m-[16px] bg-white text-[#848484] shadow-custom-drop text-[12px] font-semibold rounded-full h-7 flex items-center justify-center">
          Withdraw
        </div>
      </div>
    </div>
  );
};

export default ActivePlan;
