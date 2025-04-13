import { FaPlus } from "react-icons/fa";
import { useAddShow } from "./useAddShow";
import { useSelector } from "react-redux";
import SpinnerMini from "../../ui/SpinnerMini";

import { useRef, useState } from "react";
import { useDeleteShow } from "./useDeleteShow";
import { LuListCheck } from "react-icons/lu";
import { SlOptionsVertical } from "react-icons/sl";
import ItemsListOption from "../../ui/ItemsListOption";
import DeleteListConfirm from "../../ui/DeleteListConfirm";
import { useDeleteList } from "./useDeleteList";
import Ellipsis from "../../ui/Ellipsis";
import { useListsContext } from "../../context/ListsContext";

const ItemsList = ({ list, item }) => {
  const buttonRef = useRef();
  const { itemId, type, parentId, episode, season } = item;
  const { itemsStatusMap, setItemsStatusMap } = useListsContext();

  const typeMap = itemsStatusMap.get(type);
  const isAdded =
    typeMap?.get(String(itemId))?.get("remainLists")?.has(list.id) ?? false;

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
      addShow(row, {
        onSuccess: () => {
          setItemsStatusMap((prev) => {
            const newMap = new Map(prev);
            const items = new Map(newMap.get(type));

            if (!items.has(itemId)) {
              items.set(itemId, new Map());
            }

            if (!items.get(itemId).has("remainLists"))
              items.get(itemId).set("remainLists", new Set());

            items?.get(itemId).get("remainLists")?.add(list.id);

            return newMap;
          });

          // if (!typeMap.has(itemId)) {
          //   typeMap.set(itemId, new Map());
          // }

          // if (!typeMap.get(itemId).has("remainLists"))
          //   typeMap.get(itemId).set("remainLists", new Set());

          // typeMap?.get(itemId).get("remainLists")?.add(list.id);
        },
      });
      setIsOptionOpen(false);
    }
  }

  function handleDeleteFromList() {
    if (isLoggedIn && list && itemId) {
      deleteShow(
        { id: itemId, listId: list.id, type },
        {
          onSuccess: () => {
            setItemsStatusMap((prev) => {
              const newMap = new Map(prev);
              const items = new Map(newMap.get(type));

              if (!items.has(itemId)) {
                items.set(itemId, new Map());
              }

              if (!items.get(itemId).has("remainLists"))
                items.get(itemId).set("remainLists", new Set());

              items?.get(itemId).get("remainLists")?.delete(list.id);

              return newMap;
            });
          },
        }
      );
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
        <FaPlus className="text-slate-400 text-xl group-hover:text-orange-coral transition-colors duration-200" />
      );
    }
  }

  return (
    <div className="w-full p-4 flex items-center gap-4 justify-between hover:bg-slate-800 rounded-md transition-colors duration-200 group">
      <button
        className="flex items-center gap-3 w-full "
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
