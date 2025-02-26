import { Box, Rating } from "@mui/material";
import {
  formatNumber,
  getPictureUrlFormat,
  updateDateFormat,
} from "../../utils/helper";
import { useSeason } from "./useSeason";
import Ellipsis from "../../ui/Ellipsis";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import RatingBox from "../../components/RatingBox";

const SeasonIntro = () => {
  const [maxRating, setMaxRating] = useState(10);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setMaxRating(5);
      } else {
        setMaxRating(10);
      }
    };

    window.addEventListener("resize", handleResize);

    // handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="pt-20">
      <div className="flex xs:flex-row flex-col gap-4 items-end">
        <div>
          <img
            src={getPictureUrlFormat(poster_path, 1280)}
            alt={`season ${season_number}`}
            className="rounded-xl max-w-[180px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[250px] xl:max-w-[300px] min-w-[160px]"
          />
        </div>
        <div className="w-full flex-1">
          <div className="mb-2 text-white font-bold">
            <h2 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-bold sm:mb-2 mb-0">
              {title}
            </h2>
            <h3 className="xl:text-3xl lg:text-2xl md:text-xl text-lg text-slate-300">
              {name}
            </h3>
          </div>
          <ul className="flex flex-wrap items-center gap-2 gap-y-1 md:text-sm text-xs whitespace-nowrap my-2 text-white">
            <li className="text-sm">{updateDateFormat(air_date)}</li>
            <span>&#x2022;</span>
            <li>{episodes.length} episodes</li>
            <span>&#x2022;</span>
            <li>{status}</li>
          </ul>

          <RatingBox
            rating={vote_average}
            styleOfSpan="md:px-3 px-2 py-0.5 rounded-sm bg-orange-amber text-gray-800 font-semibold lg:text-base md:text-sm text-xs"
          />

          <ul className="flex-1 flex flex-wrap gap-2 gap-y-1 my-2 max-xs:mb-4">
            {genres?.map((genre) => (
              <Link
                key={genre.id}
                to={`/genre/${genre.name
                  .split(" ")
                  .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
                  .join("-")}/${genre.id}/tv?page=1`}
                className="py-2 px-4 rounded-lg bg-black/20 hover:bg-black/60 backdrop-blur-md text-white font-medium sm:text-sm text-xs text-nowrap"
              >
                {genre.name}
              </Link>
            ))}
          </ul>

          <Ellipsis
            text={overview}
            lines="xl:line-clamp-6 lg:line-clamp-5 sm:line-clamp-4 line-clamp-3"
          />
        </div>
      </div>
      {/* <div className="sm:hidden block mt-5 ">
        <Ellipsis
          text={overview}
          lines="xl:line-clamp-6 lg:line-clamp-5 sm:line-clamp-4 line-clamp-3"
        />
      </div> */}
    </section>
  );
};

export default SeasonIntro;
