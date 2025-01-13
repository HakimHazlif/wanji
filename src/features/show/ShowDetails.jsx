import {
  getPictureUrlFormat,
  getYearMonthFormat,
  updateDateFormat,
  formatNumber,
} from "../../utils/helper";

import WitchlistIcon from "../lists/WatchlistIcon";

import Rating from "@mui/material/Rating";
import { Box } from "@mui/material";
import FavoriteIcon from "../lists/FavoriteIcon";

const ShowDetails = ({ isMovie, details }) => {
  console.log(details);
  const {
    id,
    genres,
    overview,
    poster_path,
    production_companies,
    vote_average,
  } = details;

  const title = details.title || details.name;
  const originalTitle = details.original_title || details.original_name;
  const runtime = details.runtime || details.episode_run_time;
  const dateFormat = isMovie
    ? updateDateFormat(details.release_date)
    : `${getYearMonthFormat(details.first_air_date)} - ${getYearMonthFormat(
        details.last_air_date
      )}`;

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
            <h2 className="text-6xl">{title}</h2>
            {originalTitle === title ? null : (
              <h3 className="text-2xl">({originalTitle})</h3>
            )}
          </div>
          <ul className="flex items-center gap-2 text-sm whitespace-nowrap my-2 text-white">
            <li>{details.release_date ? "Movie" : "Serie"}</li>
            <span>&#x2022;</span>
            <li className="whitespace-nowrap">{dateFormat}</li>
            <span>&#x2022;</span>
            <li>{runtime}min</li>
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
                    color: "#94a3b8",
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
          <p className=" text-slate-100 mt-7">{overview}</p>
        </div>
      </div>
      <hr className="border-1 border-slate-400 w-full my-4" />
      <div className="flex gap-2 items-center">
        <WitchlistIcon id={id} />
        <FavoriteIcon id={id} />
      </div>
    </div>
  );
};

export default ShowDetails;
