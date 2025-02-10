import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLists } from "./useLists";
import { useAddShow } from "./useAddShow";
import { useDeleteShow } from "./useDeleteShow";
import { FaHeart } from "react-icons/fa";
import { LuHeart } from "react-icons/lu";
import { Tooltip } from "@mui/material";
import SpinnerMini from "../../ui/SpinnerMini";

const FavoriteButton = ({ item, size = 20 }) => {
  const { itemId, type, parentId, episode, season } = item;

  const { isLoggedIn } = useSelector((state) => state.user);

  const { favoriteList, isLoading } = useLists();
  const { isLoading: isAdding, addShow } = useAddShow();
  const { isLoading: isDeleting, deleteShow } = useDeleteShow();

  function handleAddToFavorite() {
    if (isLoggedIn && favoriteList) {
      const listId = favoriteList.id;
      addShow({
        id: itemId,
        listId,
        type,
        parentId,
        episode,
        season,
      });
    }
  }
  function handleDeleteFromFavorite() {
    if (isLoggedIn && favoriteList) {
      const listId = favoriteList.id;
      deleteShow({ id: itemId, listId, type });
    }
  }

  const isFavorited = useMemo(
    () => favoriteList?.items_list.some((el) => el.item_id == itemId),
    [itemId, favoriteList?.items_list]
  );

  let content;
  if (isAdding || isDeleting || isLoading) {
    content = <SpinnerMini size={size} />;
  } else {
    if (isFavorited) {
      content = (
        <>
          <FaHeart size={size} className=" text-gray-200" />
        </>
      );
    } else {
      content = (
        <>
          <LuHeart size={size} className=" text-gray-200" />
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
          }  w-24 px-4 py-2 font-bold rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-lg`}
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
