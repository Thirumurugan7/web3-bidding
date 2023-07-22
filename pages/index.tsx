import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "./components/Header";
import Link from "next/link";
const dashboardTitle =
  "Earn and Play with Cryptocurrency Deposits in Crypto Coffee";
const dashboardSubtitle = "An Web3 Deposit Game Application";
const dashboardCTALink = "/";
const dashboardCTAText = "Get started";
const dashboardLearnMoreLink = "#";
const dashboardLearnMoreText = "Learn more →";

const Home: NextPage = () => {
  return (
    <div className="flex bg-black text-white min-h-screen flex-col items-center justify-between p-24 bg-black">
      <Header />
      <div className="relative isolate px-6  lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-40"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(40%-11rem)] aspect-[1155/678]  bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(40%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl  sm:pt-20 ">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-200 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next round of funding.{" "}
              <Link href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-200 sm:text-6xl">
              {dashboardTitle}
            </h1>
            <p className="mt-6 text-lg leading-8 italic text-pink-600">
              {dashboardSubtitle}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={dashboardCTALink}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {dashboardCTAText}
              </Link>
              <Link
                href={dashboardLearnMoreLink}
                className="text-sm font-semibold leading-6 text-gray-200"
              >
                {dashboardLearnMoreText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
