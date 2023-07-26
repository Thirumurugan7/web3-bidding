import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllWinners } from "../config/BlockchainServices";
import gif from "../200w.webp";
import winnerImg from "../winner.jpeg";
const LeaderBoard = () => {
  const [winnerData, setWinnerData] = useState([]);
  const [gotData, setGotData] = useState(false);
  const allWinners = async () => {
    console.log("getting allWinners");
    const res = await getAllWinners();

    const winnerDataArray = res.map((winner: any) => {
      return {
        address: winner[0],
        timestamp: winner[1].toString(),
        amount: winner[2].toString(),
      };
    });

    console.log(winnerDataArray);
    setWinnerData(winnerDataArray.reverse());
  };

  useEffect(() => {
    allWinners();
    setGotData(true);
  }, []);

  const gweiToEth = (gwei: any) => {
    // 1 Ether (ETH) = 1,000,000,000 Gwei (Giga-wei)
    const gweiInEther = 10 ** 9;
    const ethValue = gwei / gweiInEther;
    return ethValue.toFixed(5); // Return the value rounded to 5 decimal places
  };

  return (
    <div className="flex min-h-full flex-col items-center justify-center overflow-auto scroll-smooth bg-gradient-to-b from-purple-500 via-pink-500 to-red-500 py-[150px]">
      <motion.h1
        className="mb-8 text-4xl font-bold text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Congratulations to the Winners! 🎉
      </motion.h1>

      <div className="min-w-3xl w-2xl overflow-hidden rounded-lg bg-white shadow-lg">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-200 bg-gray-100 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Address
              </th>
              <th className="border-b-2 border-gray-200 bg-gray-100 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Timestamp
              </th>
              <th className="border-b-2 border-gray-200 bg-gray-100 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {winnerData.map((winner, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="border-b border-gray-200 px-4 py-3 text-sm">
                  {winner.address}
                </td>
                <td className="border-b border-gray-200 px-4 py-3 text-sm">
                  {new Date(winner.timestamp * 1000).toLocaleString()}
                </td>
                <td className="border-b border-gray-200 px-4 py-3 text-sm">
                  {gweiToEth(gweiToEth(winner.amount))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="mt-8">
        <motion.img
          src="../winner.jpeg"
          alt="Winner Celebration"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        />
      </div> */}
    </div>
  );
};

export default LeaderBoard;
