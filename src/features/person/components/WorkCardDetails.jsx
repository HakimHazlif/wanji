import RatingBox from "../../../components/RatingBox";
import { updateDateFormat } from "../../../utils/helper";
import UserRateMini from "../../userLists/buttons/UserRateMini";

const WorkCardDetails = ({ handleNavigate, show, category, item }) => {
  const {
    character,
    episode_count,
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

      <div className="flex flex-wrap gap-3 font-medium gap-y-2">
        {character && (
          <h3 className="md:font-bold md:text-base text-sm">
            <span className="text-gray-400 font-medium">Character:</span>{" "}
            {character}
          </h3>
        )}
        {job && (
          <h3 className="md:font-bold md:text-base text-sm">
            <span className="text-gray-400 font-medium">Crew Job:</span> {job}
          </h3>
        )}
        {episode_count && (
          <p className="md:text-base text-sm text-gray-300 font-medium ">
            Had worked on {episode_count}{" "}
            {episode_count === 1 ? "episode" : "episodes"}
          </p>
        )}

        <p className="md:font-bold font-medium md:text-base text-sm">
          <span className="text-gray-400 font-medium">Popularity:</span>{" "}
          {popularity}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 my-2">
        <RatingBox
          rating={rate}
          styleOfSpan="w-[32px] text-center text-sm rounded-sm bg-orange-coral font-semibold text-gray-800"
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
            buttonStyle="w-[32px] text-center text-sm rounded-sm bg-orange-amber font-semibold text-gray-800"
          />
        </div>
      </div>
    </>
  );
};

export default WorkCardDetails;
