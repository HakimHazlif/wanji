import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useListsContext } from "../../../context/ListsContext";
import { useSelector } from "react-redux";
import { useAddVisualMedia } from "../hooks/useAddVisualMedia";
import { useDeleteVisualMedia } from "../hooks/useDeleteVisualMedia";
import { useDeleteList } from "../hooks/useDeleteList";
import SpinnerMini from "../../../ui/SpinnerMini";
import { LuListCheck } from "react-icons/lu";
import Ellipsis from "../../../ui/Ellipsis";
import { SlOptionsVertical } from "react-icons/sl";
import ItemsListOptions from "../../../ui/ItemsListOptions";
import DeleteListConfirm from "../../../ui/DeleteListConfirm";

const ItemsList = ({ list, item }) => {
  const buttonRef = useRef();
  const { itemId, type, parentId, episode, season } = item;
  const { itemsStatusMap, setItemsStatusMap } = useListsContext();

  const isAdded =
    itemsStatusMap?.[type]?.get(itemId)?.remainLists?.has(list.id) ?? false;

  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [forConfirmDelete, setForConfirmDelete] = useState(false);

  const { isLoggedIn, user } = useSelector((state) => state.user);

  const { addVisualMedia, isLoading: isAdding } = useAddVisualMedia();
  const { deleteVisualMedia, isLoading: isDeleting } = useDeleteVisualMedia();
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
      addVisualMedia(row, {
        onSuccess: () => {
          setItemsStatusMap((prev) => {
            const newMap = new Map(prev[type]);

            if (!newMap.has(itemId))
              newMap.set(itemId, {
                inWatchlist: false,
                inFavorites: false,
                rating: null,
                remainLists: new Set([list.id]),
              });
            else newMap.get(itemId).remainLists.add(list.id);

            return {
              ...prev,
              [type]: newMap,
            };
          });
        },
      });
      setIsOptionOpen(false);
    }
  }

  function handleDeleteFromList() {
    if (isLoggedIn && list && itemId) {
      deleteVisualMedia(
        { id: itemId, listId: list.id, type },
        {
          onSuccess: () => {
            setItemsStatusMap((prev) => {
              const newMap = new Map(prev[type]);

              if (!newMap.has(itemId))
                newMap.set(itemId, {
                  inWatchlist: false,
                  inFavorites: false,
                  rating: null,
                  remainLists: new Set([list.id]),
                });
              else newMap.get(itemId).remainLists.delete(list.id);

              return {
                ...prev,
                [type]: newMap,
              };
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
          className="hover:bg-slate-700 rounded-full w-7 h-7 flex justify-center items-center "
        >
          <SlOptionsVertical className="w-4 h-4 text-slate-400" />
        </button>

        {isOptionOpen && (
          <ItemsListOptions
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
