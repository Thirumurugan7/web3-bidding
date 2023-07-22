import Web3 from "web3";
import gamblingabi from "./abi/gambling.json";
import { ethers } from "ethers";

const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js
const { ethereum } = isBrowser();
if (ethereum) {
  isBrowser().web3 = new Web3(ethereum);
  isBrowser().web3 = new Web3(isBrowser().web3.currentProvider);
}

const Address = "0x2Ccc4092cB7D985296DA3F9A8a407aD694c658FC";

export const deposit = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.deposit();
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

getPlayerTotalDeposit;

export const getTotalPlayers = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.getTotalPlayers();
  return tokenId;
};
export const getPlayerDepositCount = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.getPlayerDepositCount(signer);
  return tokenId;
};

export const getPlayerTotalDeposit = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.getPlayerTotalDeposit(signer);
  return tokenId;
};

export const SplitDeposit = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.SplitDeposit(signer);
  return tokenId;
};

export const getLastDepositor = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.getLastDepositor(signer);
  return tokenId;
};

export const resetDefaultTime = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.resetDefaultTime();
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

export const changeDefaultTime = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(Address, gamblingabi, signer);
  const tokenId = await Role.changeDefaultTime();
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
