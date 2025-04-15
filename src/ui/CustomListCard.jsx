import { BiSolidFilm } from "react-icons/bi";
import { FaPencil } from "react-icons/fa6";
import { IoIosTv } from "react-icons/io";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { updateDateFormat } from "../utils/helper";
import { useSelector } from "react-redux";
import Ellipsis from "./Ellipsis";
import { RiDeleteBinFill } from "react-icons/ri";
import DeleteListConfirm from "./DeleteListConfirm";
import { useState } from "react";
import { useDeleteList } from "../features/userLists/hooks/useDeleteList";
import { useTransitionNavigate } from "../hooks/useTransitionNavigate";
import { useNavigate } from "react-router-dom";

const CustomListCard = ({ list }) => {
  const navigate = useNavigate();
  const { transitionNavigate } = useTransitionNavigate();
  const { username, uid } = useSelector((state) => state.user.user);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const { deleteList, isLoading } = useDeleteList();

  function handleNavigate(listId) {
    transitionNavigate(
      `/u/${username.replace(" ", "-")}/Lists?listId=${listId}`
    );
  }

  function handleDeleteList() {
    if (uid) {
      deleteList(
        { userId: uid, listId: list.id },
        {
          onSuccess: () => {
            setDeleteConfirm(false);
          },
        }
      );
    }
  }

  return (
    <li className="bg-bluish-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-700 overflow-hidden">
      <div className="p-5">
        <div className="flex gap-4 justify-between items-center mb-3">
          <span>
            <h3
              className="text-xl font-semibold hover:text-orange-amber cursor-pointer"
              onClick={() => handleNavigate(list.id)}
            >
              <Ellipsis lines="line-clamp-1" text={list.name} />
            </h3>
          </span>
          <span className="bg-slate-700 text-blue-200 text-xs px-3 py-1.5 rounded-full text-nowrap">
            Has {list.items_list.length}{" "}
            {list.items_list.length <= 1 ? "title" : "titles"}
          </span>
        </div>

        {list.items_list.length ? (
          <div className="flex items-center gap-5 text-gray-600 text-sm mb-3">
            <div className="flex items-center gap-1">
              <BiSolidFilm className="w-4 h-4 text-blue-500" />
              <span>
                {list.items_list.filter((item) => item.type === "movie").length}{" "}
                Movie
              </span>
            </div>
            <div className="flex items-center gap-1">
              <IoIosTv className="w-4 h-4 text-green-500" />
              <span>
                {list.items_list.filter((item) => item.type === "tv").length} Tv
                Show
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MdOutlinePlayCircleFilled className="w-4 h-4 text-purple-500" />
              <span>
                {
                  list.items_list.filter((item) => item.type === "episode")
                    .length
                }{" "}
                Episode
              </span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic  mb-3">
            Has no movie, tv show, or episode yet
          </p>
        )}
        <div className="mb-5">
          {list.description ? (
            <Ellipsis lines="line-clamp-2" text={list.description} />
          ) : (
            <p className="text-gray-500 text-sm italic">
              There is no available description for this list.
            </p>
          )}
        </div>
        <div className="flex justify-between items-center border-t pt-3 mt-3 border-gray-600">
          <p className="text-xs text-gray-400">
            Created at {updateDateFormat(list.created_at)}
          </p>
          <div>
            <span>
              <button
                className="text-blue-400 hover:bg-slate-700 hover:text-blue-600 rounded-full p-2 transition-colors"
                onClick={() =>
                  navigate(
                    `/u/${username.replace(" ", "-")}/list/edit?listId=${
                      list.id
                    }`
                  )
                }
              >
                <FaPencil size={18} />
              </button>
            </span>

            <span>
              <button
                className="text-slate-400 hover:bg-slate-700 rounded-full p-2 transition-colors"
                onClick={() => setDeleteConfirm(true)}
              >
                <RiDeleteBinFill size={21} />
              </button>
            </span>
          </div>
        </div>
      </div>
      {deleteConfirm && (
        <DeleteListConfirm
          onClose={() => setDeleteConfirm(false)}
          onDelete={handleDeleteList}
          name={list.name}
          type="deleteList"
          isDeleting={isLoading}
        />
      )}
    </li>
  );
};

export default CustomListCard;
