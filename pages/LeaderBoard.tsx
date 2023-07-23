import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllWinners } from "./BlockchainServices";
import gif from "../200w.webp";
import winnerImg from "../winner.jpeg";
const LeaderBoard = () => {
  const [winnerData, setWinnerData] = useState([]);
  const [gotData, setGotData] = useState(false);
  const allWinners = async () => {
    console.log("getting allWinners");
    const res = await getAllWinners();

    // console.log(res);
    // setWinnerData(res);

    // res.map((val: any) => {
    //   console.log(val[0]);
    //   console.log(val[1].toString());
    //   console.log(val[2].toString());
    // });

    // Convert winnerData to an array of objects
    const winnerDataArray = res.map((winner: any) => {
      return {
        address: winner[0],
        timestamp: winner[1].toString(),
        amount: winner[2].toString(),
      };
    });

    console.log(winnerDataArray);
    setWinnerData(winnerDataArray);
  };

  useEffect(() => {
    allWinners();
    setGotData(true);
  }, []);
  // Replace winnersData with your actual data
  const winnersData = [
    { address: "0x123abc", timestamp: "Jul 21, 2023", amount: "0.05 ETH" },
    { address: "0x456def", timestamp: "Jul 20, 2023", amount: "0.03 ETH" },
    // Add more winners' data as needed
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-500 via-pink-500 to-red-500">
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
                  {winner.timestamp}
                </td>
                <td className="border-b border-gray-200 px-4 py-3 text-sm">
                  {winner.amount}
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
