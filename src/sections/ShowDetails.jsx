import React from "react";
import { useSelector } from "react-redux";
import {
  getImageViaPath,
  getYearMonthFormat,
  updateDateFormat,
} from "../utils/functions";
import { useState } from "react";
import { showDetails } from "../data/movieSlice";
import Rating from "@mui/material/Rating";
import { Box } from "@mui/material";
import {
  bookmark,
  goldenBookmark,
  heart,
  lists,
  redHeart,
} from "../assets/icons";
import { formatNumber } from "../utils/functions";

const ShowDetails = ({ isMovie }) => {
  const showDetail = useSelector(showDetails);
  const [colorChange, setColorChange] = useState({
    bookmark: false,
    heart: false,
  });

  const watchlist = colorChange.bookmark ? goldenBookmark : bookmark;
  const favorate = colorChange.heart ? redHeart : heart;

  //for redux
  function handleClickOnHeart() {
    setColorChange((prev) => ({
      ...prev,
      heart: !prev.heart,
    }));
  }

  //for redux
  function handleClickOnBookmark() {
    setColorChange((prev) => ({
      ...prev,
      bookmark: !prev.bookmark,
    }));
  }

  const dateFormat = isMovie
    ? updateDateFormat(showDetail.release_date)
    : `${getYearMonthFormat(showDetail.first_air_date)} - ${getYearMonthFormat(
        showDetail.last_air_date
      )}`;

  return (
    <div className="flex felx-col gap-4 bg-slate-950 rounded-lg overflow-hidden">
      <div>
        <img
          src={getImageViaPath(showDetail.poster_path, 1280)}
          alt="movie poster"
          className="min-w-[250px] w-[400px]"
        />
      </div>
      <div className="px-4 py-5 pr-16">
        <h2 className="text-4xl mb-4">{showDetail.title || showDetail.name}</h2>
        <div className="flex gap-4">
          <Box>
            <Rating
              name="percentage-rating"
              value={Number(showDetail.vote_average)}
              precision={0.1}
              readOnly
              max={10}
              sx={{
                "& .MuiRating-iconEmpty": {
                  color: "#94a3b8",
                },
                "& .MuiRating-iconFilled": {
                  color: "#FFD700",
                },
              }}
            />
          </Box>
          <p>{formatNumber(showDetail.vote_average)}</p>
        </div>
        <ul className="flex gap-2 text-sm text-slate-400 whitespace-nowrap">
          <li className="whitespace-nowrap">{dateFormat}</li>
          <div>&#x2022;</div>
          <li>{showDetail.runtime || showDetail.episode_run_time}min</li>
          <div>&#x2022;</div>
          <li>
            <ul className="flex gap-1">
              {showDetail.genres.map((genre, index) => {
                if (index === showDetail.genres.length - 1)
                  return <li key={genre.id}>{genre.name}</li>;
                else return <li key={genre.id}>{genre.name},</li>;
              })}
            </ul>
          </li>
        </ul>
        <p className=" text-slate-400 mt-7">{showDetail.overview}</p>
        <div className="mt-10">
          <div className="flex gap-4 justify-end">
            <button className="w-[40px] h-[40px] rounded-full bg-slate-400 flex justify-center items-center text-[8px]">
              <img src={lists} alt="icon" className="w-5" />
            </button>
            <button
              className="w-[40px] h-[40px] rounded-full bg-slate-400 flex justify-center items-center text-[8px]"
              onClick={handleClickOnHeart}
            >
              <img src={favorate} alt="icon" className="w-6" fill="#ffffff" />
            </button>
            <button
              className="w-[40px] h-[40px] rounded-full bg-slate-400 flex justify-center items-center text-[8px]"
              onClick={handleClickOnBookmark}
            >
              <img src={watchlist} alt="icon" className="w-[22px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
