import { FaPlus } from "react-icons/fa";
import { useAddShow } from "./useAddShow";
import { useSelector } from "react-redux";
import SpinnerMini from "../../ui/SpinnerMini";

import { useEffect, useRef, useState } from "react";
import { useDeleteShow } from "./useDeleteShow";
import { LuListCheck } from "react-icons/lu";
import { SlOptionsVertical } from "react-icons/sl";
import ItemsListOption from "../../ui/ItemsListOption";
import DeleteListConfirm from "../../ui/DeleteListConfirm";
import { useDeleteList } from "./useDeleteList";
import Ellipsis from "../../ui/Ellipsis";

const ItemsList = ({ list, item }) => {
  const { itemId, type, parentId, episode, season } = item;

  const buttonRef = useRef();

  const [isAdded, setIsAdded] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [forConfirmDelete, setForConfirmDelete] = useState(false);

  const { isLoggedIn, user } = useSelector((state) => state.user);

  const { addShow, isLoading: isAdding } = useAddShow();
  const { deleteShow, isLoading: isDeleting } = useDeleteShow();
  const { deleteList, isLoading: isDeletingList } = useDeleteList();

  const row = {
    id: itemId,
    listId: list.id,
    type,
    parentId,
    episode,
    season,
  };

  function handleAddToList() {
    if (isLoggedIn && list && itemId) {
      addShow(row);
      setIsOptionOpen(false);
    }
  }

  function handleDeleteFromList() {
    if (isLoggedIn && list && itemId) {
      deleteShow({ id: itemId, listId: list.id, type });
      setIsOptionOpen();
    }
  }

  function handleDeleteList() {
    if (isLoggedIn && user.uid) {
      deleteList(
        { userId: user.uid, listId: list.id },
        {
          onSuccess: () => {
            setForConfirmDelete(false);
          },
        }
      );
    }
  }

  function handleTogglePopup(e) {
    e.stopPropagation();
    setIsOptionOpen((prev) => !prev);
  }

  let content;

  if (isAdding || isDeleting) {
    content = <SpinnerMini size={25} />;
  } else {
    if (isAdded) {
      content = <LuListCheck className="text-3xl text-[#e7bd15]" />;
    } else {
      content = (
        <FaPlus className="text-slate-400 text-xl group-hover:text-orange-coral" />
      );
    }
  }

  useEffect(() => {
    const inList = list?.items_list.some((el) => el.item_id == itemId);

    setIsAdded(inList);
  }, [list?.items_list, itemId]);

  return (
    <div className="w-full p-4 flex items-center gap-4 justify-between hover:bg-slate-800 rounded-md transition-colors">
      <button
        className="flex items-center gap-3 w-full group"
        onClick={isAdded ? handleDeleteFromList : handleAddToList}
      >
        <div>{content}</div>

        <div className="flex items-center justify-between w-full gap-4">
          <p className="text-white font-medium text-lg text-start">
            <Ellipsis text={list.name} lines="line-clamp-1" />
          </p>
          <p className="text-sm text-slate-400 text-nowrap">
            {list.items_list.length || 0}{" "}
            {list.items_list.length === 1 ? "item" : "items"}
          </p>
        </div>
      </button>
      <div className="relative">
        <button
          onClick={handleTogglePopup}
          ref={buttonRef}
          className="hover:bg-blue-200 rounded-full w-7 h-7 flex justify-center items-center "
        >
          <SlOptionsVertical className="w-4 h-4 text-slate-400" />
        </button>

        {isOptionOpen && (
          <ItemsListOption
            buttonRef={buttonRef}
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
          name={list.name}
          type="deleteList"
          isDeleting={isDeletingList}
        />
      )}
    </div>
  );
};

export default ItemsList;
