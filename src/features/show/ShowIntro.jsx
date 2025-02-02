import {
  getPictureUrlFormat,
  getYearMonthFormat,
  updateDateFormat,
  formatNumber,
  updateRuntime,
} from "../../utils/helper";

import Rating from "@mui/material/Rating";
import { Box } from "@mui/material";

import { useParams } from "react-router";
import { useShow } from "./useShow";
import RateUser from "../lists/RateUser";
import Ellipsis from "../../ui/Ellipsis";
import WatchlistButton from "../lists/WatchlistButton";
import FavoriteButton from "../lists/FavoriteButton";
import ButtonAddToList from "../lists/ButtonAddToList";

const ShowIntro = () => {
  // console.log(details);
  const { details } = useShow();
  const { category } = useParams();

  const {
    id,
    genres,
    overview,
    poster_path,
    vote_average,
    status,
    number_of_seasons,
    number_of_episodes,
  } = details;

  const title = details?.title || details?.name;
  const originalTitle = details?.original_title || details?.original_name;
  const runtime = details?.runtime || details?.[0]?.episode_run_time;

  const item = {
    itemId: id,
    type: category,
    parentId: null,
    episode: null,
    season: null,
  };

  const dateFormat =
    category === "movie"
      ? updateDateFormat(details.release_date)
      : `${getYearMonthFormat(details.first_air_date)} - ${
          status === "Returning Series"
            ? "Continuous"
            : getYearMonthFormat(details.last_air_date)
        }`;

  return (
    <section>
      <div className="flex gap-4 items-end">
        <div>
          <img
            src={getPictureUrlFormat(poster_path, 1280)}
            alt="movie poster"
            className="rounded-xl min-w-[200px] w-[260px] max-w-[280px]"
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
                <li>{updateRuntime(runtime)}</li>
              </>
            )}
            {number_of_seasons && (
              <>
                <span>&#x2022;</span>
                <li>
                  {number_of_seasons}{" "}
                  {number_of_seasons === 1 ? "season" : "seasons"}
                </li>
              </>
            )}
            {number_of_episodes && (
              <>
                <span>&#x2022;</span>
                <li>{number_of_episodes} episodes</li>
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
            <p className="px-2 py-0.5 rounded-sm bg-orange-amber text-gray-800 font-semibold">
              {formatNumber(vote_average)}
            </p>
          </div>

          <ul className="flex gap-2">
            {genres.map((genre) => (
              <li
                key={genre.id}
                className="py-2 px-4 rounded-lg bg-black/20 backdrop-blur-md text-white font-medium text-sm"
              >
                {genre.name}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Ellipsis text={overview} />
          </div>
        </div>
      </div>
      <hr className="border-1 border-slate-400 w-full my-4" />
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <WatchlistButton item={item} size={30} />
          <FavoriteButton item={item} size={30} />
          <ButtonAddToList item={item} image={poster_path} showTitle={title} />
        </div>
        <RateUser itemId={id} type={category} />
      </div>
    </section>
  );
};

export default ShowIntro;
