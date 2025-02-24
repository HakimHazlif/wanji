import { useEffect, useRef, useState } from "react";
import { useLists } from "./useLists";
import { FaInfoCircle, FaPlus } from "react-icons/fa";
import { useShow } from "../show/useShow";
import { useParams } from "react-router";
import { useAddShow } from "./useAddShow";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../ui/Spinner";
import ItemsList from "./ItemsList";
import { useCreateList } from "./useCreateList";
import { getPictureUrlFormat, getYearFormat } from "../../utils/helper";
import { useListsContext } from "../../context/ListsContext";
import { MAX_NAME_LENGTH } from "../../constants/variables";
import SpinnerMini from "../../ui/SpinnerMini";

const ListsMenu = ({ isPopupOpen, setIsPopupOpen, otherProps }) => {
  const { image, showTitle, item } = otherProps;
  const { itemId, type, parentId, episode, season } = item;
  const { itemsStatusMap, setItemsStatusMap } = useListsContext();

  const [newListName, setNewListName] = useState("");
  const popupRef = useRef();

  const { isLoggedIn, user } = useSelector((state) => state.user);
  const { uid } = user;

  const { isLoading, remainLists } = useLists();

  const { isLoading: isAdding } = useAddShow();
  const { creatList, isLoading: isCreating } = useCreateList();

  async function handleCreateList(e) {
    e.preventDefault();

    if (!newListName) return;

    if (isLoggedIn && uid) {
      creatList(
        {
          userId: uid,
          name: newListName,
          itemId,
          type,
          parentId,
          episode,
          season,
        },
        {
          onSuccess: (data) => {
            setNewListName("");

            const listId = data?.listData[0].id;
            setItemsStatusMap((prev) => {
              const prevLists = prev[type]?.[itemId]?.remainLists || [];
              return {
                ...prev,
                [type]: {
                  ...prev[type],
                  [itemId]: {
                    ...prev[type]?.[itemId],
                    remainLists: [
                      ...new Set([...prevLists, { list_id: listId }]),
                    ],
                  },
                },
              };
            });
          },
        }
      );
    }
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (popupRef.current && !popupRef.current.contains(e.target))
        setIsPopupOpen(false);
    }

    if (isPopupOpen) document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsPopupOpen, isPopupOpen]);

  // if (isLoading || isCreating || isAdding) return <Spinner />;

  return (
    <div className="fixed z-30 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        className="sm:max-h-[90vh] max-h-[95vh] h-full w-full xl:max-w-[70vw] lg:max-w-[80vw] sm:max-w-[85vw] xs:max-w-[90vw] max-w-[95vw] rounded-xl bg-bluish-black py-4 px-5 absolute z-50 flex flex-col "
        ref={popupRef}
      >
        <div className="p-4 border-b border-slate-700 flex items-end gap-4 ">
          <div>
            <img
              src={getPictureUrlFormat(image)}
              alt="poster"
              className="rounded-md h-[120px] w-full min-w-[80px] min-h-[80px]"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Save to...</h2>
            <div className="mt-2 flex items-start gap-2 text-slate-400 text-sm">
              <FaInfoCircle className="mt-1" />

              <p>
                Select a list or create a new one to save{" "}
                <span className="font-bold text-orange-amber">{showTitle}</span>
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleCreateList}
          className="py-4 sm:px-4 px-1 border-b border-slate-700"
        >
          <div className="flex gap-2">
            <input
              type="text"
              disabled={isLoading || isCreating || isAdding}
              value={newListName}
              maxLength={MAX_NAME_LENGTH}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Create new list"
              className="flex-1 px-3 py-2 bg-slate-800 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-coral"
            />
            <button
              type="submit"
              disabled={
                !newListName.trim() || isLoading || isCreating || isAdding
              }
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? <SpinnerMini iconSize="text-xl" /> : <FaPlus />}
            </button>
          </div>
        </form>

        <div className="mt-5 flex-grow overflow-hidden flex flex-col ">
          <div
            className="scrollbar-custom overflow-y-auto max-h-full
          "
          >
            {remainLists?.map((list) => (
              <ItemsList list={list} key={list.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListsMenu;
