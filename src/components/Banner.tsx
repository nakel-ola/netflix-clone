import React, { useEffect, useState } from "react";
import { IoInformationCircleOutline, IoPlay } from "react-icons/io5";
import useInterval from "../hooks/useInterval";
import { config, getPopularMovies } from "../tmbd";

export interface Movie {
    adult?: boolean;
    backdrop_path?: string;
    genre_ids?: number[];
    id?: number;
    name?: string;
    description?: string;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    release_date?: string
    title?: string;
    video?: boolean;
    vote_average?: number
    vote_count?: number
}

let totalLength = 0;

export const truncate = (text?: string, num: number = 20) =>
  text ? (text.length > num ? text.substring(0, num - 1) + "..." : text) : null;

const Banner = ({ type }: { type: string }) => {
  const [data, setData] = useState<Movie[]>([]);
  const [item, setItem] = useState<Movie>({});

  useInterval(() => {
    const num = Math.floor(Math.random() * totalLength);
    setItem(data[num]);
  },30000)

  const fetchData = async () => {
      const res = await getPopularMovies(type);
      totalLength = res.length;
      setData(res);
      setItem(res[0]);
  }
  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className="w-full z-[-10] overflow-hidden">
      <img
        src={`${config.IMAGE_URL + item?.backdrop_path}`}
        alt=""
        className="w-full h-full object-contain relative transition-all duration-300 ease"
      />

      <div className="absolute top-0 w-full h-full object-contain bg-gradient-to-b from-neutral-900/70 via-neutral-900/10 to-neutral-900/70">
        <div className="mt-[70px] md:mt-[80px] lg:mt-[100px] w-[500px] px-[20px] lg:px-[50px] h-full">
          <p className="text-2xl lg:text-5xl font-semibold py-2 text-white">
            {item?.title || item?.name || item?.original_title}
          </p>
          <p className="text-md text-white py-2">
            {truncate(item?.overview, 200)}
          </p>

          <div className="flex items-center">
            <button className="bg-white flex items-center text-black py-[3px] px-[8px] border-0 outline-0 rounded-md m-[5px] ml-[0] mr-[10px]">
              <IoPlay className="mx-[5px] text-[20px]" />
              Play
            </button>
            <button className="bg-white/30 flex items-center text-white py-[3px] px-[8px] border-0 outline-0 rounded-md m-[5px] mr-[10px] ">
              <IoInformationCircleOutline className="mx-[5px] text-[20px]" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
