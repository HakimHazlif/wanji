import { useSelector } from "react-redux";
import { useListsContext } from "../../../context/ListsContext";
import { useLists } from "../hooks/useLists";
import { useAddVisualMedia } from "../hooks/useAddVisualMedia";
import { useDeleteVisualMedia } from "../hooks/useDeleteVisualMedia";
import SpinnerMini from "../../../ui/SpinnerMini";
import { BsBookmarkCheckFill, BsBookmarkPlus } from "react-icons/bs";
import { useSession } from "../../../context/SessionContext";

const WatchlistButton = ({
  item,
  iconSize = "md:text-xl sm:text-lg text-base",
  width = "md:w-[100px] sm:w-[92px] w-[85px]",
}) => {
  const { handleLoginAction } = useSession();
  const { isLoggedIn } = useSelector((state) => state.user);

  const { itemsStatusMap, setItemsStatusMap } = useListsContext();
  const { itemId, type, parentId, episode, season } = item;

  const isWatchlist = itemsStatusMap?.[type]?.get(itemId)?.inWatchlist ?? false;

  const { watchlist, isLoading } = useLists();
  const { isLoading: isAdding, addVisualMedia } = useAddVisualMedia(type);
  const { isLoading: isDeleting, deleteVisualMedia } =
    useDeleteVisualMedia(type);

  function handleAddToWatchlist() {
    if (isLoggedIn && watchlist) {
      const listId = watchlist.id;
      addVisualMedia(
        {
          id: itemId,
          listId,
          type,
          parentId,
          episode,
          season,
        },
        {
          onSuccess: () => {
            setItemsStatusMap((prev) => {
              const newMap = new Map(prev[type]);

              if (!newMap.has(itemId))
                newMap.set(itemId, {
                  inWatchlist: true,
                  inFavorites: false,
                  rating: null,
                });
              else newMap.get(itemId).inWatchlist = true;

              return {
                ...prev,
                [type]: newMap,
              };
            });
          },
        }
      );
    }
  }
  function handleDeleteFromWatchlist() {
    if (isLoggedIn && watchlist) {
      const listId = watchlist.id;
      deleteVisualMedia(
        { id: itemId, listId: listId, type },
        {
          onSuccess: () => {
            setItemsStatusMap((prev) => {
              const newMap = new Map(prev[type]);

              if (!newMap.has(itemId))
                newMap.set(itemId, {
                  inWatchlist: false,
                  inFavorites: false,
                  rating: null,
                });
              else newMap.get(itemId).inWatchlist = false;

              return {
                ...prev,
                [type]: newMap,
              };
            });
          },
        }
      );
    }
  }

  function handleClickOnButton() {
    if (isWatchlist) handleLoginAction(handleDeleteFromWatchlist);
    else handleLoginAction(handleAddToWatchlist);
  }

  let content;
  if (isAdding || isDeleting || isLoading) {
    content = <SpinnerMini iconSize={iconSize} />;
  } else {
    if (isWatchlist) {
      content = (
        <>
          <BsBookmarkCheckFill className={`text-gray-200 ${iconSize}`} />
        </>
      );
    } else {
      content = (
        <>
          <BsBookmarkPlus className={`text-gray-200 ${iconSize}`} />
        </>
      );
    }
  }

  return (
    <button
      className={`${
        isWatchlist
          ? "bg-amber-500 hover:bg-amber-400"
          : "bg-[#0000]/30 backdrop-blur-lg hover:bg-[#0000]/60"
      } ${width} py-2 font-bold rounded-lg flex items-center justify-center gap-2 ease-linear cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg`}
      onClick={handleClickOnButton}
      disabled={isLoading || isAdding || isDeleting}
    >
      {content}
    </button>
  );
};

export default WatchlistButton;
