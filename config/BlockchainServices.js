import Web3 from "web3";
import gamblingabi from "../pages/abi/gambling.json";
import { ethers } from "ethers";

const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js
const { ethereum } = isBrowser();
if (ethereum) {
  isBrowser().web3 = new Web3(ethereum);
  isBrowser().web3 = new Web3(isBrowser().web3.currentProvider);
}

const Address = "0xe2fa150d609908e5F04D0fE549f59F13Ed35f727";

export const deposit = async ({ getupdatedamount }) => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();

  console.log(provider);
  const signer = provider.getSigner();
  console.log(signer);
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  console.log(Role);
  const tokenId = await Role.deposit({
    value: ethers.utils.parseEther(getupdatedamount),
  });
  console.log(tokenId);
  return tokenId;
};

export const getRemainingTime = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.getRemainingTime();
  return tokenId;
};

// getPlayerTotalDeposit;

export const getTotalPlayers = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();

  console.log(provider);
  const signer = provider.getSigner();
  console.log(signer);
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  console.log(Role);
  const tokenId = await Role.getTotalPlayers();
  console.log(tokenId);
  return tokenId;
};
export const getPlayerDepositCount = async ({ address }) => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.getPlayerDepositCount(address);
  return tokenId;
};

export const getPlayerTotalDeposit = async ({ address }) => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.getPlayerTotalDeposit(address);
  return tokenId;
};

export const SplitDeposit = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  console.log(provider);
  const signer = provider.getSigner();
  console.log(signer);
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  console.log(Role);

  const tokenId = await Role.SplitDeposit();
  console.log(tokenId);
  return tokenId;
};
export const UnFreeze = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  console.log(provider);
  const signer = provider.getSigner();
  console.log(signer);
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  console.log(Role);

  const tokenId = await Role.unfreezeGame();
  console.log(tokenId);
  return tokenId;
};

export const getLastDepositor = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.getLastDepositor();
  return tokenId;
};

export const resetDefaultTime = async ({ reset }) => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.resetDefaultTime(reset);
  return tokenId;
};

export const getRemainingFreezeTime = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.getRemainingFreezeTime();
  return tokenId;
};

export const getDepositAmount = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.getDeposit();
  return tokenId;
};

export const changeDefaultTime = async ({ defaulttime }) => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.changeDefaultTime(defaulttime);
  return tokenId;
};

export const getAllWinners = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.getAllWinners();
  return tokenId;
};

export const isGameCurrentlyFrozen = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.isGameCurrentlyFrozen();
  return tokenId;
};

export const getPot = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.getPot();
  return tokenId;
};

export const getFreezeTime = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.getFreezeTime();
  return tokenId;
};

export const getStartTime = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.getStartTime();
  return tokenId;
};

export const getEndTime = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.getEndTime();
  return tokenId;
};

export const changeDepositAmount = async ({ amount }) => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.changeDepositAmount(amount);
  return tokenId;
};
