import {
  formatNumber,
  getPictureUrlFormat,
  updateDateFormat,
} from "../../utils/helper";
import { useNavigate } from "react-router";
import Ellipsis from "../../ui/Ellipsis";
import { IoMdStar } from "react-icons/io";
import UserRateMini from "../lists/UserRateMini";
import { FaStar } from "react-icons/fa";

const WorkCard = ({ show, category }) => {
  const navigate = useNavigate();

  const {
    id,
    vote_average: rate,
    overview,
    poster_path,
    episode_count,
    character,
    job,
    popularity,
  } = show;
  const title = show?.title || show?.name;
  const originalTitle = show?.original_title || show?.original_name;
  const newDate = show?.release_date || show?.first_air_date;

  // const item = {
  //   itemId: id,
  //   type: category,
  //   parentId: show_id,
  //   episode: episode_number,
  //   season: season_number,
  // };

  function handleNavigate() {
    navigate(`/${category}/${id}`);
  }

  return (
    <section className="flex gap-6 rounded-lg bg-bluish-black overflow-hidden p-5">
      <div className="w-[140px]">
        <img
          src={getPictureUrlFormat(poster_path)}
          alt={title}
          className="w-full object-cover cursor-pointer rounded-sm"
          onClick={handleNavigate}
        />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="w-full flex-1 flex flex-col gap-2">
            <div
              onClick={handleNavigate}
              className="flex gap-2 font-bold text-2xl items-center cursor-pointer"
            >
              <h2>{title}</h2>
              {originalTitle !== title && (
                <h3 className="text-xl text-gray-400">({originalTitle})</h3>
              )}
            </div>

            <ul className="flex gap-2 text-sm font-semibold text-slate-400">
              <li>{updateDateFormat(newDate)}</li>
              <span>&#x2022;</span>
              {category === "movie" ? <li>Movie</li> : <li>Tv show</li>}
            </ul>

            <div className="flex gap-2 font-medium">
              {character && (
                <>
                  <span className="text-gray-400">Character:</span>
                  <h3 className="font-bold">{character}</h3>
                </>
              )}
              {job && (
                <>
                  <span className="text-gray-400">Crew Job:</span>
                  <h3 className="font-bold">{job}</h3>
                </>
              )}
            </div>
            {episode_count && (
              <p className="text-sm text-gray-300 font-medium">
                Had worked on {episode_count}{" "}
                {episode_count === 1 ? "episode" : "episodes"}
              </p>
            )}

            <div className="flex gap-10">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1 px-1.5 py-[3px] rounded-sm bg-orange-amber">
                  <FaStar className="text-white" size={12} />
                  <p className="text-gray-800 font-semibold text-xs ">
                    {formatNumber(rate)}
                  </p>
                </div>
                <UserRateMini
                  type={category}
                  itemId={id}
                  buttonStyle="rounded-sm bg-orange-coral w-[38px] h-[22px] flex items-center justify-center gap-1 text-xs font-semibold text-gray-800"
                />
              </div>
            </div>
            <div className="flex gap-2 font-medium">
              <span className="text-gray-400">Popularity:</span>
              <p className="font-bold">{popularity}</p>
            </div>
          </div>
          {/* <div className="flex items-start gap-2 h-10">
            <WatchlistIcon item={item} />
            <FavoriteIcon item={item} />
          </div> */}
        </div>
        {/* {overview && (
          <div className="text-sm text-slate-400">
            <Ellipsis text={overview} lines="line-clamp-3" />
          </div>
        )} */}
      </div>
    </section>
  );
};

export default WorkCard;
