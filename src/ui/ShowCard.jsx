import { getPictureUrlFormat } from "../utils/helper";
import RateCircle from "./RateCircle";
import { Link } from "react-router";
import WatchlistIcon from "../features/lists/WatchlistIcon";
import { useSession } from "../context/UserContext";

const ShowCard = ({ show, category }) => {
  const { id, poster_path: poster, releaseDate, vote_average: rate } = show;
  const title = show?.title || show?.name;

  // const { setIsMovie } = useSession();

  return (
    <div className="w-60 bg-slate-100 rounded-md overflow-hidden text-black relative">
      <Link to={`/${category}/${id}`}>
        <img
          src={getPictureUrlFormat(poster, 500)}
          alt="movie poster"
          className="relative h-[370px] object-cover"
        />
        <div className="absolute bottom-[80px] right-[15px]">
          <RateCircle rate={rate} />
        </div>
        <div className="flex flex-col gap-2 px-3 my-4">
          <h2 className="text-lg font-medium">{title}</h2>
          <h3 className="text-sm text-gray-700">{releaseDate}</h3>
        </div>
      </Link>

      <div className="absolute top-0 left-0 z-50 cursor-pointer ">
        <WatchlistIcon itemId={id} type={category} />
      </div>
    </div>
  );
};

export default ShowCard;
