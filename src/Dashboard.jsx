import { useEffect, useState } from "react";
import axios from "./axiosInstance";
import axiosInstance from "./axiosInstance";
import { useNavigate } from "react-router-dom";
import convertToIST from "./globalFunctions";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import QR from "./../src/assets/BEP20QR.png";
import warning from "./../src/assets/icons/warning.svg";
import Badge from "react-bootstrap/Badge";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaRegCopy } from "react-icons/fa"; // Font Awesome icon

export default function Dashboard({ user }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [availablePlans, setAvailablePlans] = useState([]);
  const [activePlans, setActivePlans] = useState([]);
  const [miningProgress, setMiningProgress] = useState({}); // planId => mined value
  const [copiedWallet, setCopiedWallet] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const referralLink = `${import.meta.env.VITE_URL}/?ref=${user?.referralCode}`;
  const WalletAddress = "0x506A5640859e3bBBb07a5481275bd0b8441365da";

  useEffect(() => {
    try {
      const plans = async () => {
        const res = await axiosInstance.get("/plans/user");
        console.log(res,'ssss')
        setActivePlans(res?.data?.activePlans);
        setAvailablePlans(res?.data?.availablePlans);
        console.log(res, "response");

        res.data.activePlans.forEach((plan) => {
          simulateMining(plan);
        });
      };

      plans();
    } catch (error) {
      console.log(error, "error");
    }
  }, []);

  const simulateMining = (plan) => {
    const planId = plan._id;
    const totalSeconds =
      (new Date(plan.endDate) - new Date(plan.startDate)) / 1000;
    const rewardPerSecond = (plan.reward - plan.amount) / totalSeconds;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedSeconds = (now - new Date(plan.startDate)) / 1000;
      let minedAmount = elapsedSeconds * rewardPerSecond;

      // Cap mined value to the max reward limit
      minedAmount = Math.min(minedAmount, plan.reward - plan.amount);

      setMiningProgress((prev) => ({
        ...prev,
        [planId]: parseFloat(minedAmount.toFixed(8)),
      }));

      if (minedAmount >= plan.reward - plan.amount) {
        clearInterval(interval); // stop when full reward mined
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

  const copyWalletAddress = async () => {
    try {
      await navigator.clipboard.writeText(WalletAddress);
      setCopiedWallet(true);
      setTimeout(() => setCopiedWallet(false), 2000);
    } catch (err) {
      console.error("Failed to copy wallet address:", err);
    }
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    navigate("/");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user.email}</p>
      <div>Balance: {user?.balance}</div>
      <div>Bonus: {user?.bonus}</div>

      <div className="flex gap-4 items-center justify-center m-6">
        {/* All Plans Div */}
        <div className="flex gap-4">
          {activePlans?.map(
            (plan, id) =>
              plan?.status == "active" && (
                <div
                  className="bg-green-300 p-4 rounded-md max-w-fit text-center"
                  key={id}
                >
                  <div className="text-xl font-bold">{plan?.planName}</div>
                  <div>Invest - ${plan?.amount}</div>
                  <div>Withdraw - ${plan?.reward}</div>
                  <div>{convertToIST(plan?.endDate)}</div>
                  <div>
                    Mining: $
                    {miningProgress[plan._id]?.toFixed(8) || plan.mined}
                  </div>
                  <div className="bg-blue-500 px-3 py-1 rounded-md text-white mt-6">
                    Withdraw
                  </div>
                </div>
              )
          )}
        </div>
        <div className="flex gap-4">
          {activePlans?.map(
            (plan, id) =>
              plan?.status == "pending" && (
                <div
                  className="bg-yellow-300 p-4 rounded-md max-w-fit text-center"
                  key={id}
                >
                  <div className="text-xl font-bold">{plan?.planName}</div>
                  <div>Invest - ${plan?.amount}</div>
                  <div>Withdraw - ${plan?.reward}</div>
                  <div>{convertToIST(plan?.endDate)}</div>
                  <div>
                    Mining:
                    Yet to start
                  </div>
                  <div className="bg-gray-500 px-3 py-1 rounded-md text-white mt-6">
                    Waiting for approval
                  </div>
                </div>
              )
          )}
        </div>
        <div className="flex items-center gap-4">
          {availablePlans?.map((plan, id) => (
            <div
              className="bg-pink-300 p-4 rounded-md max-w-fit text-center "
              key={id}
            >
              <div className="text-xl font-bold">{plan?.planName}</div>
              <div>Invest - ${plan?.amount}</div>
              <div>Withdraw - ${plan?.reward}</div>
              <div>Duration - {plan?.durationDays} days</div>
              <div
                className="bg-blue-500 px-3 py-1 rounded-md text-white mt-6 cursor-pointer"
                onClick={handleShow}
              >
                Purchase
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        onClick={copyToClipboard}
        className="flex gap-1 bg-blue-600 max-w-fit px-4 py-2 rounded-md text-white m-4 cursor-pointer hover:bg-blue-800"
      >
        <div>Referral Code:</div>
        <div>{referralLink}</div>
      </div>
      <>
        <Modal
          show={show}
          onHide={handleClose}
          centered
          // size="sm"
          backdrop="static"
          keyboard={false}
        >
          {/* <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header> */}
          <Modal.Body className="payment-qr">
            <div className="flex bg-yellow-400 bg-opacity-40 gap-2 p-2 rounded-md">
              <img src={warning} alt="warning" />
              <div className="text-xs">
                Only send Tether USD (BEP20) assets in this address. Other
                assets will be lost forever.
              </div>
            </div>
            <div className="flex items-center gap-1 justify-center py-3">
              <img src={''} alt="logo" />
              <div className="font-semibold text-lg">USDT</div>
              <Badge pill bg="secondary">
                BEP20
              </Badge>
            </div>
            <img src={QR} alt="qr" className="" />
            {/* <div className="text-center text-sm text-gray-500 mt-2">
              0x506A5640859e3bBBb07a5481275bd0b8441365da
            </div> */}

            <div className="text-center text-sm text-gray-500 mt-4 flex justify-center items-center gap-2">
              <span>{WalletAddress}</span>

              <div className="relative">
                <FaRegCopy
                  size={16}
                  className="cursor-pointer text-gray-600 hover:text-black"
                  onClick={copyWalletAddress}
                />

                {copiedWallet && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow">
                    Copied!
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center mt-4">
              <Button variant="primary">Copy Address</Button>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
            </div>
          </Modal.Body>
          {/* <Modal.Footer></Modal.Footer> */}
        </Modal>
      </>

      {copied && (
        <div className="text-green-600 font-semibold ml-4">
          Copied to clipboard!
        </div>
      )}

      <button onClick={logout}>Logout</button>
    </div>
  );
}


// import React, { useState, useEffect } from "react";

// const plans = [
//   { id: 1, title: "Basic", price: 50, duration: 30, profit: 5 },
//   { id: 2, title: "Standard", price: 100, duration: 30, profit: 8 },
//   { id: 3, title: "Premium", price: 500, duration: 60, profit: 15 },
//   { id: 4, title: "VIP", price: 1000, duration: 90, profit: 25 },
// ];

// export default function MiningDashboard() {
//   const [activePlan, setActivePlan] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [wallet, setWallet] = useState(1000);
//   const [earnings, setEarnings] = useState(0);

//   useEffect(() => {
//     if (activePlan) {
//       const interval = setInterval(() => {
//         setProgress((prev) => {
//           const next = prev + 1;
//           if (next >= 100) {
//             clearInterval(interval);
//             const profit = (activePlan.price * activePlan.profit) / 100;
//             setEarnings((e) => e + profit);
//             setWallet((w) => w + profit);
//             setActivePlan(null);
//             return 0;
//           }
//           return next;
//         });
//       }, 300); // simulate progress
//       return () => clearInterval(interval);
//     }
//   }, [activePlan]);

//   const buyPlan = (plan) => {
//     if (wallet >= plan.price) {
//       setWallet(wallet - plan.price);
//       setActivePlan(plan);
//       setProgress(0);
//     } else {
//       alert("Insufficient balance.");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <header className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">USDT Mining Dashboard</h1>
//         <div>
//           <span className="mr-4">Wallet: ${wallet.toFixed(2)}</span>
//           <span>Earnings: ${earnings.toFixed(2)}</span>
//         </div>
//       </header>

//       {/* Plan Cards */}
//       <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         {plans.map((plan) => (
//           <div key={plan.id} className="bg-white p-4 rounded shadow">
//             <h2 className="text-lg font-semibold mb-2">{plan.title}</h2>
//             <p>Price: ${plan.price}</p>
//             <p>Duration: {plan.duration} days</p>
//             <p>Profit: {plan.profit}%</p>
//             <button
//               onClick={() => buyPlan(plan)}
//               disabled={!!activePlan}
//               className="mt-3 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
//             >
//               Buy Plan
//             </button>
//           </div>
//         ))}
//       </section>

//       {/* Mining Simulation */}
//       {activePlan && (
//         <section className="bg-white p-4 rounded shadow mb-6">
//           <h2 className="text-xl font-semibold mb-2">
//             Mining: {activePlan.title}
//           </h2>
//           <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
//             <div
//               className="bg-green-500 h-4 rounded-full"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//           <p>Progress: {progress}%</p>
//         </section>
//       )}
//     </div>
//   );
// }
