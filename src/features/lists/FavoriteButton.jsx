import { useSelector } from "react-redux";
import { useLists } from "./useLists";
import { useAddShow } from "./useAddShow";
import { useDeleteShow } from "./useDeleteShow";
import { FaHeart } from "react-icons/fa";
import { LuHeart } from "react-icons/lu";
import SpinnerMini from "../../ui/SpinnerMini";
import { useListsContext } from "../../context/ListsContext";
import { useItemStatus } from "./useItemStatus";

const FavoriteButton = ({
  item,
  iconSize = "md:text-xl sm:text-lg text-base",
  width = "md:w-[100px] sm:w-[92px] w-[85px]",
}) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { isLoading: isStatusLoading } = useItemStatus();

  const { itemsStatusMap, setItemsStatusMap } = useListsContext();

  const { itemId, type, parentId, episode, season } = item;

  const isFavorited = itemsStatusMap?.[type]?.get(itemId)?.inFavorites ?? false;

  // const isFavorited = typeMap?.get(String(itemId))?.get("inFavorites") ?? false;

  const { favoriteList, isLoading } = useLists();
  const { isLoading: isAdding, addShow } = useAddShow(type);
  const { isLoading: isDeleting, deleteShow } = useDeleteShow(type);

  function handleAddToFavorite() {
    console.log(favoriteList);
    if (isLoggedIn && favoriteList) {
      const listId = favoriteList.id;
      addShow(
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
                  inWatchlist: false,
                  inFavorites: true,
                  rating: null,
                });
              else newMap.get(itemId).inFavorites = true;

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
  function handleDeleteFromFavorite() {
    if (isLoggedIn && favoriteList) {
      const listId = favoriteList.id;
      deleteShow(
        { id: itemId, listId, type },
        {
          onSuccess: () => {
            setItemsStatusMap((prev) => {
              const prevItems = { ...prev };

              if (!prevItems[type].has(itemId))
                prevItems[type].set(itemId, {
                  inWatchlist: false,
                  inFavorites: false,
                  rating: null,
                });
              else prevItems[type].get(itemId).inFavorites = false;

              return prevItems;
            });
          },
        }
      );
    }
  }

  let content;
  if (isAdding || isDeleting || isLoading || isStatusLoading) {
    content = <SpinnerMini iconSize={iconSize} />;
  } else {
    if (isFavorited) {
      content = (
        <>
          <FaHeart className={`text-gray-200 ${iconSize}`} />
        </>
      );
    } else {
      content = (
        <>
          <LuHeart className={`text-gray-200 ${iconSize}`} />
        </>
      );
    }
  }

  return (
    <button
      className={`${
        isFavorited
          ? "bg-strawberry hover:bg-red-600"
          : "bg-slate-700 hover:bg-slate-600"
      } ${width} py-2 font-bold rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-lg`}
      onClick={isFavorited ? handleDeleteFromFavorite : handleAddToFavorite}
      disabled={isLoading || isAdding || isDeleting}
    >
      {content}
    </button>
  );
};

export default FavoriteButton;
