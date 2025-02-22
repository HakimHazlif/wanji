import {
  getPictureUrlFormat,
  getYearMonthFormat,
  updateDateFormat,
  formatNumber,
  updateRuntime,
} from "../../utils/helper";

import Rating from "@mui/material/Rating";
import { Box } from "@mui/material";

import { Link, useParams } from "react-router";
import { useShow } from "./useShow";
import RateUser from "../lists/RateUser";
import Ellipsis from "../../ui/Ellipsis";
import WatchlistButton from "../lists/WatchlistButton";
import FavoriteButton from "../lists/FavoriteButton";
import ButtonAddToList from "../lists/ButtonAddToList";
import { useState } from "react";
import VideoPlayer from "../../components/VideoPlayer";
import { FaPlay } from "react-icons/fa";

const ShowIntro = () => {
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

  return (
    <section>
      <div>
        <div className="flex gap-4 items-end">
          <div>
            <img
              src={getPictureUrlFormat(poster_path, 1280)}
              alt="movie poster"
              className="rounded-xl min-w-[200px] w-[260px] max-w-[280px]"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold">
              {title}{" "}
              {originalTitle === title ? null : (
                <span className="text-2xl text-slate-300">
                  ({originalTitle})
                </span>
              )}
            </h2>

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

            <div className="flex w-full gap-20 items-center justify-between">
              <ul className="flex gap-2">
                {genres.map((genre) => (
                  <Link
                    key={genre.id}
                    to={`/genre/${genre.name
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toLowerCase() + word.slice(1)
                      )
                      .join("-")}/${genre.id}/${category}?page=1`}
                    className="py-2 px-4 rounded-lg bg-black/20 hover:bg-black/60 backdrop-blur-md text-white font-medium text-sm"
                  >
                    {genre.name}
                  </Link>
                ))}
              </ul>
              {trailer && (
                <button
                  onClick={() => handlePlayVideo(trailer)}
                  className="px-4 py-2 bg-orange-coral text-white rounded flex gap-2 items-center text-sm font-medium hover:bg-orange-amber hover:scale-110"
                >
                  <FaPlay />
                  Play Trailer
                </button>
              )}
            </div>

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
            <ButtonAddToList
              item={item}
              image={poster_path}
              showTitle={title}
            />
          </div>
          <RateUser item={item} />
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
