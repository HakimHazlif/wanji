import { Box, Rating } from "@mui/material";
import {
  formatNumber,
  getMainCrewRolls,
  getPictureUrlFormat,
  getYearFormat,
  updateDateFormat,
  updateRuntime,
} from "../../utils/helper";
import WatchlistIcon from "../lists/WatchlistIcon";
import FavoriteIcon from "../lists/FavoriteIcon";
import { Link, useNavigate } from "react-router";

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

  return (
    <section className="flex rounded-2xl bg-bluish-black overflow-hidden">
      <img
        src={getPictureUrlFormat(still_path)}
        alt="backdrop episode"
        className="w-[300px] h-full object-cover cursor-pointer"
        onClick={() =>
          navigate(
            `/tv/${show_id}/season/${season_number}/episode/${episode_number}`
          )
        }
      />
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="w-full flex-1 flex flex-col gap-2">
            <Link
              to={`/tv/${show_id}/season/${season_number}/episode/${episode_number}`}
              className="flex gap-2 font-bold text-2xl"
            >
              <span>{episode_number}:</span>
              <h2>{name}</h2>
            </Link>
            <ul className="flex gap-2 text-sm font-semibold text-slate-400">
              <li>{updateDateFormat(air_date)}</li>
              <span>&#x2022;</span>
              <li>{updateRuntime(runtime)}</li>
            </ul>
            <div className="flex items-center gap-2">
              <Box>
                <Rating
                  name="percentage-rating"
                  value={Number(vote_average) / 2}
                  precision={0.1}
                  readOnly
                  max={5}
                  sx={{
                    "& .MuiRating-iconEmpty": {
                      color: "#ffffff",
                      fontSize: "30px",
                    },
                    "& .MuiRating-iconFilled": {
                      color: "#FFD700",
                      fontSize: "30px",
                    },
                  }}
                />
              </Box>
              <p className="px-2 py-0.5 rounded-sm bg-orange-amber text-white font-semibold">
                {formatNumber(vote_average)}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 h-10">
            <WatchlistIcon item={item} />
            <FavoriteIcon item={item} />
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
                        to={`person/${director.id}`}
                        className="hover:text-orange-amber duration-300 transition-colors"
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
                        to={`person/${writer.id}`}
                        className="hover:text-orange-amber duration-300 transition-colors"
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
