import { IoStarOutline } from "react-icons/io5";
import { useEpisode } from "./useEpisode";
import {
  formatNumber,
  getPictureUrlFormat,
  getYearFormat,
  updateDateFormat,
} from "../../utils/helper";
import { Box, Rating } from "@mui/material";
import WatchlistIcon from "../lists/WatchlistIcon";
import FavoriteIcon from "../lists/FavoriteIcon";
import { MdAddToPhotos } from "react-icons/md";
import Ellipsis from "../../ui/Ellipsis";

const EpisodeInfo = () => {
  const { episodeDetails } = useEpisode();
  const {
    id,
    still_path,
    name,
    season_number,
    episode_number,
    air_date,
    show_id,
    runtime,
    vote_average,
    overview,
  } = episodeDetails;

  const item = {
    itemId: id,
    type: "episode",
    parentId: show_id,
    episode: episode_number,
    season: season_number,
  };

  return (
    <section>
      <div className="flex gap-10 items-end">
        <div className="flex flex-col gap-2">
          <h2 className="text-5xl font-bold mb-3">{name}</h2>
          <h3 className="text-xl font-semibold text-slate-200">
            {`Episode ${episode_number} - season ${season_number}`}
          </h3>
          <ul className="flex gap-2 text-sm font-semibold text-slate-300">
            <li>{updateDateFormat(air_date)}</li>
            <span>&#x2022;</span>
            <li>{runtime}min</li>
          </ul>
          <div className="flex items-center gap-2">
            <Box>
              <Rating
                name="percentage-rating"
                value={Number(vote_average)}
                precision={0.1}
                readOnly
                max={10}
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
          <Ellipsis text={overview} />
        </div>
        <div>
          <img
            src={getPictureUrlFormat(still_path, 1280)}
            alt="movie poster"
            className="rounded-xl min-w-[400px] w-[800px]"
          />
        </div>
      </div>
      <hr className="border-1 border-slate-400 w-full my-4" />
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <WatchlistIcon item={item} />
          <FavoriteIcon item={item} />
          <MdAddToPhotos className="text-5xl text-slate-200 hover:text-orange-amber cursor-pointer duration-300 transition-colors ease-linear" />
        </div>
        <div className="py-4 px-4 rounded-lg bg-black/20 backdrop-blur-lg text-white font-medium text-sm flex items-center gap-2 hover:text-orange-amber duration-300 ease-linear transition-colors cursor-pointer">
          <span>Add your rate</span>
          <IoStarOutline className="text-xl" />
        </div>
      </div>
    </section>
  );
};

export default EpisodeInfo;
