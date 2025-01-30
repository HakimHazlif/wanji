import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLists } from "./useLists";
import { useAddShow } from "./useAddShow";
import { useDeleteShow } from "./useDeleteShow";
import { BsBookmarkCheckFill, BsBookmarkPlusFill } from "react-icons/bs";
import { Tooltip } from "@mui/material";
import SpinnerMini from "../../ui/SpinnerMini";

const WatchlistButton = ({ item }) => {
  const { itemId, type, parentId, episode, season } = item;

  const { isLoggedIn } = useSelector((state) => state.user);

  const { watchlist, isLoading } = useLists();
  const { isLoading: isAdding, addShow } = useAddShow();
  const { isLoading: isDeleting, deleteShow } = useDeleteShow();

  function handleAddToWatchlist() {
    if (isLoggedIn && watchlist) {
      const listId = watchlist.id;
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
  function handleDeleteFromWatchlist() {
    if (isLoggedIn && watchlist) {
      const listId = watchlist.id;
      deleteShow({ id: itemId, listId: listId, type });
    }
  }

  const isWatchlist = useMemo(
    () => watchlist?.items_list.some((el) => el.item_id == itemId),
    [itemId, watchlist?.items_list]
  );

  let content;
  if (isAdding || isDeleting || isLoading) {
    content = <SpinnerMini />;
  } else {
    if (isWatchlist) {
      content = (
        <>
          <BsBookmarkCheckFill className="h-5 w-5 text-orange-amber" />
        </>
      );
    } else {
      content = (
        <>
          <BsBookmarkPlusFill className="h-5 w-5 text-gray-200" />
        </>
      );
    }
  }

  return (
    <Tooltip title={isWatchlist ? "Delete from Watchlist" : "Add to Watchlist"}>
      <span>
        <button
          className="bg-slate-700 w-24 px-4 py-2 font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-slate-500"
          onClick={
            isWatchlist ? handleDeleteFromWatchlist : handleAddToWatchlist
          }
          disabled={isLoading || isAdding || isDeleting}
        >
          {content}
        </button>
      </span>
    </Tooltip>
  );
};

export default WatchlistButton;
