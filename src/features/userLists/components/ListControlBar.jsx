import { FaPencil } from "react-icons/fa6";
import EditNavigateButton from "../../../components/EditNavigateButton";
import { useListContext } from "../../../context/ListContext";
import { listFilterOptions, listSortOptions } from "../constant/options";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import Selector from "../../../ui/Selector";
import MiniMultiRadio from "../../../components/MiniMultiRadio";
import { IoFilter } from "react-icons/io5";
import { BiSort } from "react-icons/bi";
import { useSelector } from "react-redux";
import { GrClearOption } from "react-icons/gr";
import { useParams } from "react-router-dom";
import DeleteListConfirm from "../../../ui/DeleteListConfirm";
import { useState } from "react";
import { useClearList } from "../hooks/useClearList";

const ListControlBar = ({ itemsList, list, listId, forEditList }) => {
  const [openClearConfirm, setOpenClearConfirm] = useState(false);
  const { username } = useSelector((state) => state.user.user);

  const { clearList, isLoading } = useClearList();

  const { list: listParam } = useParams();

  const linkToEditList = `/u/${username.replace(" ", "-")}/list/${listId}/edit`;

  const {
    isGridView,
    setIsGridView,
    filteredOption,
    handleSelectFilter,
    selectedOption,
    handleSelectSort,
  } = useListContext();

  const filterGroups = [
    {
      header: "Filter by",
      value: filteredOption,
      onChange: handleSelectFilter,
      options: listFilterOptions,
    },
  ];

  const sortGroups = [
    {
      header: "Sort by",
      value: selectedOption,
      onChange: handleSelectSort,
      options: listSortOptions,
    },
  ];

  function clearAllItems() {
    clearList({ id: listId });
  }

  return (
    <div className="flex justify-between items-center border-b border-slate-600 pb-5">
      <div>
        <h3 className="bg-bluish-black text-gray-400 text-lg px-6 py-2 rounded-full font-medium text-center">
          {itemsList?.length < list.length
            ? `1-${itemsList?.length} ${
                itemsList?.length <= 1 ? "title" : "titles"
              } / ${list.length}`
            : `${list.length} ${list.length <= 1 ? "title" : "titles"}`}
        </h3>
      </div>

      <div className="flex items-center lg:gap-4 gap-2">
        <div className="md:flex hidden items-center lg:gap-4 gap-2">
          {!forEditList && listParam !== "Ratings" && (
            <EditNavigateButton navigateLink={linkToEditList}>
              <FaPencil />
              <span>Edit List</span>
            </EditNavigateButton>
          )}

          {forEditList && listParam !== "Ratings" && (
            <button
              className="flex gap-2 items-center justify-center font-medium py-[10px] px-8 bg-bluish-black hover:bg-bluish-black/50 duration-200 transition-colors rounded-full lg:text-base md:text-sm text-xs"
              onClick={() => setOpenClearConfirm((prev) => !prev)}
            >
              <GrClearOption />
              <span>Clear All</span>
            </button>
          )}

          <Selector
            value={filteredOption}
            onChange={handleSelectFilter}
            options={listFilterOptions}
          />

          <Selector
            value={selectedOption}
            onChange={handleSelectSort}
            options={listSortOptions}
          />
        </div>

        <div className="md:hidden flex items-center md:gap-4 gap-2">
          {!forEditList && listParam !== "Ratings" && (
            <EditNavigateButton
              navigateLink={linkToEditList}
              style="w-9 h-9 bg-bluish-black hover:bg-bluish-black/50"
            >
              <FaPencil size={18} />
            </EditNavigateButton>
          )}

          {forEditList && listParam !== "Ratings" && (
            <button
              className="flex gap-2 items-center justify-center font-medium w-9 h-9 bg-bluish-black hover:bg-bluish-black/50 duration-200 transition-colors rounded-full lg:text-base md:text-sm text-xs"
              onClick={() => setOpenClearConfirm((prev) => !prev)}
            >
              <GrClearOption size={18} />
            </button>
          )}

          <div className="w-9 h-9 rounded-full flex justify-center items-center bg-bluish-black hover:bg-bluish-black/50">
            <MiniMultiRadio radioGroups={filterGroups}>
              <IoFilter size={22} />
            </MiniMultiRadio>
          </div>

          <div className="w-9 h-9 rounded-full flex justify-center items-center bg-bluish-black hover:bg-bluish-black/50">
            <MiniMultiRadio radioGroups={sortGroups}>
              <BiSort size={22} />
            </MiniMultiRadio>
          </div>
        </div>

        <button
          className={`w-9 h-9 rounded-full flex justify-center items-center  ${
            isGridView
              ? "bg-bluish-black cursor-not-allowed"
              : "hover:bg-bluish-black/50 cursor-pointer"
          }`}
          onClick={() => setIsGridView(true)}
          disabled={isGridView}
        >
          <BsFillGrid3X3GapFill size={20} />
        </button>
        <button
          className={`w-9 h-9 rounded-full flex justify-center items-center  ${
            !isGridView
              ? "bg-bluish-black cursor-not-allowed"
              : "hover:bg-bluish-black/50 cursor-pointer"
          }`}
          onClick={() => setIsGridView(false)}
          disabled={!isGridView}
        >
          <FaListUl size={20} />
        </button>
      </div>

      {openClearConfirm && (
        <DeleteListConfirm
          onClose={() => setOpenClearConfirm(false)}
          onDelete={clearAllItems}
          name="all the items"
          type="deleteItem"
          isDeleting={isLoading}
        />
      )}
    </div>
  );
};

export default ListControlBar;
