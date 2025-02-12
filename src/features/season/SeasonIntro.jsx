import { Box, Rating } from "@mui/material";
import {
  formatNumber,
  getPictureUrlFormat,
  updateDateFormat,
} from "../../utils/helper";
import { useSeason } from "./useSeason";
import Ellipsis from "../../ui/Ellipsis";
import { Link } from "react-router";

const SeasonIntro = () => {
  const { seasonDetails, episodes } = useSeason();
  const {
    title,
    name,
    overview,
    poster_path,
    season_number,
    vote_average,
    air_date,
    genres,
    status,
  } = seasonDetails;

  return (
    <section className="pt-20">
      <div className="flex gap-4 items-end">
        <div>
          <img
            src={getPictureUrlFormat(poster_path, 1280)}
            alt="movie poster"
            className="rounded-xl min-w-[250px] w-[400px]"
          />
        </div>
        <div>
          <div className="mb-2 text-white font-bold">
            <h2 className="text-4xl mb-2">{title}</h2>
            <h3 className="text-3xl text-slate-200">{name}</h3>
          </div>
          <ul className="flex items-center gap-2 text-sm whitespace-nowrap my-2 text-white">
            <li className="text-sm">{updateDateFormat(air_date)}</li>
            <span>&#x2022;</span>
            <li>{episodes.length} episodes</li>
            <span>&#x2022;</span>
            <li>{status}</li>
          </ul>
          <div className="flex items-center gap-2 mb-2">
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
            <p className="px-2 py-0.5 rounded-sm bg-orange-amber text-gray-800 font-semibold">
              {formatNumber(vote_average)}
            </p>
          </div>

          <ul className="flex gap-2">
            {genres?.map((genre) => (
              <Link
                key={genre.id}
                to={`/genre/${genre.name
                  .split(" ")
                  .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
                  .join("-")}/${genre.id}/tv?page=1`}
                className="py-2 px-4 rounded-lg bg-black/20 hover:bg-black/60 backdrop-blur-md text-white font-medium text-sm"
              >
                {genre.name}
              </Link>
            ))}
          </ul>

          <Ellipsis text={overview} />
        </div>
      </div>
    </section>
  );
};

export default SeasonIntro;
