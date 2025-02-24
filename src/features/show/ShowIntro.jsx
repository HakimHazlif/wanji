import {
  getPictureUrlFormat,
  getYearMonthFormat,
  updateDateFormat,
  formatNumber,
  updateRuntime,
} from "../../utils/helper";

import Rating from "@mui/material/Rating";
import { Box, Tooltip } from "@mui/material";

import { Link, useParams } from "react-router";
import { useShow } from "./useShow";
import RateUser from "../lists/RateUser";
import Ellipsis from "../../ui/Ellipsis";
import WatchlistButton from "../lists/WatchlistButton";
import FavoriteButton from "../lists/FavoriteButton";
import ButtonAddToList from "../lists/ButtonAddToList";
import { useEffect, useState } from "react";
import VideoPlayer from "../../components/VideoPlayer";
import { FaPlay } from "react-icons/fa";
import { useSelector } from "react-redux";

const ShowIntro = () => {
  const [maxRating, setMaxRating] = useState(10);

  const [selectedVideo, setSelectedVideo] = useState(null);

  const { details, videos } = useShow();
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

  const trailer = videos?.find((video) => video.type === "Trailer") || null;

  const handlePlayVideo = (video) => {
    setSelectedVideo(video);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setMaxRating(5);
      } else {
        setMaxRating(10);
      }
    };

    window.addEventListener("resize", handleResize);

    // handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section>
      <div>
        <div className="flex gap-4 items-end">
          <div>
            <img
              src={getPictureUrlFormat(poster_path, 1280)}
              alt="movie poster"
              className="rounded-xl max-w-[180px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[250px] xl:max-w-[300px] min-w-[160px]"
            />
          </div>
          <div className="w-full flex-1">
            <h2 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-bold">
              {title}{" "}
              {originalTitle === title ? null : (
                <span className="xl:text-3xl lg:text-2xl md:text-xl text-lg text-slate-300">
                  ({originalTitle})
                </span>
              )}
            </h2>

            <ul className="flex items-center gap-2 md:text-sm text-xs whitespace-nowrap my-2 text-white">
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
              <Box className="flex items-center">
                <Rating
                  name="percentage-rating"
                  value={
                    maxRating === 5
                      ? Math.ceil(Number(vote_average) / 2)
                      : Number(vote_average)
                  }
                  precision={0.1}
                  readOnly
                  max={maxRating}
                  sx={{
                    "& .MuiRating-icon": {
                      fontSize: "20px",
                      "@media (min-width: 425px)": { fontSize: "21px" },
                      "@media (min-width: 640px)": { fontSize: "24px" },
                      "@media (min-width: 768px)": { fontSize: "27px" },
                      "@media (min-width: 1024px)": { fontSize: "30px" },
                    },
                    "& .MuiRating-iconEmpty": {
                      color: "#ffffff",
                    },
                    "& .MuiRating-iconFilled": {
                      color: "#FFD700",
                    },
                  }}
                />
              </Box>
              <p className="md:px-3 px-2 py-0.5 rounded-sm bg-orange-amber text-gray-800 font-semibold lg:text-base md:text-sm text-xs">
                {formatNumber(vote_average)}
              </p>
            </div>

            <ul className="flex-1 flex flex-wrap gap-2 gap-y-1">
              {genres.map((genre) => (
                <Link
                  key={genre.id}
                  to={`/genre/${genre.name
                    .split(" ")
                    .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
                    .join("-")}/${genre.id}/${category}?page=1`}
                  className="py-2 px-4 rounded-lg bg-black/20 hover:bg-black/60 backdrop-blur-md text-white font-medium sm:text-sm text-xs text-nowrap"
                >
                  {genre.name}
                </Link>
              ))}
            </ul>

            <div className="mt-4 ">
              <Ellipsis
                text={overview}
                lines="xl:line-clamp-6 lg:line-clamp-5 sm:line-clamp-4 line-clamp-3"
              />
            </div>
          </div>
        </div>
        <hr className="border-1 border-slate-700 w-full my-4" />
        <div className="md:flex block justify-between items-center">
          <div className="flex gap-2 items-center">
            <WatchlistButton
              item={item}
              iconSize="md:text-3xl sm:text-xl text-lg"
            />
            <FavoriteButton
              item={item}
              iconSize="md:text-3xl sm:text-xl text-lg"
            />
            <ButtonAddToList
              item={item}
              image={poster_path}
              showTitle={title}
            />
          </div>
          <div className="flex max-md:mt-4 gap-2">
            {trailer && (
              <Tooltip title="Watch Trailer">
                <span className="flex justify-center items-center">
                  <button
                    onClick={() => handlePlayVideo(trailer)}
                    className="px-4 py-2 rounded-lg flex gap-2 items-center border-none md:text-lg text-sm font-medium hover:scale-105 transition-all duration-300 bg-orange-100 text-amber-700 hover:bg-orange-200 hover:text-amber-800 "
                  >
                    <FaPlay />
                    Play Trailer
                  </button>
                </span>
              </Tooltip>
            )}
            <RateUser item={item} />
          </div>
        </div>
      </div>
      {selectedVideo && (
        <VideoPlayer
          videoData={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          autoplay={true}
        />
      )}
    </section>
  );
};

export default ShowIntro;
