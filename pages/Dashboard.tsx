import React, { useState } from "react";
import {
  SplitDeposit,
  UnFreeze,
  changeDefaultTime,
  changeDepositAmount,
  resetDefaultTime,
} from "./BlockchainServices";

function Dashboard() {
  const [amount, setAmount] = useState("");
  const [defaulttime, setDefaulttime] = useState();
  const [reset, setReset] = useState();

  const handleUnFreeze = async () => {
    const res = await UnFreeze();
    console.log(res);
  };

  const handleSplitDeposit = async () => {
    const res = await SplitDeposit();
    console.log(res);
  };
  const handleresettime = async () => {
    const res = await resetDefaultTime({ reset });
    console.log(res);
  };

  const handleChangeAmount = (e: any) => {
    setAmount(e.target.value);
  };
  const handleChangeReset = (e: any) => {
    setReset(e.target.value);
  };
  const handleChangeDefault = (e: any) => {
    setDefaulttime(e.target.value);
  };

  const handleSubmitAmount = async () => {
    const res = await changeDepositAmount({ amount });
    console.log(res);
  };
  const Default = async () => {
    console.log(defaulttime);
    const res = await changeDefaultTime({ defaulttime });
    console.log(res);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-500 via-pink-500 to-red-500">
      <h1 className="mb-8 text-4xl font-bold text-white">Organizer Page</h1>

      <div className="mb-8 flex space-x-4">
        <button
          onClick={handleUnFreeze}
          className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:bg-blue-600"
        >
          Un Freeze
        </button>
        <button
          onClick={handleSplitDeposit}
          className="rounded-lg bg-green-500 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:bg-green-600"
        >
          Split Deposit
        </button>
      </div>

      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Change Game time"
          value={reset}
          onChange={handleChangeReset}
          className="rounded-lg border px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring"
        />
        <button
          onClick={handleresettime}
          className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:bg-yellow-600"
        >
          Submit
        </button>
      </div>

      <div className="mt-4 flex space-x-4">
        <input
          type="text"
          placeholder="Change Freezing time"
          value={defaulttime}
          onChange={handleChangeDefault}
          className="rounded-lg border px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring"
        />
        <button
          onClick={Default}
          className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:bg-yellow-600"
        >
          Submit
        </button>
      </div>

      <div className="mt-4 flex space-x-4">
        <input
          type="text"
          placeholder="Deposit Amount in (wei)"
          value={amount}
          onChange={handleChangeAmount}
          className=" rounded-lg border px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring"
        />
        <button
          onClick={handleSubmitAmount}
          className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:bg-yellow-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
