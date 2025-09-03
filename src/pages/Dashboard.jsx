import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import userDp from "../assets/icons/user.svg";
import Loading from "../components/Loading";
import { FaUserCircle } from "react-icons/fa";
import AccountSummary from "../components/AccountSummary";
import { IoCheckmarkSharp } from "react-icons/io5";
import PurchasePlan from "../components/PurchasePlan";
import ActivePlan from "../components/ActivePlan";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { RiUserShared2Line } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { FaUsers } from "react-icons/fa6";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import FAQAccordion from "../components/FAQAccordion";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [availablePlans, setAvailablePlans] = useState([]);
  const [activePlans, setActivePlans] = useState([]);
  const [miningProgress, setMiningProgress] = useState({}); // planId => mined value
  const [copied, setCopied] = useState(false);

  const simulateMining = (plan) => {
    const planId = plan._id;

    // Total mining duration in seconds
    const totalSeconds =
      (new Date(plan.endDate) - new Date(plan.startDate)) / 1000;

    // ✅ Now mine the FULL REWARD, not just profit
    const rewardPerSecond = plan.reward / totalSeconds;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedSeconds = (now - new Date(plan.startDate)) / 1000;

      // Calculate mined amount so far
      let minedAmount = elapsedSeconds * rewardPerSecond;

      // Cap mined value to full reward (not profit)
      minedAmount = Math.min(minedAmount, plan.reward);

      // Update mining progress state
      setMiningProgress((prev) => ({
        ...prev,
        [planId]: parseFloat(minedAmount.toFixed(8)),
      }));

      // Stop interval when full reward is mined
      if (minedAmount >= plan.reward) {
        clearInterval(interval);
      }
    }, 200);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  useEffect(() => {
    try {
      const plans = async () => {
        const res = await axiosInstance.get("/plans/user");
        setActivePlans(res?.data?.activePlans);
        setAvailablePlans(res?.data?.availablePlans);

        res.data.activePlans.forEach((plan) => {
          simulateMining(plan);
        });
      };

      plans();
    } catch (error) {
      console.log(error, "error");
    }
  }, []);

  const logout = async () => {
    await axiosInstance.post("/auth/logout");
    navigate("/login");
  };

  // if (true) {
  //   return <Loading />;
  // }
  return (
    <div className="px-3 mt-3">
      <AccountSummary />
      {/* Plan status */}
      <div className="bg-white shadow-custom-drop mt-3 p-3 rounded-xl flex items-center justify-between">
        <div className="">
          <div className="bg-custom-gradient px-2 rounded-full shadow-custom-drop w-fit text-[10px] text-white">
            Current Plan
          </div>
          <div className="text-2xl mt-1 font-bold text-red-500">
            {activePlans ? "Plan Active" : "No Active Plan!"}
          </div>
          <div className="text-[12px] font-medium text-gray-700">
            {activePlans
              ? "You have active plan/s"
              : "You dont have any active plan"}
          </div>
        </div>
        <div>
          <div className="bg-custom-gradient rounded-lg w-14 h-14 flex items-center justify-center text-shadow-custom text-white font-semibold shadow-custom-drop text-4xl">
            {activePlans ? "0" + activePlans?.length : "0"}
          </div>
        </div>
      </div>
      <div className=" mt-3 flex flex-row overflow-x-auto space-x-4 scrollbar-hide px-1 py-2">
        {activePlans &&
          activePlans?.map((data, id) => (
            <ActivePlan
              key={id}
              planId={id}
              data={data}
              progress={miningProgress[data._id]?.toFixed(8) || data.mined}
            />
          ))}
        {availablePlans &&
          availablePlans?.map((data, id) => (
            <PurchasePlan data={data} key={id} planId={id} />
          ))}
      </div>
      {/* All menu  */}

      <div className="bg-white shadow-custom-drop rounded-xl mt-2 p-3 pb-0 mb-3 grid grid-cols-3 gap-1 place-items-center">
        {/* Circle + Title */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 radial_bg rounded-full flex items-center justify-center text-white text-xl shadow-md">
            <FaHandHoldingDollar size={32} />
          </div>
          <p className="mt-2 text-sm font-medium text-gray-700">Withdraw</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 radial_bg rounded-full flex items-center justify-center text-white text-lg shadow-md">
            <RiUserShared2Line size={32} />
          </div>
          <p className="mt-2 text-sm font-medium text-gray-700">Refer & earn</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 radial_bg rounded-full flex items-center justify-center text-white text-lg shadow-md">
            <GrTransaction size={32} />
          </div>
          <p className="mt-2 text-sm font-medium text-gray-700">Transactions</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 radial_bg rounded-full flex items-center justify-center text-white text-lg shadow-md">
            <FaUsers size={32} />
          </div>
          <p className="mt-2 text-sm font-medium text-gray-700">My referrals</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 radial_bg rounded-full flex items-center justify-center text-white text-lg shadow-md">
            <BiMoneyWithdraw size={32} />
          </div>
          <p className="mt-2 text-sm font-medium text-gray-700">Withdraw</p>
        </div>

        <div className="flex flex-col items-center">
          <div
            className="w-16 h-16 radial_bg rounded-full flex items-center justify-center text-white text-lg shadow-md hover:opacity-90"
            onClick={logout}
          >
            <FiLogOut size={32} />
          </div>
          <p className="mt-2 text-sm font-medium text-gray-700">Logout</p>
        </div>
      </div>

      {/* FAQ */}
      <FAQAccordion />
    </div>
  );
};

export default Dashboard;
