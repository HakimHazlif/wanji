import React from "react";
import RateCircle from "./RateCircle";
import { Link } from "react-router-dom";

const ShowCard = (props) => {
  const { id, title, image, releaseDate, rate, type } = props;

  const routeLink = type === "movies" ? `/movie/${id}` : `/serie/${id}`;

  return (
    <Link
      to={routeLink}
      className="w-60 bg-slate-100 rounded-lg overflow-hidden text-black"
    >
      <div className="relative">
        <img
          src={image}
          alt="movie poster"
          className="relative h-[370px] object-cover"
        />
        <div className="absolute bottom-[-16px] right-[15px]">
          <RateCircle rate={rate} />
        </div>
      </div>
      <div className="flex flex-col gap-2 px-3 my-4">
        <h2 className="text-lg font-medium">{title}</h2>
        <h3 className="text-sm text-gray-700">{releaseDate}</h3>
      </div>
    </Link>
  );
};

export default ShowCard;
