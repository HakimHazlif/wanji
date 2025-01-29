import {
  getPictureUrlFormat,
  getYearFormat,
  updateDateFormat,
} from "../utils/helper";
import { useNavigate } from "react-router";
import WatchlistIcon from "../features/lists/WatchlistIcon";
import WatchlistButton from "../features/lists/WatchlistButton";

import { FaStar } from "react-icons/fa";
import FavoriteButton from "../features/lists/FavoriteButton";
import UserRateMini from "../features/lists/UserRateMini";
import Ellipsis from "./Ellipsis";
import { Tooltip } from "@mui/material";

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
        <img
          src={
            getPictureUrlFormat(poster, 500) ||
            "https://image.tmdb.org/t/p/w300_and_h450_bestv2/5vV52TSEIhe4ZZLWwv3i7nfv8we.jpg"
          }
          alt="movie poster"
          className="relative w-full h-[300px] object-cover rounded-md shadow-2xl cursor-pointer"
          onClick={handleNavigate}
        />
        <div className="px-3 mt-2">
          <div className="flex gap-4">
            <div className="rounded-md bg-orange-amber w-[45px] h-6  flex items-center justify-center gap-1 text-xs font-bold">
              <FaStar />
              <p>{rate?.toFixed(1)}</p>
            </div>
            <UserRateMini type={category} itemId={id} />
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
            <div className="flex justify-center gap-2 mt-4">
              <WatchlistButton item={item} />
              <FavoriteButton item={item} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
