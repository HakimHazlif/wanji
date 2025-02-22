import { useSelector } from "react-redux";
import { useLists } from "./useLists";
import { useAddShow } from "./useAddShow";
import { useDeleteShow } from "./useDeleteShow";
import { FaHeart } from "react-icons/fa";
import { LuHeart } from "react-icons/lu";
import { Tooltip } from "@mui/material";
import SpinnerMini from "../../ui/SpinnerMini";
import { useListsContext } from "../../context/ListsContext";

const FavoriteButton = ({ item }) => {
  const { isLoggedIn } = useSelector((state) => state.user);

  const { itemsStatusMap, setItemsStatusMap } = useListsContext();

  const { itemId, type, parentId, episode, season } = item;

  const isFavorited = itemsStatusMap?.[type]?.[itemId]?.inFavorites ?? false;

  const { favoriteList, isLoading } = useLists();
  const { isLoading: isAdding, addShow } = useAddShow(type);
  const { isLoading: isDeleting, deleteShow } = useDeleteShow(type);

  function handleAddToFavorite() {
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
            setItemsStatusMap((prev) => ({
              ...prev,
              [type]: {
                ...prev[type],
                [itemId]: {
                  ...prev[type]?.[itemId],
                  inFavorites: true,
                },
              },
            }));
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
            setItemsStatusMap((prev) => ({
              ...prev,
              [type]: {
                ...prev[type],
                [itemId]: {
                  ...prev[type]?.[itemId],
                  inFavorites: false,
                },
              },
            }));
          },
        }
      );
    }
  }

  // const isFavorited = useMemo(
  //   () => favoriteList?.items_list.some((el) => el.item_id == itemId),
  //   [itemId, favoriteList?.items_list]
  // );

  let content;
  if (isAdding || isDeleting || isLoading) {
    content = <SpinnerMini />;
  } else {
    if (isFavorited) {
      content = (
        <>
          <FaHeart className="text-gray-200 md:text-xl sm:text-lg text-base" />
        </>
      );
    } else {
      content = (
        <>
          <LuHeart className="text-gray-200 md:text-xl sm:text-lg text-base" />
        </>
      );
    }
  }

  return (
    <Tooltip title={isFavorited ? "Delete from Favorites" : "Add to Favorites"}>
      <span>
        <button
          className={`${
            isFavorited
              ? "bg-strawberry hover:bg-red-600"
              : "bg-slate-700 hover:bg-slate-600"
          } md:w-[100px] sm:w-[92px] w-[85px] py-2 font-bold rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-lg`}
          onClick={isFavorited ? handleDeleteFromFavorite : handleAddToFavorite}
          disabled={isLoading || isAdding || isDeleting}
        >
          {content}
        </button>
      </span>
    </Tooltip>
  );
};

export default FavoriteButton;
