import { Link } from "react-router-dom";
import { useTransitionNavigate } from "../../../hooks/useTransitionNavigate";
import {
  getMainCrewRolls,
  getPictureUrlFormat,
  updateDateFormat,
} from "../../../utils/helper";
import EmptyPoster from "../../../components/EmptyPoster";
import WatchlistButton from "../../userLists/buttons/WatchlistButton";
import FavoriteButton from "../../userLists/buttons/FavoriteButton";
import RatingBox from "../../../components/RatingBox";
import UserRateMini from "../../userLists/buttons/UserRateMini";
import AddToListButton from "../../userLists/buttons/AddToListButton";
import { sumAverages } from "../../rating/utils/calculations";
import { useListsContext } from "../../../context/ListsContext";

const EpisodeCard = ({ episode }) => {
  const { transitionNavigate } = useTransitionNavigate();
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
    vote_count,
    crew,
  } = episode;

  const { ratingAverages } = useListsContext();

  const ratingData = ratingAverages?.["episode"]?.get(id) || {
    average: 0,
    count: 0,
  };
  const rate = sumAverages([
    ratingData,
    { average: vote_average, count: vote_count },
  ]);

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
    transitionNavigate(
      `/tv/${show_id}/season/${season_number}/episode/${episode_number}`
    );
  }

  return (
    <div className="flex md:flex-row flex-col rounded-2xl bg-[#0000]/20 shadow-lg transition-shadow duration-300 p-2 xl:gap-6 lg:gap-4 gap-1">
      <div className="">
        {still_path ? (
          <img
            src={getPictureUrlFormat(still_path)}
            alt="backdrop episode"
            className="max-w-full xl:max-w-[360px] lg:max-w-[300px] md:max-w-[260px] h-full rounded-xl object-cover cursor-pointer transition-all duration-200"
            onClick={handleNavigate}
          />
        ) : (
          <EmptyPoster
            size={50}
            style="max-w-full xl:max-w-[360px] lg:max-w-[300px] md:max-w-[260px] h-full rounded-xl"
          />
        )}
      </div>

      <div className="flex-1 lg:p-4 xs:p-2 flex flex-col">
        <div className="flex flex-wrap-reverse gap-y-2 xs:flex-row flex-col-reverse xs:justify-between w-full mb-2">
          <div
            onClick={handleNavigate}
            className="flex gap-2 font-semibold xl:text-2xl text-xl text-white cursor-pointer"
          >
            <span>{episode_number}.</span>
            <h2 className="">{name}</h2>
          </div>

          <div className="flex flex-1 justify-end gap-2 max-xs:w-full max-xs:my-2">
            <div className="max-xs:w-1/3">
              <WatchlistButton
                item={item}
                iconSize="lg:text-lg text-md"
                width="lg:w-[85px] xs:w-[70px] w-full"
              />
            </div>
            <div className="max-xs:w-1/3">
              <FavoriteButton
                item={item}
                iconSize="lg:text-lg text-md"
                width="lg:w-[85px] xs:w-[70px] w-full"
              />
            </div>
            <div className="max-xs:w-1/3">
              <AddToListButton
                item={item}
                image={still_path}
                showTitle={name}
                iconSize="lg:text-lg text-md"
                width="lg:w-[85px] xs:w-[70px] w-full"
              />
            </div>
          </div>
        </div>

        <ul className="flex gap-2 text-sm font-semibold text-slate-300">
          <li>{updateDateFormat(air_date)}</li>
          <span>&#x2022;</span>
          <li>{runtime} min</li>
        </ul>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 my-2">
          <RatingBox
            rating={rate}
            styleOfSpan="px-2 text-sm rounded-sm bg-orange-coral font-semibold text-gray-800"
            initialStars={5}
          />

          <div className="flex items-center gap-2">
            <UserRateMini
              item={item}
              addStars={true}
              buttonStyle="px-3 text-sm rounded-sm bg-orange-amber font-semibold text-gray-800"
            />
          </div>
        </div>
        <div className="mb-2">
          {directing.length > 0 && (
            <div className="flex gap-2 text-sm text-slate-300">
              <h3 className="font-medium">Director:</h3>
              <ul className="flex flex-wrap gap-y-0 gap-2 font-bold">
                {directing.map((director, index) => (
                  <li key={director.id} className="">
                    {index !== 0 && <span>&#x2022;</span>}
                    <Link
                      to={`/person/${director.id}`}
                      className="ml-2 hover:text-blue-600 duration-300 transition-colors"
                    >
                      {director.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {writing.length > 0 && (
            <div className="flex gap-2 text-sm text-slate-300">
              <h3 className="font-medium">Writer:</h3>
              <ul className="flex flex-wrap gap-y-0 gap-2 font-bold">
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

        <p className="text-sm font-semibold text-slate-400">{overview}</p>
      </div>
    </div>
  );
};

export default EpisodeCard;
