import React from "react";
import {
  deposit,
  getTotalPlayers,
  SplitDeposit,
  getRemainingTime,
  getRemainingFreezeTime,
} from "../BlockchainServices";

import MyTimer from "./Timer";
const Deposit = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  const handleClick = async () => {
    console.log("started deposit");
    const res = await deposit();

    console.log(res.toString());
  };
  const handleGetTime = async () => {
    console.log("getting time");
    const res = await getRemainingTime();

    console.log(res.toString());
  };
  const handleGetFreezeTime = async () => {
    console.log("getting freeze time");
    const res = await getRemainingFreezeTime();

    console.log(res.toString());
  };

  const handleGetTotalPlayer = async () => {
    console.log("getting freeze time");
    const res = await getTotalPlayers();

    console.log(res.toString());
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white">
      <h1 className="mb-8 text-4xl font-bold">Welcome to Bidding App</h1>
      <p className="mb-4 text-lg">Place your bids with cryptocurrency</p>
      <p className="mb-4 text-lg">Win exciting rewards!</p>

      <div>
        <MyTimer expiryTimestamp={time} />
      </div>
      <div className="mt-8 animate-bounce">
        <button
          className="rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg"
          onClick={handleClick}
        >
          Deposit
        </button>
        <button
          className="rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg"
          onClick={handleGetTime}
        >
          Get Time
        </button>
      </div>
    </div>
  );
};

export default Deposit;
