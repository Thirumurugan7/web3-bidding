import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { chains, wagmiClient } from "../config/walletConfig";
import { Web3Context } from "../config/Web3Context";
import Web3 from "web3";
import Header from "./components/Header";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <Web3Context.Provider value={Web3}>
        <>
          <Header />
          <Component {...pageProps} />
        </>
      </Web3Context.Provider>
    </WagmiConfig>
  );
}

export default MyApp;
