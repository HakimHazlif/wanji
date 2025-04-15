import {
  formatNumber,
  getPictureUrlFormat,
  getYearFormat,
  updateDateFormat,
  updateRuntime,
} from "../utils/helper";
import { Link } from "react-router-dom";
import ShowStatus from "../ui/ShowStatus";
import Ellipsis from "../ui/Ellipsis";
import { IoMdStar } from "react-icons/io";
import CreditView from "../ui/CreditView";
import DeleteListConfirm from "../ui/DeleteListConfirm";
import { TiDelete } from "react-icons/ti";
import { useState } from "react";
import { useTransitionNavigate } from "../hooks/useTransitionNavigate";

const MediaCardRow = ({
  show,
  category,
  parentShowId = null,
  deleteVisualMedia = null,
  forEditList = false,
  isDeleting = false,
}) => {
  const [deletePopup, setDeletePopup] = useState(false);
  const { transitionNavigate } = useTransitionNavigate();

  const {
    vote_average: rate,
    episode_number,
    season_number,
    overview,
    status,
    runtime,
    credits,
    number_of_seasons,
    number_of_episodes,
    created_by,
  } = show;
  const id = show?.id || show?.item_id;
  const title = show?.title || show?.name;
  const poster = show?.poster_path || show?.still_path;

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

  // const item = {
  //   itemId: id,
  //   type: category,
  //   parentId: show_id,
  //   episode: episode_number,
  //   season: season_number,
  // };

  return (
    <div className="flex rounded-2xl bg-bluish-black overflow-hidden relative">
      <img
        src={getPictureUrlFormat(poster)}
        alt={title}
        className="w-[200px] h-full object-cover cursor-pointer"
        onClick={() => {
          if (category === "episode")
            transitionNavigate(
              `/tv/${parentShowId}/season/${season_number}/episode/${episode_number}`
            );
          else transitionNavigate(`/${category}/${id}`);
        }}
      />
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="w-full flex-1 flex flex-col gap-2">
            <Link
              to={
                category === "episode"
                  ? `/tv/${parentShowId}}/season/${season_number}/episode/${episode_number}`
                  : `/${category}/${id}`
              }
              className="flex gap-2 font-bold text-2xl items-center"
            >
              <h2>{title}</h2>
            </Link>

            <ul className="flex gap-2 text-sm font-semibold text-slate-400">
              <li>{handleDate()}</li>
              <span>&#x2022;</span>
              {runtime ? (
                <li>{updateRuntime(runtime)}</li>
              ) : (
                <>
                  <li>{number_of_episodes} episodes</li>
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
            <div className="flex gap-10">
              {status && (
                <div className="w-[120px]">
                  <ShowStatus status={status} />
                </div>
              )}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <IoMdStar className="text-orange-amber w-6 h-6" />
                  <p className="px-1 py-0.5 rounded-sm bg-orange-amber text-gray-800 font-semibold text-xs">
                    {formatNumber(rate)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <IoMdStar className="text-orange-coral w-6 h-6" />
                  <p className="px-1 py-0.5 rounded-sm bg-orange-coral text-gray-800 font-semibold  text-xs">
                    {formatNumber(rate)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {overview && (
          <div className="text-sm text-slate-400">
            <Ellipsis text={overview} lines="line-clamp-3" />
          </div>
        )}

        <div className="text-sm grid grid-rows-subgrid gap-2 mt-5">
          {created_by?.length >= 1 && (
            <CreditView cretids={created_by} job="Created by" />
          )}
          {directors?.length >= 1 && (
            <CreditView cretids={directors} job="Director" />
          )}
          {screenplays?.length >= 1 && (
            <CreditView cretids={screenplays} job="Screenplay" />
          )}
          {writers?.length >= 1 && (
            <CreditView cretids={writers} job="Writer" />
          )}
          {stars?.length >= 1 && <CreditView cretids={stars} job="Star" />}
        </div>
      </div>
      {forEditList && (
        <div className="absolute z-40 top-1 right-1">
          <span>
            <button onClick={() => setDeletePopup(true)}>
              <TiDelete
                size={35}
                className="text-gray-300 hover:text-red-400 duration-200 transition-colors"
              />
            </button>
          </span>
        </div>
      )}
      {deletePopup && (
        <DeleteListConfirm
          onClose={() => setDeletePopup(false)}
          onDelete={() => deleteVisualMedia(id, category)}
          name={title}
          type="deleteItem"
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default MediaCardRow;
