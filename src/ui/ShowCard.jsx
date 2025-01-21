import { getPictureUrlFormat, getYearFormat } from "../utils/helper";
import RateCircle from "./RateCircle";
import { Link } from "react-router";
import WatchlistIcon from "../features/lists/WatchlistIcon";
import { useSession } from "../context/UserContext";
import { FaStar } from "react-icons/fa";

const ShowCard = ({ show, category }) => {
  const { id, poster_path: poster, vote_average: rate } = show;
  const title = show?.title || show?.name;
  const date = show?.release_date || show?.first_air_date;
  const year = getYearFormat(show?.release_date || show?.first_air_date);

  // const { setIsMovie } = useSession();

  const item = {
    itemId: id,
    type: category,
    title,
    date: year,
    season: null,
    parentId: null,
  };

  return (
    <div className="w-52 relative">
      <Link to={`/${category}/${id}`} className="">
        <img
          src={getPictureUrlFormat(poster, 500)}
          alt="movie poster"
          className="relative h-[300px] object-cover rounded-md shadow-2xl"
        />
        <div className="absolute top-[265px] right-[15px] rounded-md bg-orange-amber px-2 py-1 flex items-center gap-1 text-sm font-bold">
          <FaStar />
          <p>{rate.toFixed(1)}</p>
        </div>
        <div className="flex flex-col gap-1 px-3 mt-2">
          <span className="text-[12px] text-slate-400 font-medium">
            {getYearFormat(date)}
          </span>
          <h2 className="text-sm font-medium">{title}</h2>
        </div>
      </Link>

      <div className="absolute top-0 left-0 z-10 cursor-pointer ">
        <WatchlistIcon item={item} />
      </div>
    </div>
  );
};

export default ShowCard;
