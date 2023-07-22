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
