import { Box, Rating, Tooltip } from "@mui/material";
import {
  formatNumber,
  getMainCrewRolls,
  getPictureUrlFormat,
  updateDateFormat,
  updateRuntime,
} from "../../utils/helper";
import { Link, useNavigate } from "react-router";
import WatchlistButton from "../lists/WatchlistButton";
import FavoriteButton from "../lists/FavoriteButton";
import UserRateMini from "../lists/UserRateMini";
import RatingBox from "../../components/RatingBox";

const EpisodeCard = ({ episode }) => {
  const navigate = useNavigate();
  const {
    id,
    name,
    overview,
    episode_number,
    season_number,
    air_date,
    runtime,
    show_id,
    still_path,
    vote_average,
    crew,
  } = episode;

  const item = {
    itemId: id,
    type: "episode",
    parentId: show_id,
    episode: episode_number,
    season: season_number,
  };

  const mainCrewRolls = getMainCrewRolls(crew);
  const { directing, writing } = mainCrewRolls;

  function handleNavigate() {
    navigate(
      `/tv/${show_id}/season/${season_number}/episode/${episode_number}`
    );
  }

  return (
    <div className="flex md:flex-row flex-col rounded-2xl border-t-2 border-l-2 border-bluish-black shadow-lg transition-shadow duration-300 p-2 xl:gap-6 lg:gap-4 gap-0">
      <div className="relative group">
        <Tooltip title={`Episode ${episode_number}`}>
          <img
            src={getPictureUrlFormat(still_path)}
            alt="backdrop episode"
            className="max-w-full xl:max-w-[360px] lg:max-w-[300px] md:max-w-[260px] h-full object-cover rounded-xl cursor-pointer group-hover:brightness-110 transition-all duration-200"
            onClick={handleNavigate}
          />
        </Tooltip>
      </div>

      <div className="flex-1 lg:p-4 xs:p-2 flex flex-col">
        <div className="flex xs:flex-row flex-col-reverse xs:justify-between w-full">
          <div
            onClick={handleNavigate}
            className="flex gap-2 font-semibold xl:text-2xl text-xl text-white cursor-pointer text-nowrap text-ellipsis"
          >
            <span>{episode_number}.</span>
            <h2>{name}</h2>
          </div>
          <div className="flex gap-2 max-xs:w-full max-xs:my-2">
            <div className="max-xs:w-1/2">
              <WatchlistButton
                item={item}
                iconSize="lg:text-lg text-md"
                width="lg:w-[85px] xs:w-[70px] w-full"
              />
            </div>
            <div className="max-xs:w-1/2">
              <FavoriteButton
                item={item}
                iconSize="lg:text-lg text-md"
                width="lg:w-[85px] xs:w-[70px] w-full"
              />
            </div>
          </div>
        </div>

        <ul className="flex gap-2 text-sm font-semibold text-slate-300">
          <li>{updateDateFormat(air_date)}</li>
          <span>&#x2022;</span>
          <li>{runtime} min</li>
        </ul>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 my-2">
          <RatingBox
            rating={vote_average}
            styleOfSpan="px-2 text-sm rounded-sm bg-orange-coral font-semibold text-gray-800"
            starsSize={{
              fontSize: `18px`,
              "@media (min-width: 425px)": { fontSize: "20px" },
              "@media (min-width: 640px)": { fontSize: "22px" },
              "@media (min-width: 768px)": { fontSize: "23px" },
              "@media (min-width: 1024px)": { fontSize: "23px" },
            }}
            initialStars={5}
          />

          <div className="flex items-center gap-2">
            <UserRateMini
              item={item}
              addStars={true}
              buttonStyle="px-3  text-sm rounded-sm bg-orange-amber font-semibold text-gray-800"
            />
          </div>
        </div>
        <div className="mb-2">
          {directing.length > 0 && (
            <div className="flex gap-2 text-sm text-slate-300">
              <h3 className="font-medium">Director:</h3>
              <ul className="flex gap-2 font-bold">
                {directing.map((director, index) => (
                  <li key={director.id}>
                    {index !== 0 && <span>&#x2022;</span>}
                    <Link
                      to={`/person/${director.id}`}
                      className="hover:text-blue-600 duration-300 transition-colors"
                    >
                      {director.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {writing.length > 0 && (
            <div className="flex gap-2 text-sm text-slate-300">
              <h3 className="font-medium">Writer:</h3>
              <ul className="flex gap-2 font-bold">
                {writing.map((writer, index) => (
                  <li key={writer.id}>
                    {index !== 0 && <span>&#x2022;</span>}
                    <Link
                      to={`/person/${writer.id}`}
                      className="hover:text-blue-600 duration-300 transition-colors"
                    >
                      {writer.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="w-full flex-1 flex flex-col gap-2">
          <p className="text-sm font-semibold text-slate-400">{overview}</p>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;
