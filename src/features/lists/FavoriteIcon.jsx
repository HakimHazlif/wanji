import { useLists } from "./useLists";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { useAddShow } from "./useAddShow";
import SpinnerMini from "../../ui/SpinnerMini";
import { useDeleteShow } from "./useDeleteShow";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { LuHeart } from "react-icons/lu";
import { useParams } from "react-router";

const FavoriteIcon = ({ item }) => {
  const { itemId, type, title, date, season, parentId } = item;
  const { id } = useParams();
  const { isLoggedIn } = useSelector((state) => state.user);
  const [isFavorited, setIsFavorited] = useState();

  const { favoriteList, isLoading } = useLists();

  // console.log({
  //   id: id,
  //   listId: favoriteList?.id,
  //   type: type,
  //   parentId: parentId,
  // });

  const { isLoading: isAdding, addShow } = useAddShow();
  const { isLoading: isDeleting, deleteShow } = useDeleteShow();

  function handleAddToFavorite() {
    if (isLoggedIn && favoriteList) {
      const listId = favoriteList.id;
      addShow({
        id: itemId,
        listId,
        type,
        title,
        date,
        season,
        parentId,
      });
    }
  }
  function handleDeleteFromFavorite() {
    if (isLoggedIn && favoriteList) {
      const listId = favoriteList.id;
      deleteShow({ id: itemId, listId, parentId: parentId });
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
          className=" text-strawberry text-5xl cursor-pointer"
          onClick={handleDeleteFromFavorite}
        />
      ) : (
        <LuHeart
          className="text-5xl text-gray-300 cursor-pointer hover:text-red-500 duration-300 transition-colors ease-linear"
          onClick={handleAddToFavorite}
        />
      )}
    </>
  );
};

export default FavoriteIcon;
