import { useSelector } from "react-redux";
import { useItemStatus } from "../hooks/useItemStatus";
import { useListsContext } from "../../../context/ListsContext";
import { useLists } from "../hooks/useLists";
import { useAddVisualMedia } from "../hooks/useAddVisualMedia";
import { useDeleteVisualMedia } from "../hooks/useDeleteVisualMedia";
import SpinnerMini from "../../../ui/SpinnerMini";
import { FaHeart } from "react-icons/fa";
import { LuHeart } from "react-icons/lu";

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

  // if (type === "tv" && itemId === 2261) {
  //   console.log({ isFavorited, itemsStatusMap });
  // }

  // const isFavorited = typeMap?.get(String(itemId))?.get("inFavorites") ?? false;

  const { favoriteList, isLoading } = useLists();
  const { isLoading: isAdding, addVisualMedia } = useAddVisualMedia(type);
  const { isLoading: isDeleting, deleteVisualMedia } =
    useDeleteVisualMedia(type);

  function handleAddToFavorite() {
    if (isLoggedIn && favoriteList) {
      const listId = favoriteList.id;
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
      deleteVisualMedia(
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
          : "bg-[#0000]/30 backdrop-blur-lg hover:bg-[#0000]/60 "
      } ${width} ease-linear cursor-pointer hover:scale-105 transition-all duration-300 py-2 font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg`}
      onClick={isFavorited ? handleDeleteFromFavorite : handleAddToFavorite}
      disabled={isLoading || isAdding || isDeleting}
    >
      {content}
    </button>
  );
};

export default FavoriteButton;
