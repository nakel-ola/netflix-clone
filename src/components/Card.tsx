import React, { Fragment, MouseEvent, useState } from "react";
import useLoader from "../hooks/useLoader";
import { config } from "../tmbd";
import { Movie } from "./Banner";


interface CardProps extends Movie {
  show: any;
  setShow: (value: any) => void;
}


const Card = (props: CardProps) => {
  const {
    backdrop_path,
    poster_path,
    title,
    name,
    original_title,
    show,
    setShow,
  } = props;

  const loaded = useLoader({
    src: `${config.IMAGE_URL + backdrop_path ?? poster_path}`,
  });

  return (
    <Fragment>
      <div
        onClick={() => setShow({ ...props, open: true })}
        className={`relative lg:w-60 w-52 h-24 lg:h-32 m-[5px] rounded-lg overflow-hidden transition-transform duration-300 ease-in-out shrink-0 ${
          loaded ? "inline" : "hidden"
        }`}
      >
        <img
          src={`${config.IMAGE_URL + backdrop_path ?? poster_path}`}
          alt=""
          className="relative w-full h-full object-cover"
        />
        <div className="absolute top-0 h-full w-full bg-gradient-to-t from-neutral-900/20 to-neutral-900/10"></div>
        <p className="absolute bottom-0 w-full text-white text-lg p-2 drop-shadow-md">
          {title || name || original_title}
        </p>
      </div>
    </Fragment>
  );
};

export default Card;
