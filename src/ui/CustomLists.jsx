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
import CustomListCard from "./CustomListCard";

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
        <h3 className="flex items-center justify-center gap-2 bg-bluish-black text-gray-400 text-lg px-5 py-3 rounded-full w-[140px] font-bold">
          <FaFolderOpen />
          {remainLists?.length} {remainLists?.length <= 1 ? "list" : "lists"}
        </h3>
      </div>
      <ul className="grid grid-flow-row gap-4">
        {remainLists?.map((list) => (
          <CustomListCard key={list.id} list={list} />
        ))}
      </ul>
    </section>
  );
};

export default CustomLists;
