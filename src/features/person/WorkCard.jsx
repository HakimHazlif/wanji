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
import EmptyPoster from "../../components/EmptyPoster";
import WatchlistIcon from "../lists/WatchlistIcon";
import FavoriteIcon from "../lists/FavoriteIcon";
import WatchlistButton from "../lists/WatchlistButton";
import FavoriteButton from "../lists/FavoriteButton";
import ButtonAddToList from "../lists/ButtonAddToList";

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
    show_id,
    episode_number,
    season_number,
  } = show;
  const title = show?.title || show?.name;
  const originalTitle = show?.original_title || show?.original_name;
  const newDate = show?.release_date || show?.first_air_date;

  const item = {
    itemId: id,
    type: category,
    parentId: show_id,
    episode: episode_number,
    season: season_number,
  };

  function handleNavigate() {
    navigate(`/${category}/${id}`);
  }

  return (
    <section className="w-full rounded-2xl border-t-2 border-l-2 border-bluish-black shadow-lg p-2 xl:gap-6 lg:gap-4 gap-2">
      <div className="flex sm:flex-row flex-col p-2 xl:gap-6 lg:gap-4 gap-2">
        <div className="max-w-[160px]">
          {poster_path ? (
            <img
              src={getPictureUrlFormat(poster_path)}
              alt={title}
              className="h-full w-full object-cover cursor-pointer rounded-md"
              onClick={handleNavigate}
            />
          ) : (
            <EmptyPoster size={80} style="h-full max-w-[160px] rounded-md" />
          )}
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
          </div>
          {overview && (
            <div className="text-sm text-slate-400">
              <Ellipsis text={overview} lines="line-clamp-3" />
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 w-full">
        <div className="w-1/3">
          <WatchlistButton
            item={item}
            iconSize="lg:text-lg text-md"
            width="w-full"
          />
        </div>
        <div className="w-1/3">
          <FavoriteButton
            item={item}
            iconSize="lg:text-lg text-md"
            width="w-full"
          />
        </div>
        <div className="w-1/3">
          <ButtonAddToList />
        </div>
      </div>
    </section>
  );
};

export default WorkCard;
