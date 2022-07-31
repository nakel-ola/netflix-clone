import type { NextPage } from "next";
import Head from "next/head";
import { IoChevronForwardOutline} from "react-icons/io5"
import Header from "../components/Header";

const Home: NextPage = () => {


  return (
    <div className="">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="h-screen w-full relative">
        <img
          src="/netflix-image-background.jpg"
          alt=""
          className="relative w-full h-full object-cover"
        />

        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-neutral-900/90 via-neutral-900/10 to-neutral-900/90 grid place-items-center">
          <div className="w-[80%] lg:w-[50%] flex items-center flex-col text-center">
            <p className="text-4xl lg:text-6xl font-semibold py-2 text-white">
              Unlimited Movies, TV Shows, and more.
            </p>
            <p className="text-lg text-white py-2">
              Watch anywhere. Cancel anytime
            </p>
            <p className="text-sm text-white py-2">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>

            <div className="w-[80%] flex items-center justify-between bg-white">
              <input
                className="flex-1 m-[2px] ml-[5px] text-[1rem] border-0 outline-0"
                type="email"
                placeholder="Email address"
              />
              <button className="bg-red-700 flex items-center text-white p-[8px] border-0 outline-0">
                Get Started
                <IoChevronForwardOutline />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
