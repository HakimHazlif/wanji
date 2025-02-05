import { useNavigate, useSearchParams } from "react-router";
import { useLists } from "../features/lists/useLists";
import { IoIosTv } from "react-icons/io";
import CreateListButton from "./CreateListButton";
import { updateDateFormat } from "../utils/helper";
import { FaFolderOpen, FaPen } from "react-icons/fa";
import { BiSolidFilm } from "react-icons/bi";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";

const CustomLists = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const { remainLists } = useLists();

  function handleNavigate(listId) {
    navigate(`/u/${user.username}/Lists?listId=${listId}`);
  }

  if (remainLists?.length < 1 || !remainLists)
    return (
      <section className="flex flex-col gap-6 text-center justify-center items-center p-6 bg-bluish-black rounded-lg min-h-[300px] mt-10 ">
        <div className="flex flex-col justify-center items-center ">
          <FaFolderOpen className="mx-auto mb-4 w-16 h-16 text-gray-400" />

          <p className="text-gray-300 mb-10 text-lg">
            You haven&#39;t created a list yet. Start by creating your first
            list to explore items!
          </p>
          <CreateListButton />
        </div>
      </section>
    );

  return (
    <section className="w-full space-y-4 p-4 mt-2">
      <div className="flex justify-between items-center mb-10 border-b border-slate-600 pb-5">
        <h3 className=" flex items-center justify-center gap-2 bg-bluish-black text-gray-400 text-lg px-5 py-2 rounded-full w-[140px] font-medium">
          <FaFolderOpen />
          {remainLists?.length} {remainLists?.length <= 1 ? "list" : "lists"}
        </h3>
      </div>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {remainLists?.map((list) => (
          <li
            key={list.id}
            className="bg-bluish-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-700 overflow-hidden"
          >
            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <h3
                  className="text-xl font-semibold hover:text-orange-amber cursor-pointer"
                  onClick={() => handleNavigate(list.id)}
                >
                  {list.name}
                </h3>{" "}
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                  Has {list.items_list.length}{" "}
                  {list.items_list.length <= 1 ? "title" : "titles"}
                </span>
              </div>

              {list.items_list.length ? (
                <div className="grid grid-cols-3 gap-2 text-gray-600 text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <BiSolidFilm className="w-4 h-4 text-blue-500" />
                    <span>
                      {
                        list.items_list.filter((item) => item.type === "movie")
                          .length
                      }{" "}
                      Movie
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IoIosTv className="w-4 h-4 text-green-500" />
                    <span>
                      {
                        list.items_list.filter((item) => item.type === "tv")
                          .length
                      }{" "}
                      Tv Show
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MdOutlinePlayCircleFilled className="w-4 h-4 text-purple-500" />
                    <span>
                      {
                        list.items_list.filter(
                          (item) => item.type === "episode"
                        ).length
                      }{" "}
                      Episode
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">
                  Has no movie, tv show, or episode yet
                </p>
              )}
              <div>
                {list.description ? (
                  <p>{list.description}</p>
                ) : (
                  <button>Add the description to this list</button>
                )}
              </div>
              <div className="flex justify-between items-center border-t pt-3 mt-3 border-gray-600">
                <p className="text-xs text-gray-400">
                  Created at {updateDateFormat(list.created_at)}
                </p>
                <button className="text-blue-600 hover:bg-blue-100 rounded-full p-2 transition-colors">
                  <FaPencil className="w-4 h-4" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CustomLists;
