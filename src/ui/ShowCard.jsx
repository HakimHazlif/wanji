import {
  getPictureUrlFormat,
  getYearFormat,
  updateDateFormat,
} from "../utils/helper";
import { FaStar } from "react-icons/fa";
import Ellipsis from "./Ellipsis";
import { Tooltip } from "@mui/material";
import { useMemo, useState } from "react";
import { TiDelete } from "react-icons/ti";
import DeleteListConfirm from "./DeleteListConfirm";
import EmptyPoster from "../components/EmptyPoster";

import WatchlistButton from "../features/lists/WatchlistButton";
import FavoriteButton from "../features/lists/FavoriteButton";
import UserRateMini from "../features/lists/UserRateMini";
import { useTransitionNavigate } from "../hooks/useTransitionNavigate";

const ShowCard = ({
  show,
  category,
  additions = true,
  parentShowId = null,
  deleteShow = null,
  forEditList = false,
  isDeleting = false,
}) => {
  const { transitionNavigate } = useTransitionNavigate();
  const [deletePopup, setDeletePopup] = useState(false);

  const rate = show?.vote_average;
  const episode_number = show?.episode_number;
  const season_number = show?.season_number;
  const id = show?.id || show?.item_id;
  const title = show?.title || show?.name;
  const poster = show?.poster_path || show?.still_path;

  const formattedDate = useMemo(() => {
    if (show?.release_date) return getYearFormat(show?.release_date);
    else if (show?.first_air_date) return getYearFormat(show?.first_air_date);
    else if (show?.air_date) return updateDateFormat(show?.air_date);
  });
  const roundedRate = useMemo(() => rate?.toFixed(1), [rate]);

  function handleNavigate() {
    if (category === "episode")
      transitionNavigate(
        `/tv/${parentShowId}}/season/${season_number}/episode/${episode_number}`
      );
    else transitionNavigate(`/${category}/${id}`);
  }
  // const { setIsMovie } = useSession();

  const item = {
    itemId: id,
    type: category,
    parentId: parentShowId,
    episode: episode_number,
    season: season_number,
  };

  return (
    <div className="md:w-52 sm:w-48 w-44 relative">
      <div className="">
        <Tooltip title={title}>
          <span>
            {poster ? (
              <img
                src={getPictureUrlFormat(poster, 500)}
                alt={title}
                className="relative w-full md:h-[320px] sm:h-[290px] h-[260px]  object-cover rounded-md shadow-2xl cursor-pointer"
                onClick={handleNavigate}
                loading="lazy"
              />
            ) : (
              <EmptyPoster />
            )}
          </span>
        </Tooltip>
        <div className="mt-2">
          <div className="flex w-full justify-between items-center">
            <div className="flex md:gap-3 gap-2">
              <Tooltip title="TMDB rate">
                <div className="rounded-md bg-orange-amber text-gray-700 w-[45px] h-6 flex items-center justify-center gap-1 text-xs font-bold">
                  <FaStar className="text-white" />
                  <p>{roundedRate}</p>
                </div>
              </Tooltip>

              <UserRateMini
                item={item}
                buttonStyle="rounded-md bg-orange-coral w-[45px] text-gray-700 h-6 flex items-center justify-center gap-1 text-xs font-bold"
              />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium">
                {formattedDate}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <Tooltip title={title}>
              <h2
                onClick={handleNavigate}
                className="text-sm font-medium cursor-pointer hover:text-orange-amber inline-block"
              >
                <Ellipsis text={title} lines="line-clamp-1" />
              </h2>
            </Tooltip>
          </div>
          {additions && (
            <div className="flex justify-between gap-2 mt-4">
              <WatchlistButton item={item} />
              <FavoriteButton item={item} />
            </div>
          )}
        </div>
      </div>

      {forEditList && (
        <div className="absolute z-40 top-1 right-1">
          <Tooltip title="Delete this Item">
            <span>
              <button onClick={() => setDeletePopup(true)}>
                <TiDelete
                  size={35}
                  className="text-gray-300 hover:text-red-400 duration-200 transition-colors"
                />
              </button>
            </span>
          </Tooltip>
        </div>
      )}
      {deletePopup && (
        <DeleteListConfirm
          onClose={() => setDeletePopup(false)}
          onDelete={() => deleteShow(id, category)}
          name={title}
          type="deleteItem"
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default ShowCard;
