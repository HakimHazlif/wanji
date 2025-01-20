import {
  getPictureUrlFormat,
  getYearMonthFormat,
  updateDateFormat,
  formatNumber,
  getYearFormat,
} from "../../utils/helper";

import WatchlistIcon from "../lists/WatchlistIcon";

import Rating from "@mui/material/Rating";
import { Box } from "@mui/material";
import FavoriteIcon from "../lists/FavoriteIcon";

import { useParams } from "react-router";
import { useShow } from "./useShow";
import ListsIcon from "../lists/ListsIcon";
import RateUser from "../lists/RateUser";

const ShowIntroDetails = () => {
  // console.log(details);
  const { details } = useShow();
  const { category } = useParams();

  const {
    id,
    genres,
    overview,
    poster_path,
    production_companies,
    vote_average,
    status,
  } = details;

  const title = details?.title || details?.name;
  const originalTitle = details?.original_title || details?.original_name;
  const runtime = details?.runtime || details?.episode_run_time;
  const yearFormat = getYearFormat(
    details.release_date || details.first_air_date
  );

  const item = {
    itemId: id,
    type: category,
    title,
    date: yearFormat,
    season: null,
    parentId: null,
  };

  const dateFormat =
    category === "movie"
      ? updateDateFormat(details.release_date)
      : `${getYearMonthFormat(details.first_air_date)} - ${
          status === "Returning Series"
            ? "Present"
            : getYearMonthFormat(details.last_air_date)
        }`;

  return (
    <div>
      <div className="flex gap-4 items-end">
        <div>
          <img
            src={getPictureUrlFormat(poster_path, 1280)}
            alt="movie poster"
            className="rounded-xl min-w-[250px] w-[400px]"
          />
        </div>
        <div>
          <div className="mb-2 text-white flex items-end gap-3 font-bold">
            <h2 className="text-4xl">{title}</h2>
            {originalTitle === title ? null : (
              <h3 className="text-2xl">({originalTitle})</h3>
            )}
          </div>
          <ul className="flex items-center gap-2 text-sm whitespace-nowrap my-2 text-white">
            <li>{category === "movie" ? "Movie" : "TV Show"}</li>
            <span>&#x2022;</span>
            <li className="whitespace-nowrap">{dateFormat}</li>
            {runtime && (
              <>
                <span>&#x2022;</span>
                <li>
                  {runtime}min <span>{category === "tv" && "per episode"}</span>
                </li>
              </>
            )}
          </ul>
          <div className="flex items-center gap-2 mb-2">
            <Box>
              <Rating
                name="percentage-rating"
                value={Number(vote_average)}
                precision={0.1}
                readOnly
                max={10}
                sx={{
                  "& .MuiRating-iconEmpty": {
                    color: "#ffffff",
                    fontSize: "30px",
                  },
                  "& .MuiRating-iconFilled": {
                    color: "#FFD700",
                    fontSize: "30px",
                  },
                }}
              />
            </Box>
            <p className="px-2 py-0.5 rounded-sm bg-orange-amber text-white font-semibold">
              {formatNumber(vote_average)}
            </p>
          </div>

          <ul className="flex gap-2">
            {genres.map((genre) => (
              <li
                key={genre.id}
                className="py-2 px-4 rounded-lg bg-black/20 backdrop-blur-lg text-white font-medium text-sm"
              >
                {genre.name}
              </li>
            ))}
          </ul>

          <div className="h-14">
            <p className="font-semibold max-h-20 text-slate-100 mt-7 text-ellipsis ">
              {overview}
            </p>
          </div>
        </div>
      </div>
      <hr className="border-1 border-slate-400 w-full my-4" />
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <WatchlistIcon item={item} />
          <FavoriteIcon item={item} />
          <ListsIcon />
        </div>
        <RateUser itemId={id} type={category} />
      </div>
    </div>
  );
};

export default ShowIntroDetails;
