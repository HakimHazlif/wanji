import {
  getPictureUrlFormat,
  getYearFormat,
  updateDateFormat,
} from "../utils/helper";
import { Link } from "react-router";
import WatchlistIcon from "../features/lists/WatchlistIcon";

import { FaStar } from "react-icons/fa";

const ShowCard = ({ show, category, additions = true }) => {
  const { vote_average: rate, year } = show;
  const id = show?.id || show?.item_id;
  const title = show?.title || show?.name;
  const poster = show?.poster_path || show?.still_path;
  const yearFormat = year
    ? year
    : getYearFormat(
        show?.release_date || show?.first_air_date || show?.air_date
      );

  function handleDate() {
    if (show["release_date"]) return getYearFormat(show?.release_date);
    else if (show["first_air_date"])
      return `${getYearFormat(show?.first_air_date)} - ${getYearFormat(
        show?.last_air_date
      )}`;
    else if (show["air_date"]) return updateDateFormat(show?.air_date);
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
      <Link
        to={
          category === "movie" || category === "tv"
            ? `/${category}/${id}`
            : `/${category}/${id}`
        }
        className=""
      >
        <img
          src={
            getPictureUrlFormat(poster, 500) ||
            "https://image.tmdb.org/t/p/w300_and_h450_bestv2/5vV52TSEIhe4ZZLWwv3i7nfv8we.jpg"
          }
          alt="movie poster"
          className="relative h-[300px] object-cover rounded-md shadow-2xl"
        />
        <div className="absolute top-[265px] right-[15px] rounded-md bg-orange-amber px-2 py-1 flex items-center gap-1 text-sm font-bold">
          <FaStar />
          <p>{rate?.toFixed(1)}</p>
        </div>
        <div className="flex flex-col gap-1 px-3 mt-2">
          <span className="text-[12px] text-slate-400 font-medium">
            {handleDate()}
          </span>
          <h2 className="text-sm font-medium">{title}</h2>
        </div>
      </Link>

      {additions && (
        <div className="absolute top-0 left-0 z-10 cursor-pointer ">
          <WatchlistIcon item={item} />
        </div>
      )}
    </div>
  );
};

export default ShowCard;
