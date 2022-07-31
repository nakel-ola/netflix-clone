import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Cards from "../components/Cards";
import Header from "../components/Header";
import {  getRandomData } from "../tmbd";

const num = Math.floor(Math.random() * 2);

interface Data {
  id: number;
  name: string;
  type: string;
}

const Home = ({ data }: { data: Data[]}) => {
  return (
    <div className="">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner type={num === 0 ? "movie" : "tv" } />
      <div className="relative mt-[20px] lg:mt-[-200px]">
        {data.map((props, index) => (
          <Cards key={index} {...props} />
        ))}
      </div>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const res = await getRandomData();
  return {
    props: {
      data: res,
    },
  };
}
