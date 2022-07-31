import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import useLoader from "../hooks/useLoader";
import { config } from "../tmbd";
import { Movie, truncate } from "./Banner";

const SimilarCard = (props: Movie) => {
  const { title, backdrop_path, poster_path, overview, original_title, name, } =
    props;

    const loaded = useLoader({
      src: `${config.IMAGE_URL + backdrop_path ?? poster_path}`,
    });
  return (
    <div className={`w-[230px] h-[300px] shadow-md m-[8px] rounded-md bg-neutral-700 overflow-hidden ${loaded ? "inline" : "hidden"}`}>
      <div className="relative w-[230px] h-[120px]">
        <img
          src={`${config.IMAGE_URL + backdrop_path ?? poster_path}`}
          alt=""
          className="w-full h-full object-cover relative"
        />

        <IoAddCircleOutline className="absolute top-2 right-2 text-white text-[35px]" />
      </div>

      <p className="text-xl text-white p-[8px]">
        {title || name || original_title}
      </p>

      <p className="text-white text-sm p-[8px]">{truncate(overview,130)}</p>
    </div>
  );
};

export default SimilarCard;
