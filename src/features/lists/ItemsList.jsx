import { FaPlus } from "react-icons/fa";
import { useAddShow } from "./useAddShow";
import { useDispatch, useSelector } from "react-redux";
import SpinnerMini from "../../ui/SpinnerMini";
import { useShow } from "../show/useShow";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDeleteShow } from "./useDeleteShow";
import { LuListCheck } from "react-icons/lu";
import { getYearFormat } from "../../utils/helper";
import { clearLists } from "./listsSlice";

const ItemsList = ({ list }) => {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.user);
  const { details } = useShow();
  const { category } = useParams();

  const title = details.title || details.name;
  const date = getYearFormat(details.release_date || details.first_air_date);

  const { addShow, isLoading: isAdding } = useAddShow();
  const { deleteShow, isLoading: isDeleting } = useDeleteShow();

  const row = {
    id: details.id,
    listId: list.id,
    type: category,
  };

  function handleAddToList() {
    if (isLoggedIn && list && details) {
      addShow(row);
      dispatch(clearLists());
    }
  }

  function handleDeleteFromList() {
    if (isLoggedIn && list && details.id) {
      deleteShow({ id: details.id, listId: list.id });
      dispatch(clearLists());
    }
  }

  useEffect(() => {
    const inList = list?.items_list.some((item) => item.item_id == details.id);

    setIsAdded(inList);
  }, [list?.items_list, details.id]);

  if (isAdding || isDeleting) return <SpinnerMini />;
  return (
    <button
      onClick={isAdded ? handleDeleteFromList : handleAddToList}
      className="w-full p-4 flex items-center justify-between hover:bg-slate-800 transition-colors"
    >
      <div className="flex items-center gap-3 w-full">
        {isAdded ? (
          <LuListCheck className="text-slate-400 text-3xl text-[#198513]" />
        ) : (
          <FaPlus className="text-slate-400 text-xl" />
        )}
        <div className="flex items-center justify-between w-full">
          <p className="text-white font-medium">{list.name}</p>
          <p className="text-sm text-slate-400">
            {list.items_list.length || 0} items
          </p>
        </div>
      </div>
    </button>
  );
};

export default ItemsList;
