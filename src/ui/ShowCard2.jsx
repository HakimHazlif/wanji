import { Link } from "react-router";
import { getPictureUrlFormat } from "../utils/helper";

const ShowCard2 = ({ show }) => {
  const {
    id,
    poster_path: poster,
    releaseDate,
    vote_average: rate,
    runtime,
    genres,
  } = show;
  const title = show?.title || show?.name;
  const isMovie = "title" in show;

  return (
    <div className="max-w-xs w-60 bg-bluish-black rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
      <img
        src={getPictureUrlFormat(poster, 500)}
        alt={title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-md font-semibold text-white truncate">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">Release: {releaseDate}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-yellow-500 font-bold">
            ⭐ {rate.toFixed(1)}
          </span>
          <button className="text-sm text-blue-600 hover:text-blue-800 transition">
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowCard2;
