import { Link } from "react-router-dom";
import {
  getYearFormat,
  updateDateFormat,
  updateRuntime,
} from "../utils/helper";
import ShowStatus from "../ui/ShowStatus";
import RatingBox from "./RatingBox";
import UserRateMini from "../features/userLists/buttons/UserRateMini";
import CreditView from "../ui/CreditView";
import { useListsContext } from "../context/ListsContext";
import { sumAverages } from "../features/rating/utils/calculations";

const MediaCardRowHeader = ({ link, show, category, item }) => {
  const {
    id,
    runtime,
    number_of_seasons,
    number_of_episodes,
    episode_number,
    season_number,
    status,
    vote_average,
    vote_count,
    credits,
    created_by,
  } = show;
  const title = show?.title || show?.name;

  const { ratingAverages } = useListsContext();

  const ratingData = ratingAverages?.[item?.type]?.get(id) || {
    average: 0,
    count: 0,
  };
  const rate = sumAverages([
    ratingData,
    { average: vote_average, count: vote_count },
  ]);

  function handleDate() {
    if (show["release_date"]) return getYearFormat(show?.release_date);
    else if (show["first_air_date"])
      return `${getYearFormat(show?.first_air_date)} - ${
        status !== "Returning Series"
          ? getYearFormat(show?.last_air_date)
          : "(Continuous)"
      }`;
    else if (show["air_date"]) return updateDateFormat(show?.air_date);
  }

  const directors = credits?.crew.filter((crew) => crew.job === "Director");
  const screenplays = credits?.crew.filter((crew) => crew.job === "Screenplay");
  const writers = credits?.crew.filter((crew) => crew.job === "Writer");
  const stars = credits?.cast.slice(0, 4);

  return (
    <>
      <Link
        to={link}
        className="flex gap-2 font-bold md:text-2xl text-xl items-center"
      >
        <h2>{title}</h2>
      </Link>

      <ul className="flex flex-wrap gap-2 text-sm font-semibold text-slate-400">
        <li>{handleDate()}</li>
        <span>&#x2022;</span>
        {runtime ? (
          <li>{updateRuntime(runtime)}</li>
        ) : (
          <>
            {number_of_episodes && <li>{number_of_episodes} episodes</li>}
            {number_of_seasons && (
              <>
                <span>&#x2022;</span>
                <li>
                  {number_of_seasons}{" "}
                  {number_of_seasons === 1 ? "season" : "seasons"}
                </li>
              </>
            )}
          </>
        )}
        <span>&#x2022;</span>

        {category === "movie" ? (
          <li>Movie</li>
        ) : category === "tv" ? (
          <li>Tv show</li>
        ) : (
          <>
            <li>Episode {episode_number}</li>
            <span>&#x2022;</span>
            <li>Season {season_number}</li>
          </>
        )}
      </ul>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 my-2">
        {status && (
          <div className="w-[120px]">
            <ShowStatus status={status} />
          </div>
        )}
        <RatingBox
          rating={rate}
          styleOfSpan="w-[32px] text-center text-sm rounded-sm bg-orange-coral font-semibold text-gray-800"
          initialStars={5}
          size={20}
          color="#ffa845"
        />

        <UserRateMini
          item={item}
          addStars={true}
          buttonStyle="w-[32px] text-center text-sm rounded-sm bg-orange-amber font-semibold text-gray-800"
        />
      </div>

      <div className="flex flex-col gap-3 font-medium gap-y-2">
        {created_by?.length >= 1 && (
          <CreditView cretids={created_by} job="Created by" />
        )}
        {directors?.length >= 1 && (
          <CreditView cretids={directors} job="Director" />
        )}
        {screenplays?.length >= 1 && (
          <CreditView cretids={screenplays} job="Screenplay" />
        )}
        {writers?.length >= 1 && <CreditView cretids={writers} job="Writer" />}
        {stars?.length >= 1 && <CreditView cretids={stars} job="Star" />}
      </div>
    </>
  );
};

export default MediaCardRowHeader;
