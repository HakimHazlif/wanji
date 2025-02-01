import {
  getPictureUrlFormat,
  getYearFormat,
  updateDateFormat,
} from "../utils/helper";
import { useNavigate } from "react-router";
import { FaStar } from "react-icons/fa";
import Ellipsis from "./Ellipsis";
import { Tooltip } from "@mui/material";
import { lazy, Suspense } from "react";

const WatchlistButton = lazy(() => import("../features/lists/WatchlistButton"));
const FavoriteButton = lazy(() => import("../features/lists/FavoriteButton"));
const UserRateMini = lazy(() => import("../features/lists/UserRateMini"));

const ShowCard = ({
  show,
  category,
  additions = true,
  parentShowId = null,
}) => {
  const { vote_average: rate, year } = show;
  const id = show?.id || show?.item_id;
  const title = show?.title || show?.name;
  const poster = show?.poster_path || show?.still_path;

  const navigate = useNavigate();

  function handleDate() {
    if (show["release_date"]) return getYearFormat(show?.release_date);
    else if (show["first_air_date"]) return getYearFormat(show?.first_air_date);
    else if (show["air_date"]) return updateDateFormat(show?.air_date);
  }

  function handleNavigate() {
    if (category === "episode")
      navigate(
        `/tv/${parentShowId}}/season/${season_number}/episode/${episode_number}`
      );
    else navigate(`/${category}/${id}`);
  }
  // const { setIsMovie } = useSession();

  const item = {
    itemId: id,
    type: category,
    parentId: null,
    episode: null,
    season: null,
  };

  return (
    <div className="w-52 relative">
      <div className="">
        <Tooltip title={title}>
          <img
            src={getPictureUrlFormat(poster, 500)}
            alt="movie poster"
            className="relative w-full h-[300px] object-cover rounded-md shadow-2xl cursor-pointer"
            onClick={handleNavigate}
            loading="lazy"
          />
        </Tooltip>
        <div className="px-3 mt-2">
          <div className="flex gap-4">
            <Tooltip title="TMDB rate">
              <div className="rounded-md bg-orange-amber w-[45px] h-6  flex items-center justify-center gap-1 text-xs font-bold">
                <FaStar />
                <p>{rate?.toFixed(1)}</p>
              </div>
            </Tooltip>

            <Suspense
              fallback={
                <div className="rounded-md bg-orange-coral w-[45px] h-6  flex items-center justify-center gap-1 text-xs font-bold">
                  <FaStar />
                </div>
              }
            >
              <UserRateMini
                type={category}
                itemId={id}
                buttonStyle="rounded-md bg-orange-coral w-[45px] h-6 flex items-center justify-center gap-1 text-xs font-bold"
              />
            </Suspense>
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <span className="text-[12px] text-slate-400 font-medium">
              {handleDate()}
            </span>
            <Tooltip title={title}>
              <h2
                onClick={handleNavigate}
                className="text-sm font-medium cursor-pointer hover:text-orange-amber inline-block"
              >
                <Ellipsis text={title} lines="line-clamp-1" />
              </h2>
            </Tooltip>
          </div>
          {additions && (
            <Suspense fallback={<div>Loading</div>}>
              <div className="flex justify-center gap-2 mt-4">
                <WatchlistButton item={item} />
                <FavoriteButton item={item} />
              </div>
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
