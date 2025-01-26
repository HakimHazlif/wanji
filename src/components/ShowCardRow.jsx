import { Box, Rating } from "@mui/material";
import FavoriteIcon from "../features/lists/FavoriteIcon";
import WatchlistIcon from "../features/lists/WatchlistIcon";
import {
  formatNumber,
  getPictureUrlFormat,
  getYearFormat,
  updateDateFormat,
} from "../utils/helper";
import { Link, useNavigate } from "react-router";

const ShowCardRow = ({ show, category }) => {
  const {
    vote_average: rate,
    episode_number,
    season_number,
    show_id,
    overview,
    runtime,
    crew,
  } = show;
  const id = show?.id || show?.item_id;
  const title = show?.title || show?.name;
  const poster = show?.poster_path || show?.still_path;

  const navigate = useNavigate();

  function handleDate() {
    if (show["release_date"]) return getYearFormat(show?.release_date);
    else if (show["first_air_date"])
      return `${getYearFormat(show?.first_air_date)} - ${getYearFormat(
        show?.last_air_date
      )}`;
    else if (show["air_date"]) return updateDateFormat(show?.air_date);
  }

  const item = {
    itemId: id,
    type: category,
    parentId: show_id,
    episode: episode_number,
    season: season_number,
  };

  return (
    <section className="flex rounded-2xl bg-bluish-black overflow-hidden">
      <img
        src={getPictureUrlFormat(poster)}
        alt="backdrop episode"
        className="w-[200px] h-full object-cover cursor-pointer"
        onClick={() => {
          if (category === "episode")
            navigate(
              `/tv/${show_id}/season/${season_number}/episode/${episode_number}`
            );
          else navigate(`/${category}/${id}`);
        }}
      />
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="w-full flex-1 flex flex-col gap-2">
            <Link
              to={
                category === "episode"
                  ? `/tv/${show_id}/season/${season_number}/episode/${episode_number}`
                  : `/${category}/${id}`
              }
              className="flex gap-2 font-bold text-2xl"
            >
              {episode_number && <span>{`${episode_number}:`}</span>}
              <h2>{title}</h2>
            </Link>
            <ul className="flex gap-2 text-sm font-semibold text-slate-400">
              <li>{handleDate()}</li>
              <span>&#x2022;</span>
              <li>{runtime}min</li>
            </ul>
            <div className="flex items-center gap-2">
              <Box>
                <Rating
                  name="percentage-rating"
                  value={Number(rate) / 2}
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
                {formatNumber(rate)}
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
          <div>{/* crew */}</div>
        </div>
      </div>
    </section>
  );
};

export default ShowCardRow;
