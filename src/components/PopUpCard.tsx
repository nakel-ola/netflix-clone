import React, { useEffect, useRef, useState } from "react";
import {
  IoCheckmark,
  IoClose,
  IoPlay,
  IoThumbsUpOutline,
  IoVolumeHighOutline,
} from "react-icons/io5";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { config, getSimilarMovies, genres, getCast } from "../tmbd";
import { Movie, truncate } from "./Banner";
import SimilarCard from "./SimilarCard";

interface RefDivElement {
  current: HTMLDivElement;
}

interface PopUpCardProps extends Movie {
  open: boolean;
  setShow: (value: any) => void;
}

const PopUpCard = ({
  setShow,
  id,
  title,
  name,
  original_title,
  overview,
  backdrop_path,
  poster_path,
  genre_ids,
}: PopUpCardProps) => {
  const ref = useRef() as RefDivElement;
  useOnClickOutside(ref, () => setShow({ open: false }));

  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);

  const fetchData = async () => {
    const res = await getCast(id ?? 0);
    const similarRes = await getSimilarMovies(id ?? 0);
    console.log(similarRes);
    setSimilar(similarRes);
    setCast(res.cast);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="fixed top-0 w-full z-[9999] h-full bg-neutral-900/50 grid place-items-center">
      <div
        ref={ref}
        className="w-[90%] lg:w-[800px] rounded-xl overflow-y-scroll scrollbar-style mt-[50px] h-[90vh] bg-neutral-800"
      >
        <div className="relative">
          <img
            src={`${config.IMAGE_URL + backdrop_path ?? poster_path}`}
            alt=""
            className="relative w-full h-full object-cover"
          />
          <div className="absolute top-0 h-full w-full bg-gradient-to-b from-neutral-900/70 via-neutral-900/10 to-neutral-900/70 z-10">
            <div
              onClick={() => setShow({ open: false })}
              className="bg-neutral-900 w-fit m-[10px] rounded-full ml-auto"
            >
              <IoClose className="text-white text-[25px]" />
            </div>

            <div className="px-[50px] h-[80%] flex flex-col">
              <div className="w-[500px]">
                <p className="text-5xl font-semibold py-2 text-white">
                  {title || name || original_title}
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center">
                  <button className="bg-white flex items-center text-black py-[3px] px-[8px] border-0 outline-0 rounded-md m-[5px] ml-[0] mr-[10px]">
                    <IoPlay className="mx-[5px] text-[20px]" />
                    Play
                  </button>
                  <button className="bg-black/30 flex items-center text-white p-[5px] border-[1px] outline-0 rounded-full m-[5px] mr-[10px] border-white">
                    <IoCheckmark className="m-[2px] text-[20px]" />
                  </button>
                  <button className="bg-black/30 flex items-center text-white p-[5px] border-[1px] outline-0 rounded-full m-[5px] mr-[10px] border-white">
                    <IoThumbsUpOutline className="m-[2px] text-[20px]" />
                  </button>
                </div>
                <button className="bg-black/30 flex items-center text-white p-[5px] border-[1px] outline-0 rounded-full m-[5px] mr-[10px] border-white">
                  <IoVolumeHighOutline className="m-[2px] text-[20px]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-[15px]">
          <p className="text-sm text-white py-2">
            <strong>Description:</strong> {truncate(overview, overview?.length)}
          </p>
          {cast?.length > 0 && (
            <p className="text-sm text-white py-[5px]">
              <strong>Cast:</strong>{" "}
              {cast
                ?.slice(0, 6)
                ?.map(({ name }: any) => name ?? false)
                .filter(Boolean)
                .join(", ")}
            </p>
          )}
          {genre_ids && genre_ids?.length > 0 && (
            <p className="text-sm text-white py-[5px]">
              <strong>Genres:</strong>{" "}
              {genre_ids
                .map(
                  (ids) =>
                    genres.find((genre) => genre.id === ids)?.name ?? false
                )
                .filter(Boolean)
                .join(", ")}
            </p>
          )}

          {similar?.length > 0 && (
            <div>
              <p className="text-4xl font-semibold py-2 text-white">
                More Like This
              </p>

              <div className="flex flex-wrap items-center justify-center">
                {similar?.slice(0,10).map((props: Movie, i: number) => (
                  <SimilarCard key={i} {...props} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopUpCard;
