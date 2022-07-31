import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Cards from "../components/Cards";
import Header from "../components/Header";
import { getMoviesList } from "../tmbd";

const Home: NextPage = () => {
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    const res = await getMoviesList();

    setData(res);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner type="movie" />
      <div className="relative mt-[20px] lg:mt-[-200px]">
        {data.map((props, index) => (
          <Cards key={index} {...props} type="movie" />
        ))}
      </div>
    </div>
  );
};

export default Home;
