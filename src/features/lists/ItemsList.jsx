import { FaPlus } from "react-icons/fa";
import { useAddShow } from "./useAddShow";
import { useDispatch, useSelector } from "react-redux";
import SpinnerMini from "../../ui/SpinnerMini";
import { useShow } from "../show/useShow";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDeleteShow } from "./useDeleteShow";
import { LuListCheck } from "react-icons/lu";
import { SlOptionsVertical } from "react-icons/sl";
import ItemsListOption from "../../ui/ItemsListOption";
import DeleteListConfirm from "../../ui/DeleteListConfirm";
import { useDeleteList } from "./useDeleteList";

const ItemsList = ({ list }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [forConfirmDelete, setForConfirmDelete] = useState(false);

  const { isLoggedIn, user } = useSelector((state) => state.user);
  const { details } = useShow();
  const { category } = useParams();

  const { addShow, isLoading: isAdding } = useAddShow();
  const { deleteShow, isLoading: isDeleting } = useDeleteShow();
  const { deleteList } = useDeleteList();

  const row = {
    id: details.id,
    listId: list.id,
    type: category,
  };

  function handleAddToList() {
    if (isLoggedIn && list && details) {
      addShow(row);
      setIsOptionOpen(false);
    }
  }

  function handleDeleteFromList() {
    if (isLoggedIn && list && details.id) {
      deleteShow({ id: details.id, listId: list.id, type: category });
      setIsOptionOpen();
    }
  }

  function handleDeleteList() {
    if (isLoggedIn && user.uid) {
      console.log("clicked");
      deleteList({ userId: user.uid, listId: list.id });
      setForConfirmDelete(false);
    }
  }

  useEffect(() => {
    const inList = list?.items_list.some((item) => item.item_id == details.id);

    setIsAdded(inList);
  }, [list?.items_list, details.id]);

  return (
    <div className="w-full p-4 flex items-center gap-4 justify-between hover:bg-slate-800 rounded-md transition-colors">
      <button
        className="flex items-center gap-3 w-full group"
        onClick={isAdded ? handleDeleteFromList : handleAddToList}
      >
        <div>
          {(isAdding || isDeleting) && <SpinnerMini />}
          {isAdded ? (
            <LuListCheck className="text-3xl text-[#e7bd15]" />
          ) : (
            <FaPlus className="text-slate-400 text-xl group-hover:text-orange-coral" />
          )}
        </div>

        <div className="flex items-center justify-between w-full">
          <p className="text-white font-medium text-lg">{list.name}</p>
          <p className="text-sm text-slate-400">
            {list.items_list.length || 0}{" "}
            {list.items_list.length === 1 ? "item" : "items"}
          </p>
        </div>
      </button>
      <div className="relative">
        <button
          onClick={() => setIsOptionOpen((prev) => !prev)}
          className="hover:bg-blue-200 rounded-full w-7 h-7 flex justify-center items-center "
        >
          <SlOptionsVertical className="w-4 h-4 text-slate-400" />
        </button>

        {isOptionOpen && (
          <ItemsListOption
            setIsOptionOpen={setIsOptionOpen}
            isAdded={isAdded}
            addToList={handleAddToList}
            deleteFromList={handleDeleteFromList}
            list={list}
            setForConfirmDelete={setForConfirmDelete}
          />
        )}
      </div>

      {forConfirmDelete && (
        <DeleteListConfirm
          onClose={() => setForConfirmDelete(false)}
          onDelete={handleDeleteList}
          listName={list.name}
        />
      )}
    </div>
  );
};

export default ItemsList;
