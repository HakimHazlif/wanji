import RatingBox from "../../../components/RatingBox";
import { updateDateFormat } from "../../../utils/helper";
import UserRateMini from "../../userLists/buttons/UserRateMini";

const WorkCardDetails = ({ handleNavigate, show, category, item }) => {
  const {
    character,
    episodesAsCast,
    episodesAsCrew,
    job,
    popularity,
    vote_average: rate,
  } = show;
  const title = show?.title || show?.name;
  const originalTitle = show?.original_title || show?.original_name;
  const newDate = show?.release_date || show?.first_air_date;

  return (
    <>
      <div
        onClick={handleNavigate}
        className="flex gap-2 font-bold md:text-2xl text-xl items-center cursor-pointer"
      >
        <h2 className="">{title}</h2>
        {originalTitle !== title && (
          <h3 className="text-xl text-gray-400">({originalTitle})</h3>
        )}
      </div>

      <ul className="flex gap-2 text-sm font-semibold text-slate-400">
        <li>{updateDateFormat(newDate)}</li>
        <span>&#x2022;</span>
        {category === "movie" ? <li>Movie</li> : <li>Tv show</li>}
      </ul>

      {character && (
        <div className="flex flex-wrap gap-3 font-medium gap-y-0">
          <h3 className="md:font-bold md:text-base text-sm">
            <span className="text-gray-400 font-medium">Character:</span>{" "}
            {character}{" "}
            {episodesAsCast && (
              <span className="md:text-base text-sm text-gray-300 font-medium ">
                ({episodesAsCast}{" "}
                {episodesAsCast === 1 ? "episode" : "episodes"})
              </span>
            )}
          </h3>
        </div>
      )}

      {job && (
        <div className="flex flex-wrap gap-3 font-medium gap-y-0">
          <h3 className="md:font-bold md:text-base text-sm">
            <span className="text-gray-400 font-medium">Crew Job:</span> {job}{" "}
            {episodesAsCrew && (
              <span className="md:text-base text-sm text-gray-300 font-medium ">
                ({episodesAsCrew}{" "}
                {episodesAsCrew === 1 ? "episode" : "episodes"})
              </span>
            )}
          </h3>
        </div>
      )}

      <p className="md:font-bold font-medium md:text-base text-sm">
        <span className="text-gray-400 font-medium">Popularity:</span>{" "}
        {popularity}
      </p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 my-2">
        <RatingBox
          rating={rate}
          styleOfSpan="w-[32px] text-center text-sm rounded-sm bg-orange-coral font-semibold text-gray-800"
          initialStars={5}
          size={20}
          color="#ffa845"
        />

        <div className="flex items-center gap-2">
          <UserRateMini
            item={item}
            addStars={true}
            buttonStyle="w-[32px] text-center text-sm rounded-sm bg-orange-amber font-semibold text-gray-800"
          />
        </div>
      </div>
    </>
  );
};

export default WorkCardDetails;
