import { useShow } from "../show/useShow";
import { Link, useNavigate } from "react-router";
import { getPictureUrlFormat, getYearMonthFormat } from "../../utils/helper";
import ListScroll from "./ListScroll";
import { FaStar } from "react-icons/fa";
import { Tooltip } from "@mui/material";

const SeasonsList = () => {
  const navigate = useNavigate();
  const { details } = useShow();
  const { seasons } = details;

  function handleNavigate(number) {
    navigate(`/tv/${details.id}/season/${number}`);
  }

  return (
    <section className="">
      <ListScroll title="Seasons">
        {seasons.map((season) => (
          <div key={season.id} className="w-52 text-white">
            <div>
              <Tooltip title={season.name}>
                <img
                  src={getPictureUrlFormat(season.poster_path, 500)}
                  alt="show poster"
                  className="relative w-full rounded-md object-cover cursor-pointer"
                  onClick={() => handleNavigate(season.season_number)}
                />
              </Tooltip>
              <div className="px-3 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-[12px] text-slate-400 font-medium">
                    {getYearMonthFormat(season.air_date)}
                  </span>
                  <Tooltip title="TMDB rate">
                    <div className="rounded-md bg-orange-amber w-[45px] h-6  flex items-center justify-center gap-1 text-xs font-bold">
                      <FaStar />
                      <p>{season.vote_average.toFixed(1)}</p>
                    </div>
                  </Tooltip>
                </div>

                <Tooltip title={season.name}>
                  <h2
                    className="text-lg font-medium cursor-pointer"
                    onClick={() => handleNavigate(season.season_number)}
                  >
                    {season.name}
                  </h2>
                </Tooltip>
              </div>
            </div>
          </div>
        ))}
      </ListScroll>
    </section>
  );
};

export default SeasonsList;
