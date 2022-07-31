import React, { useEffect, useRef, useState } from "react";
import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";
import useLoader from "../hooks/useLoader";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { config, getMoviesBycategory } from "../tmbd";
import { Movie } from "./Banner";
import Card from "./Card";
import PopUpCard from "./PopUpCard";


interface Movies extends Movie {
  open: boolean;
}

interface RefDivElement {
  current: HTMLDivElement | null;
} 


const Cards = ({ name, id,type }: { id: number, name: string,type: string }) => {
  const [data, setData] = useState<Movie[]>([]);
  const [show, setShow] = useState<Movies>({ open: false});
  const [toggle, setToggle] = useState<boolean>(false);

  const [value, setValue] = useState(0)

  const ref = useRef() as RefDivElement;

  

  const fetchData = async () => {
    const res = await getMoviesBycategory(id,type);
    setData(res);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const loaded = useLoader({
    src: `${config?.IMAGE_URL + data[0]?.backdrop_path ?? data[0]?.poster_path}`,
  });
  

  return (
    <div
      className={`relative transition-all duration-300 ease ${loaded ? "inline" : "hidden"}`}
      onMouseEnter={() => setToggle(true)}
      onMouseLeave={() => setToggle(false)}
    >
      <div className="flex items-center justify-between">
        <p className="text-white text-md font-semibold pl-[45px]">{name}</p>

        <div></div>
      </div>

      <div
        ref={ref}
        className={`pl-[35px] relative flex overflow-x-scroll ${
          toggle ? "scrollbar-style" : "scrollbar"
        } transition-all duration-300 ease`}
      >
        {data.map((result, index) => (
          <Card key={index} {...result} setShow={setShow} show={show} />
        ))}
      </div>
      {show.open && <PopUpCard setShow={setShow} {...show} />}
    </div>
  );
};

export default Cards;
