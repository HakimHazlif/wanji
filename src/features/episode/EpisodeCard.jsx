import { Box, Rating } from "@mui/material";
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
    <section className="flex flex-col md:flex-row rounded-2xl bg-bluish-black overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="relative group md:w-[350px]">
        <img
          src={getPictureUrlFormat(still_path)}
          alt="backdrop episode"
          className="w-full h-[200px] md:h-full object-cover cursor-pointer group-hover:brightness-75 transition-all duration-300"
          onClick={() =>
            navigate(
              `/tv/${show_id}/season/${season_number}/episode/${episode_number}`
            )
          }
        />
      </div>

      <div className="flex-1 p-6 flex flex-col gap-4">
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between">
            <div
              onClick={handleNavigate}
              className="flex gap-2 font-bold text-2xl cursor-pointer"
            >
              <span>{episode_number}:</span>
              <h2>{name}</h2>
            </div>
            <div className="flex gap-2 text-sm font-medium">
              <WatchlistButton item={item} />
              <FavoriteButton item={item} />
            </div>
          </div>

          <ul className="flex gap-2 text-sm font-semibold text-slate-400">
            <li>{updateDateFormat(air_date)}</li>
            <span>&#x2022;</span>
            <li>{updateRuntime(runtime)}</li>
          </ul>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
            <div className="flex items-center gap-2">
              <Box>
                <Rating
                  value={Number(vote_average) / 2}
                  precision={0.1}
                  readOnly
                  max={5}
                  sx={{
                    "& .MuiRating-iconEmpty": {
                      color: "#ffffff40",
                    },
                    "& .MuiRating-iconFilled": {
                      color: "#FFD700",
                    },
                  }}
                />
              </Box>
              <span className="px-2 py-0.5 rounded-sm bg-orange-amber font-semibold text-gray-800">
                {formatNumber(vote_average)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <UserRateMini
                type="episode"
                itemId={id}
                addStars={true}
                buttonStyle="px-3 py-0.5 rounded-sm bg-orange-coral font-semibold text-gray-800"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex-1 flex flex-col gap-2 pr-5">
          <p className="text-base font-semibold">{overview}</p>
          <div>
            {directing.length > 0 && (
              <div className="flex gap-2 text-sm text-slate-400">
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
              <div className="flex gap-2 text-sm text-slate-400">
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
        </div>
      </div>
    </section>
  );
};

export default EpisodeCard;
