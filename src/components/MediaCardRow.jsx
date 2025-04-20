import { getPictureUrlFormat } from "../utils/helper";
import Ellipsis from "../ui/Ellipsis";
import DeleteListConfirm from "../ui/DeleteListConfirm";
import { TiDelete } from "react-icons/ti";
import { useState } from "react";
import { useTransitionNavigate } from "../hooks/useTransitionNavigate";
import EmptyPoster from "./EmptyPoster";

import MediaCardRowHeader from "./MediaCardRowHeader";
import WatchlistButton from "../features/userLists/buttons/WatchlistButton";
import FavoriteButton from "../features/userLists/buttons/FavoriteButton";
import AddToListButton from "../features/userLists/buttons/AddToListButton";

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

  const { episode_number, season_number, overview } = show;
  const id = show?.id || show?.item_id;
  const title = show?.title || show?.name;
  const poster = show?.poster_path || show?.still_path;

  // console.log(show);

  const item = {
    itemId: id,
    type: category,
    parentId: parentShowId,
    episode: episode_number,
    season: season_number,
  };

  return (
    <div className="w-full h-full rounded-2xl bg-[#0000]/20 shadow-lg transition-shadow flex md:flex-row flex-col p-2 xl:gap-6 lg:gap-4 gap-1 relative">
      <div className="md:max-w-[200px] max-w-full flex">
        <div className="md:max-w-full xs:max-w-[200px] w-full max-xs:flex justify-center">
          {poster ? (
            <img
              src={getPictureUrlFormat(poster)}
              alt={title}
              className="h-full w-full max-xs:w-[200px] object-cover cursor-pointer rounded-md"
              onClick={() => {
                if (category === "episode")
                  transitionNavigate(
                    `/tv/${parentShowId}/season/${season_number}/episode/${episode_number}`
                  );
                else transitionNavigate(`/${category}/${id}`);
              }}
            />
          ) : (
            <EmptyPoster size={80} style="h-full w-[205px] rounded-md" />
          )}
        </div>
        <div className="md:hidden flex-1 xs:flex flex-col hidden gap-2 px-2 py-4">
          <MediaCardRowHeader
            link={
              category === "episode"
                ? `/tv/${parentShowId}/season/${season_number}/episode/${episode_number}`
                : `/${category}/${id}`
            }
            show={show}
            category={category}
            item={item}
          />
        </div>
      </div>

      <div className="flex-1 xs:px-2 lg:px-4 lg:pt-4 xs:pt-2 pb-2 flex flex-col justify-between min-h-full md:min-h-[160px]">
        <div className="flex flex-col gap-2 grow">
          <div className="md:flex flex-col gap-2 xs:hidden flex">
            <MediaCardRowHeader
              link={
                category === "episode"
                  ? `/tv/${parentShowId}/season/${season_number}/episode/${episode_number}`
                  : `/${category}/${id}`
              }
              show={show}
              category={category}
              item={item}
            />
          </div>

          {overview && (
            <div className="text-sm text-slate-400 mb-2">
              <Ellipsis
                text={overview}
                lines="lg:line-clamp-2 md:line-clamp-1 line-clamp-2"
              />
            </div>
          )}
        </div>

        <div className="flex gap-2 w-full items-end">
          <div className="w-1/3">
            <WatchlistButton
              item={item}
              iconSize="lg:text-lg text-md"
              width="w-full"
            />
          </div>
          <div className="w-1/3">
            <FavoriteButton
              item={item}
              iconSize="lg:text-lg text-md"
              width="w-full"
            />
          </div>
          <div className="w-1/3">
            <AddToListButton iconSize="lg:text-lg text-md" width="w-full" />
          </div>
        </div>
      </div>
      {forEditList && (
        <div className="absolute z-40 sm:top-2 sm:right-2 top-1 right-1">
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
