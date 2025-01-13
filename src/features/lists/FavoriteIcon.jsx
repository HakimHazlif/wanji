import { useLists } from "./useLists";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { useAddShow } from "./useAddShow";
import SpinnerMini from "../../ui/SpinnerMini";
import { useDeleteShow } from "./useDeleteShow";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

const FavoriteIcon = ({ id }) => {
  const [isFavorited, setIsFavorited] = useState();
  const { favoriteList, isLoading } = useLists();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { isLoading: isAdding, addShow } = useAddShow();
  const { isLoading: isDeleting, deleteShow } = useDeleteShow();

  function handleAddToWatchlist() {
    if (isLoggedIn && favoriteList) {
      const listId = favoriteList.id;
      addShow({ id, listId });
    }
  }
  function handleDeleteFromWatchlist() {
    if (isLoggedIn && favoriteList) {
      const listId = favoriteList.id;
      deleteShow({ id, listId });
    }
  }

  useEffect(() => {
    const favorited = favoriteList?.items_list.some(
      (item) => item.item_id == id
    );

    setIsFavorited(favorited);
  }, [setIsFavorited, id, favoriteList?.items_list]);

  if (isAdding || isDeleting || isLoading) return <SpinnerMini />;

  return (
    <>
      {isFavorited ? (
        <FaHeart
          className=" text-strawberry text-5xl"
          onClick={handleDeleteFromWatchlist}
        />
      ) : (
        <CiHeart
          className="text-6xl text-gray-300"
          onClick={handleAddToWatchlist}
        />
      )}
    </>
  );
};

export default FavoriteIcon;
