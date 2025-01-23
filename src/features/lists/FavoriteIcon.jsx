import { useLists } from "./useLists";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { useAddShow } from "./useAddShow";
import SpinnerMini from "../../ui/SpinnerMini";
import { useDeleteShow } from "./useDeleteShow";
import { FaHeart } from "react-icons/fa";
import { LuHeart } from "react-icons/lu";
import { clearLists } from "./listsSlice";

const FavoriteIcon = ({ item }) => {
  const dispatch = useDispatch();
  const { itemId, type, parentId, episode, season } = item;
  // const { id } = useParams();
  const { isLoggedIn } = useSelector((state) => state.user);
  const [isFavorited, setIsFavorited] = useState();

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

      dispatch(clearLists());
    }
  }
  function handleDeleteFromFavorite() {
    if (isLoggedIn && favoriteList) {
      const listId = favoriteList.id;
      deleteShow({ id: itemId, listId, type });

      dispatch(clearLists());
    }
  }

  useEffect(() => {
    const favorited = favoriteList?.items_list.some(
      (el) => el.item_id == itemId
    );

    setIsFavorited(favorited);
  }, [setIsFavorited, itemId, favoriteList?.items_list]);

  if (isAdding || isDeleting || isLoading) return <SpinnerMini />;

  return (
    <>
      {isFavorited ? (
        <FaHeart
          className=" text-strawberry w-10 h-10 cursor-pointer"
          onClick={handleDeleteFromFavorite}
        />
      ) : (
        <LuHeart
          className="w-10 h-10 text-gray-300 cursor-pointer hover:text-red-500 duration-300 transition-colors ease-linear"
          onClick={handleAddToFavorite}
        />
      )}
    </>
  );
};

export default FavoriteIcon;
