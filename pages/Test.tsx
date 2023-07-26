import React from "react";

const Test = () => {
  // Sample data for demonstration (replace with real data)
  const currentWinnerAddress = "0x123456789abcdef";
  const totalPlayers = 50;
  const totalPotValue = 1000;
  const timerValue = "01:30";

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-600 to-indigo-800 text-white">
      <div className="container mx-auto rounded-lg p-8 shadow-lg">
        <h1 className="mb-6 text-4xl font-semibold">Gambling App</h1>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Current Winner Address:</h2>
          <p className="text-gray-200">{currentWinnerAddress}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Total Number of Players:</h2>
          <p className="text-gray-200">{totalPlayers}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Total Pot Value:</h2>
          <p className="text-gray-200">${totalPotValue}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Timer:</h2>
          <p className="text-gray-200">{timerValue}</p>
        </div>

        <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Deposit
        </button>
      </div>
    </div>
  );
};

export default Test;
