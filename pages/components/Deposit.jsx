import React, { useState, useEffect } from "react";
import {
  deposit,
  getTotalPlayers,
  getRemainingTime,
  getLastDepositor,
  getPot,
  getPlayerDepositCount,
  getPlayerTotalDeposit,
  getDepositAmount,
  SplitDeposit,
} from "../../config/BlockchainServices";
import { useAccount } from "wagmi";
import MyTimer from "./Timer";
import { createKey } from "next/dist/shared/lib/router/router";

const weiToEth = (wei) => {
  // 1 Ether (ETH) = 10^18 Wei
  const etherInWei = 10n ** 18n;
  const weiBigInt = BigInt(wei);
  const ethValue = Number(weiBigInt) / Number(etherInWei);
  return ethValue;
};
const gweiToEth = (gwei) => {
  // 1 Ether (ETH) = 1,000,000,000 Gwei (Giga-wei)
  const gweiInEther = 10 ** 9;
  const ethValue = gwei / gweiInEther;
  return ethValue.toFixed(5); // Return the value rounded to 5 decimal places
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
};

const useTimer = () => {
  const [timer, setTimer] = useState(0);

  const [gotTime, setGotTime] = useState(false);

  const [isGameEnded, setIsGameEnded] = useState(false);

  const [endGame, setEndGame] = useState(false);
  useEffect(() => {
    if (timer === "00:00") {
      setIsGameEnded(true);
      console.log(timer, isGameEnded);
    }
  }, [timer]);

  useEffect(() => {
    const handleGetTime = async () => {
      const res = await getRemainingTime();
      const time = formatTime(res.toString());
      console.log("rem timme:", time, typeof time);
      if (time === "00:00") {
        console.log(true);
        setEndGame(true);
      }
      console.log(endGame);
      setTimer(time);
    };

    const automateSplitAndUnfreeze = async () => {
      // Check if the game is not frozen and remaining time is 0
      console.log("Timer:", timer);

      if (timer === "0" || timer === "00:00" || endGame) {
        // Wait for 15 seconds
        console.log("intered timer");
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Call the SplitDeposit function
        try {
          if ("something") {
            console.log("Calling SplitDeposit...");
            const splitTx = await SplitDeposit();
            await splitTx.wait(); // Wait for the transaction to be mined
            console.log("SplitDeposit function called successfully!");

            return;
          }
        } catch (error) {
          console.error("Error in automateSplitAndUnfreeze:", error);
        }
      }
    };

    const intervalId = setInterval(() => {
      handleGetTime();

      automateSplitAndUnfreeze();
    }, 1000); // Update the timer every second

    handleGetTime();
    setGotTime(true);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return { timer, gotTime };
};

const useBlockchainData = () => {
  const { address } = useAccount();
  const [potvalue, setPotvalue] = useState("");
  const [totalPlayers, setTotalPlayers] = useState("");
  const [LastDepositor, setlastDepositor] = useState("");
  const [mydeposit, SetMydeposit] = useState("");
  // const [address, setaddress] = useState("");
  const [depositamount, setdeposit] = useState("");
  useEffect(() => {
    const getPotvalue = async () => {
      const res = await getPot();
      const ethValue = weiToEth(res.toString());
      setPotvalue(ethValue);
    };
    const getLastDepositoraddress = async () => {
      const res = await getLastDepositor();
      setlastDepositor(res);
    };

    const getTotalPlayersfunc = async () => {
      const res = await getTotalPlayers();
      setTotalPlayers(res.toString());
    };
    const getdepo = async () => {
      const res = await getDepositAmount();
      const eth = gweiToEth(res.toString());
      setdeposit(gweiToEth(eth));
    };
    const getIndividualDeposit = async () => {
      const res = await getPlayerTotalDeposit({ address });
      const eth = gweiToEth(res.toString());
      SetMydeposit(gweiToEth(eth));
      console.log("depo", mydeposit);
    };

    const intervalId = setInterval(() => {
      getPotvalue();
      getTotalPlayersfunc();

      getdepo();
      getLastDepositoraddress();
      getIndividualDeposit();
    }, 1000); // Update the data every second

    getPotvalue();
    getTotalPlayersfunc();

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return {
    potvalue,
    totalPlayers,
    LastDepositor,
    mydeposit,

    depositamount,
  };
};

const Deposit = () => {
  const { timer, gotTime } = useTimer();
  const {
    potvalue,
    totalPlayers,
    LastDepositor,
    mydeposit,

    depositamount,
  } = useBlockchainData();

  const [expiryTimestamp, setExpiryTimestamp] = useState(0); // Add expiryTimestamp state

  useEffect(() => {
    // Fetch the expiryTimestamp here and update the state
    const fetchExpiryTimestamp = async () => {
      const res = await getRemainingTime();
      setExpiryTimestamp(res);
    };

    // Fetch the initial expiryTimestamp
    fetchExpiryTimestamp();

    // Fetch the expiryTimestamp every second
    const intervalId = setInterval(fetchExpiryTimestamp, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const isGameEnded = timer === "00:00"; // Check if the timer is at 0:00

  const handleClick = async () => {
    console.log("started deposit");
    const getupdatedamount = depositamount;
    const res = await deposit({ getupdatedamount });
    console.log(res.toString());
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-purple-500 via-pink-500 to-red-500 pb-20 pt-40 text-white">
      <div className="flex flex-row space-x-20 rounded-lg border-x border-x-white p-5 pb-16">
        {isGameEnded ? (
          <></>
        ) : (
          <div className="">
            <div className="flex flex-col space-y-2 rounded-lg border border-white border-x-white p-20 ">
              <p>My Deposit:</p>
              <p className="rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg">
                {mydeposit}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-2 rounded-lg border border-white border-x-white p-20 ">
          <p>Deposit Amount:</p>
          <button className="rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg">
            {depositamount}
          </button>
        </div>
        <div className="flex flex-col space-y-2 rounded-lg border border-white border-x-white p-20 ">
          <p>Pot Value:</p>
          <button className="rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg">
            {potvalue}
          </button>
        </div>
        <div className="flex flex-col rounded-lg border border-white border-x-white p-20 ">
          <p className="text-center">
            {" "}
            Total Number<br></br> of players:
          </p>
          <button className="rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg">
            {totalPlayers}
          </button>
        </div>
      </div>
      <h1 className="mb-8 pt-5 text-4xl font-bold">Welcome to Bidding App</h1>
      <p className="mb-4 text-lg">Place your bids with cryptocurrency</p>
      <p className="mb-4 text-lg">Win exciting rewards!</p>

      <div>
        {gotTime ? (
          <>
            <>
              <p className="text-center text-xl">Remaining Time:</p>
              <MyTimer expiryTimestamp={timer} gotTime={gotTime} />
            </>
          </>
        ) : (
          <p>Time not got</p>
        )}
      </div>

      <div className="mt-8 animate-bounce">
        {isGameEnded ? (
          <>
            <p className="text-center text-xl font-bold text-green-500">
              {" "}
              Last Game Winner: {LastDepositor}
            </p>
            <p className="text-center text-xl font-bold text-red-800">
              Ooops, Game is ended.
              <br /> wait for the admin to unfreeze it
            </p>
          </>
        ) : (
          <button
            className="rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg"
            onClick={handleClick}
          >
            Deposit
          </button>
        )}
      </div>
    </div>
  );
};

export default Deposit;
