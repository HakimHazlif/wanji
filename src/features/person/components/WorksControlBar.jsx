import { IoFilter } from "react-icons/io5";
import Selector from "../../../ui/Selector";
import { FaSort } from "react-icons/fa";
import {
  activeTabs,
  departmentOptions,
  sortPersonWorks,
} from "../utils/constants";
import { useRef, useState } from "react";
import WorksFilter from "./WorksFilter";
import WorksSortBy from "./WorksSortBy";
import { usePersonWorksContext } from "../../../context/PersonWorksContext";
import { BiSort } from "react-icons/bi";

const WorksControlBar = () => {
  const {
    activeTab,
    handleChangeTab,
    departmentFilter,
    handleChangeFilter,
    sortBy,
    handleChangeSort,
  } = usePersonWorksContext();
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const filterButton = useRef(null);
  const sortButton = useRef(null);

  return (
    <div className="flex justify-between items-center gap-4 border-b border-slate-700 pb-3">
      <h2 className="text-2xl font-bold">Credits:</h2>

      <div className="sm:flex gap-4 hidden">
        <Selector
          value={activeTab}
          onChange={handleChangeTab}
          options={activeTabs}
        />

        <Selector
          value={departmentFilter}
          onChange={handleChangeFilter}
          options={departmentOptions}
        />

        <Selector
          value={sortBy}
          onChange={handleChangeSort}
          options={sortPersonWorks}
        />
      </div>

      <div className="sm:hidden flex gap-4">
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();

              setOpenFilter((prev) => !prev);
            }}
            ref={filterButton}
          >
            <IoFilter size={22} />
          </button>
          {openFilter && (
            <WorksFilter
              onClose={() => setOpenFilter(false)}
              buttonRef={filterButton}
            />
          )}
        </div>
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();

              setOpenSort((prev) => !prev);
            }}
            ref={sortButton}
          >
            <BiSort size={22} />
          </button>
          {openSort && (
            <WorksSortBy
              onClose={() => setOpenSort(false)}
              buttonRef={sortButton}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WorksControlBar;
